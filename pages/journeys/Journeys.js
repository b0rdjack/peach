import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { Layout, Text, Button, Icon, Card } from "@ui-kitten/components";
import ViewPager from "@react-native-community/viewpager";
import Journey from "../../components/Journey";
import * as Linking from "expo-linking";

const MapIcon = (props) => <Icon name="google-outline" {...props} />;
const NextIcon = (props) => (
  <Icon
    fill="#3366FF"
    name="arrowhead-right-outline"
    style={{ height: 32, width: 32 }}
    {...props}
  />
);
const PreviousIcon = (props) => (
  <Icon
    fill="#3366FF"
    name="arrowhead-left-outline"
    style={{ height: 32, width: 32 }}
    {...props}
  />
);

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
      position: this.props.navigation.state.params.position,
    });
  }
  render() {
    return (
      <Layout level="2" style={styles.container}>
        <View style={{ flex: 0.8 }}>
          <ViewPager
            scrollEnabled
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={this.changePage}
          >
            {this.state.journeys.map((journey, index) => {
              return (
                <View key={index} style={{ flex: 1 }}>
                  <FlatList
                    data={[journey]}
                    renderItem={({ item }) => <Journey journey={item} />}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                </View>
              );
            })}
          </ViewPager>
        </View>

        <Layout level="2" style={styles.footer}>
          {this.state.journeys.length > 1 ? (
            <View style={styles.row}>
              <Button
                style={styles.buttonSlide}
                accessoryLeft={
                  this.state.selectedIndex > 0 ? PreviousIcon : null
                }
                accessoryRight={
                  this.state.selectedIndex == this.state.journeys.length - 1
                    ? null
                    : NextIcon
                }
                appearance="ghost"
                disabled={true}
              >
                <Text style={styles.textSlide}>Slide</Text>
              </Button>
            </View>
          ) : (
            <></>
          )}

          <Button
            style={styles.gmaps_button}
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
    );
  }

  changePage = (event) => {
    this.setState({
      selectedIndex: event.nativeEvent.position,
    });
  };

  openOnGoogleMaps = () => {
    let url = "https://www.google.com/maps/dir/?api=1";
    // Origin
    url =
      url +
      "&origin=" +
      this.state.position.latitude +
      "%2C" +
      this.state.position.longitude;
    // Destination
    let last_journey = this.state.journeys[this.state.journeys.length - 1];
    let last_section = last_journey.sections[last_journey.sections.length - 1];
    let last_section_latitude = last_section.to.latitude;
    let last_section_longitude = last_section.to.longitude;

    url =
      url +
      "&destination=" +
      last_section_latitude +
      "%2C" +
      last_section_longitude;

    let waypoints = "";
    this.state.journeys.map((journey) => {
      journey.sections.map((section) => {
        let latitude = section.to.latitude;
        let longitude = section.to.longitude;
        // Check not to add twice the destination
        if (
          latitude != last_section_latitude &&
          longitude != last_section_longitude
        ) {
          // Configure waypoints
          waypoints = waypoints + latitude + "%2C" + longitude + "%7C";
        }
      });
    });
    url = url + "&waypoints=" + waypoints;
    Linking.openURL(url);
  };
  nextSlide = () => {
    if (!(this.state.selectedIndex == this.state.journeys.length - 1)) {
      this.setSelectedIndex(this.state.selectedIndex + 1);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  footer: {
    flex: 0.2,
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  buttonSlide: {
    backgroundColor: "rgb(247, 249, 252)",
  },
  textSlide: {
    color: "#3366FF",
    fontWeight: "bold",
  },
  gmaps_button: {
    marginHorizontal: 16,
    marginVertical: 2,
  },
  footer_text: {
    marginBottom: 8,
  },
});
