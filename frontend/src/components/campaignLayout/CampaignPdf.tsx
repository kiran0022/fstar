import React from "react";
import {
  PDFViewer,
  Page,
  Document,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useParams } from "react-router";
export default function CampaignPdf() {
  const { url } = useParams();
  return (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
  },
  container: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {" "}
      // provide the size of your page as you need
      <View style={styles.container}>
        <Text style={styles.text}>Simple PDF Example</Text>
      </View>
      <View style={styles.container}>
        <Text>How would you like modify.</Text>
      </View>
    </Page>
  </Document>
);
