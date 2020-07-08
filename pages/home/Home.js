import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello world !"
    }
  }
  componentDidMount() {
    this._getToken();
  }
  _getToken = async () => {
    this.setState({
      message: await AsyncStorage.getItem('userToken')
    })
  }
  render() {
    return (
      <View>
        <Text>
          {this.state.message}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1
  }
})