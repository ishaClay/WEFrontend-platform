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
    marginBottom: 15,
  },
  pillarSectionView: {
    flexDirection: 'row', 
    width: "100%",
    columnGap: 10
  },
  pillarSection: {
    marginBottom: 10,
    width: "33.33%"
  },
  pillarSectionCard: {
    marginBottom: 10,
    borderRadius: 6,
    padding: 10,
  },
  companySection: {
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  item: {
    fontSize: 10,
    marginBottom: 2,
  },
  pillerItem: {
    fontSize: 10,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  mainSectionContent: {
    fontSize: 10,
    marginBottom: 6
  },
  sectionContent: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 90,
    textAlign: "center",
  },
  overallSection: {
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  overallContent: {
    fontSize: 10,
    marginBottom: 3,
  },
  overallLevelTitle: {
    padding: 3,
    borderRadius: 6,
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
    <View style={styles.pillarSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {pillars.length === 0 ? (
        <Text style={styles.sectionContent}>---</Text>
      ) : (
        pillars.map((item: any, index: number) => (
          <View key={index} style={{...styles.pillarSectionCard, backgroundColor: title === "Introductory" ? "#F63636" : title === "Intermediate" ? "#FFD56A" : "#64A70B"}}>
            <Text style={{...styles.item, color: title === "Introductory" ? "#FFFFFF" : title === "Intermediate" ? "#000000" : "#FFFFFF"}}>Pillar: {item.pillarname}</Text>
            <Text style={{...styles.item, color: title === "Introductory" ? "#FFFFFF" : title === "Intermediate" ? "#000000" : "#FFFFFF"}}>
              Percentage:{" "}
              {calculatePercentage(item.totalpoints, item.totalmaxpoint)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
  const totalsAndLevel = assessmentData ? calculateTotalsAndLevel(assessmentData) : { totalPoints: "", overallLevel: "", color: "" };
  const overallLevelBGColor = totalsAndLevel.overallLevel === "Introductory" ? "#F63636" : totalsAndLevel.overallLevel === "Intermediate" ? "#FFD56A" : "#64A70B";
  const overallLevelTextColor = totalsAndLevel.overallLevel === "Introductory" ? "#FFFFFF" : totalsAndLevel.overallLevel === "Intermediate" ? "#000000" : "#FFFFFF";

  return (
    <Document>
      <Page style={styles.page}>
        {companyName && (
          <View style={styles.companySection}>
            <Text style={styles.sectionTitle}>Company Organization Name :-</Text>
            <Text style={styles.mainSectionContent}>{companyName}</Text>
          </View>
        )}
        <View style={styles.overallSection}>
          <Text style={styles.overallTitle}>Overall Assessment :- </Text>
          <Text style={styles.overallContent}>Total Score: {totalsAndLevel.totalPoints}</Text>
          <Text style={styles.overallContent}>Your Overall Sustainability Level : 
            <Text style={[styles.overallLevelTitle, {color: overallLevelTextColor, backgroundColor: overallLevelBGColor}]}> {totalsAndLevel.overallLevel}</Text>
          </Text>
        </View>
        <View style={styles.pillarSectionView}>
          {assessmentData && (
            <View style={styles.pillarSectionView}>
              {renderAssessmentSection(
                "Introductory",
                assessmentData.Introductory
              )}
              {renderAssessmentSection(
                "Intermediate",
                assessmentData.Intermediate
              )}
              {renderAssessmentSection("Advanced", assessmentData.Advanced)}
            </View>
          )}
        </View>
        {data?.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>Piller Name: {item["Piller Name"]}</Text>
            <Text style={styles.pillerItem}>Percentage: {item["Percentage"]}</Text>
            <Text style={styles.pillerItem}>Your Level: {item["Your Leval"]}</Text>
            <Text style={styles.pillerItem}>Selected Level: {item["Selected Leval"]}</Text>
            <Text style={styles.pillerItem}>Action Name: {item["Action Name"]}</Text>
            <Text style={styles.pillerItem}>Assign Name: {item["Assing Name"]}</Text>
            <Text style={styles.pillerItem}>Action Status: {item["Action Status"]}</Text>
            <Text style={styles.pillerItem}>Start Date: {item["Start Date"]}</Text>
            <Text style={styles.pillerItem}>End Date: {item["End Date"]}</Text>
            <Text style={styles.pillerItem}>Document Link: {item["Document Link"]}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default AssessmentPdf;
