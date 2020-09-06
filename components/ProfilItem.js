import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Layout, Text, Button, Icon, Card } from "@ui-kitten/components";

export default class ProfilItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout level="2" style={styles.container}>
        <Text appearance="hint" category="h6">
          {this.props.label}:
        </Text>
        <Text category="h6" style={{ marginLeft: 5, fontStyle: "italic" }}>
          {this.props.value}
        </Text>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
