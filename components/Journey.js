import React, { Component } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { Layout, Text, Card, Icon, Divider } from "@ui-kitten/components";
import Section from "./Section";

export default class Journey extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={styles.container} level="2">
        <View style={styles.title}>
          <Card status="warning" style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.text} category="s1">
                {this.props.journey.from}
              </Text>
              <Icon style={styles.icon} fill="#3366FF" name="arrow-forward" />
              <Text style={styles.text} category="s1">
                {this.props.journey.to}
              </Text>
            </View>
            <View style={styles.duration}>
              <Icon style={styles.icon} fill="#3366FF" name="clock-outline" />
              <Text style={styles.text} category="s2">
                {this.getHMS(this.props.journey.duration)}
              </Text>
            </View>
          </Card>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={this.props.journey.sections}
            renderItem={this._renderSection}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </Layout>
    );
  }

  _renderSection = ({ item }) => <Section section={item} />;

  getHMS = (duration) => {
    let date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeview_container: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 25,
  },
  card: {
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  duration: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  text: {
    marginHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sections: {
    flex: 10000000,
  },
});
