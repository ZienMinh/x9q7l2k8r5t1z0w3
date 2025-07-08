import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';

const AirportScreen = () => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  webview: {
    flex: 1,
  },
});
export default AirportScreen;
