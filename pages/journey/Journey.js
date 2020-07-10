import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../login/3rd-party";

const BackIcon = (props) => <Icon name="arrow-back" {...props} />;
const MapIcon = (props) => <Icon name="map" {...props} />;

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journey: this.props.navigation.state.params.journey,
      loading: false,
    };
  }
  componentDidMount() {
    console.log(this.state.journey);
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Parcours
          </Text>
          <Text style={styles.journeyLabel} category="s1" status="control">
            Proposition de parcours
          </Text>
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        <Layout style={styles.formContainer} level="1"></Layout>
        <Button
          style={styles.openGoogleMapsButton}
          size="giant"
          accessoryLeft={MapIcon}
        >
          Ouvrir sur Google Maps
        </Button>
        <Button
          style={styles.backButton}
          size="giant"
          accessoryLeft={BackIcon}
          onPress={() => this.props.navigation.goBack(null)}
        >
          Filtres
        </Button>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    backgroundColor: "#FFA13D",
  },
  journeyLabel: {
    marginTop: 16,
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  openGoogleMapsButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#7BE53D",
    borderColor: "#7BE53D",
  },
  backButton: {
    marginVertical: 12,
    marginHorizontal: 60,
    marginBottom: 16,
    backgroundColor: "#FFA13D",
    borderColor: "#FFA13D",
  },
});
