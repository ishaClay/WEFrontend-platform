// MyDocument.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface DataItem {
  "Piller Name": string;
  Percentage: number;
  "Your Leval": string;
  "Selected Leval": string;
  "Action Name": string;
  "Assing Name": string;
  "Action Status": string;
  "Start Date": string;
  "End Date": string;
  "Document Link": string;
}

interface MyDocumentProps {
  data: DataItem[];
  companyName: string;
  assessmentData?: any;
  allassessmantData?: any;
  fetchClientmaturitylevel?: any;
}

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    // fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  item: {
    fontSize: 10,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 10,
    marginBottom: 6,
  },
  overallSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  overallContent: {
    fontSize: 12,
    marginBottom: 6,
  },

});

// Create Document Component
const AssessmentPdf: React.FC<MyDocumentProps> = ({
  data,
  companyName,
  assessmentData,
  fetchClientmaturitylevel
}) => {
  const calculatePercentage = (
    totalPoints: string,
    totalMaxPoint: string
  ): string => {
    const points = parseFloat(totalPoints);
    const maxPoint = parseFloat(totalMaxPoint);
    if (maxPoint === 0) return "0%";
    const percentage = (points / maxPoint) * 100;
    return `${Math.round(percentage)}%`;
  };

  const findMaturityLevel = (score: number) => {
    for (const level of fetchClientmaturitylevel || []) {
      if (score >= level.rangeStart && score <= level.rangeEnd) {
        return level;
      }
    }
    return null;
  };
  
  const calculateTotalsAndLevel = (data: any) => {
    const levels = ["Introductory", "Intermediate", "Advanced"];
    let totalPoints = 0;
    let totalMaxPoints = 0;
  
    levels.forEach(level => {
      data[level].forEach((pillar: any) => {
        totalPoints += parseFloat(pillar.totalpoints);
        totalMaxPoints += parseFloat(pillar.totalmaxpoint);
      });
    });
  
    const overallPercentage = (totalPoints / totalMaxPoints) * 100;
    const maturity = findMaturityLevel(overallPercentage);
  
    return {
      totalPoints: `${totalPoints}/${totalMaxPoints}`,
      overallLevel: maturity ? maturity.maturityLevelName : "Unknown",
      color: maturity ? maturity.color : "#000000",
    };
  };

  const renderAssessmentSection = (title: string, pillars: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {pillars.length === 0 ? (
        <Text style={styles.sectionContent}>---</Text>
      ) : (
        pillars.map((item: any, index: number) => (
          <View key={index} style={styles.section}>
            <Text style={styles.item}>Pillar: {item.pillarname}</Text>
            <Text style={styles.item}>
              Percentage:{" "}
              {calculatePercentage(item.totalpoints, item.totalmaxpoint)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
  const totalsAndLevel = assessmentData ? calculateTotalsAndLevel(assessmentData) : { totalPoints: "", overallLevel: "", color: "" };

  return (
    <Document>
      <Page style={styles.page}>
        {companyName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company/Organization</Text>
            <Text style={styles.sectionContent}>{companyName}</Text>
          </View>
        )}
        {assessmentData && (
          <>
            {renderAssessmentSection(
              "Introductory",
              assessmentData.Introductory
            )}
            {renderAssessmentSection(
              "Intermediate",
              assessmentData.Intermediate
            )}
            {renderAssessmentSection("Advanced", assessmentData.Advanced)}
          </>
        )}
         <View style={styles.overallSection}>
              <Text style={styles.overallTitle}>Overall Assessment</Text>
              <Text style={styles.overallContent}>Total Score: {totalsAndLevel.totalPoints}</Text>
              <Text style={styles.overallContent}>Your Overall Sustainability Level: {totalsAndLevel.overallLevel}</Text>
            </View>
        {data?.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>Piller Name: {item["Piller Name"]}</Text>
            <Text style={styles.item}>Percentage: {item["Percentage"]}</Text>
            <Text style={styles.item}>Your Level: {item["Your Leval"]}</Text>
            <Text style={styles.item}>
              Selected Level: {item["Selected Leval"]}
            </Text>
            <Text style={styles.item}>Action Name: {item["Action Name"]}</Text>
            <Text style={styles.item}>Assign Name: {item["Assing Name"]}</Text>
            <Text style={styles.item}>
              Action Status: {item["Action Status"]}
            </Text>
            <Text style={styles.item}>Start Date: {item["Start Date"]}</Text>
            <Text style={styles.item}>End Date: {item["End Date"]}</Text>
            <Text style={styles.item}>
              Document Link: {item["Document Link"]}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default AssessmentPdf;
