import { Document, Image, Page, StyleSheet, View } from "@react-pdf/renderer";

const CertificatePdf = ({ image }: { image: string }) => {
  console.log("🚀 ~ CertificatePdf ~ image:", image);
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      // fontFamily: 'Helvetica',
    },
  });
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Image src={image} />
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePdf;
