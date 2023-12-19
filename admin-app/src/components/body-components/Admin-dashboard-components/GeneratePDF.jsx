import React from 'react';
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';

import ReportContent from './ReportContent';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function GeneratePDF({ data }) {
  return (
    <div>
      <PDFViewer width="600" height="400">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <ReportContent data={data} />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default GeneratePDF;
