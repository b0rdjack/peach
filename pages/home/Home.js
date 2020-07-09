import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button } from "@ui-kitten/components";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello world !",
    };
  }
  componentDidMount() {}

  _onSignOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View>
        <Text>{this.state.message}</Text>
        <Button
          style={styles.signInButton}
          onPress={this._onSignOut}
          size="giant"
        >
          CONNEXION
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
});
