// MyDocument.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface DataItem {
  "Piller Name": string;
  "Percentage": number;
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
    fontWeight: 'bold',
  },
  item: {
    fontSize: 10,
    marginBottom: 2,
  },
});

// Create Document Component
const AssessmentPdf: React.FC<MyDocumentProps> = ({ data }) => (
    <Document>
    <Page style={styles.page}>
      {data?.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.title}>Piller Name: {item["Piller Name"]}</Text>
          <Text style={styles.item}>Percentage: {item["Percentage"]}</Text>
          <Text style={styles.item}>Your Level: {item["Your Leval"]}</Text>
          <Text style={styles.item}>Selected Level: {item["Selected Leval"]}</Text>
          <Text style={styles.item}>Action Name: {item["Action Name"]}</Text>
          <Text style={styles.item}>Assign Name: {item["Assing Name"]}</Text>
          <Text style={styles.item}>Action Status: {item["Action Status"]}</Text>
          <Text style={styles.item}>Start Date: {item["Start Date"]}</Text>
          <Text style={styles.item}>End Date: {item["End Date"]}</Text>
          <Text style={styles.item}>Document Link: {item["Document Link"]}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default AssessmentPdf;
