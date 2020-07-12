import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Layout, Icon } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
export default class Section extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={styles.container} level="2">
        <Card status="danger" style={styles.card}>
          <View style={styles.title}>
            <Text category="s1">{this.props.section.from.name} </Text>
            <View style={styles.icon_container}>
              {this.getType(this.props.section)}
            </View>
            <Text category="s1"> {this.props.section.to.name}</Text>
          </View>
          {this.props.section.hasOwnProperty("subway_information") ? (
            <View style={styles.subway_information}>
              <View style={styles.row}>
                <Text category="s2" appearance='hint' style={styles.text}>
                  {this.props.section.subway_information.mode + ", "}
                </Text>
                <Text category="s2" appearance='hint' style={styles.text}>
                  {"Ligne " + this.props.section.subway_information.line}
                </Text>
              </View>
              <Text category="s2" appearance='hint' style={styles.text}>
                {"Direction: " +
                  this.props.section.subway_information.direction}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </Card>
      </Layout>
    );
  }

  getType = (value) => {
    switch (value.type) {
      case "street_network":
        return <FontAwesome5 name="walking" size={24} color="#3366FF" />;
        break;
      case "public_transport":
        switch (value.subway_information.mode) {
          case "Bus":
            return <FontAwesome5 name="bus" size={24} color="#3366FF" />;
          case "Métro":
            return <FontAwesome5 name="subway" size={24} color="#3366FF" />;
          default:
            return (
              <Icon
                fill="#000"
                name="arrow-ios-downward-outline"
                style={{ width: 24, height: 24 }}
              />
            );
        }
        break;
      default:
        return (
          <Icon
            style={{ width: 24, height: 24 }}
            fill="#000"
            name="arrow-ios-downward-outline"
          />
        );
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 25,
  },
  card: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_container: {
    marginTop: 5,
    marginBottom: 5,
  },
  subway_information: {
    marginTop: 10,
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontStyle: "italic"
  }
});
