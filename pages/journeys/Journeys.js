import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import {
  Layout,
  Text,
  Button,
  Icon,
  ViewPager,
  Card,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../login/3rd-party";
import Journey from "../../components/Journey";

const MapIcon = (props) => <Icon name="google-outline" {...props} />;

export default class Journeys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeys: [],
      loading: false,
      selectedIndex: 0,
    };
  }
  componentDidMount() {
    this.setState({
      journeys: this.props.navigation.state.params.journeys,
    });
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Layout level="2" style={styles.layout_container}>
          <ViewPager
            style={styles.pager}
            selectedIndex={this.state.selectedIndex}
            onSelect={(index) => this.setSelectedIndex(index)}
          >
            {this.state.journeys.map((journey, index) => {
              return <Journey key={index} journey={journey} />;
            })}
          </ViewPager>
          <Layout level="2" style={styles.footer}>
            {this.state.journeys.length > 1 ? (
              <View style={styles.row}>
                <Icon
                  fill="#3366FF"
                  name="arrowhead-right-outline"
                  style={{ width: 32, height: 32 }}
                />
              </View>
            ) : (
              <></>
            )}

            <Button
              style={styles.footer_button}
              onPress={this.openOnGoogleMaps}
              accessoryLeft={MapIcon}
              appearance="outline"
            >
              Ouvrir sur Google Maps
            </Button>
            <Text style={styles.footer_text} appearance="hint" category="s1">
              Page {this.state.selectedIndex + 1}/{this.state.journeys.length}
            </Text>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    );
  }

  _renderJourney = ({ item }) => <Journey journey={item} />;
  setSelectedIndex = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  layout_container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  slide_text: {
    marginRight: 4,
  },
  footer_button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  footer_text: {
    marginBottom: 8,
  },
});
