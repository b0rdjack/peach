import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "../login/3rd-party";

const EmailIcon = (props) => <Icon name="email" {...props} />;

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Mot de passe oublié
          </Text>
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            placeholder="E-mail"
            size="large"
            accessoryRight={EmailIcon}
            value={this.state.email}
            onChangeText={this.setEmail}
          />
        </Layout>
        <Button
          style={styles.validationButton}
          onPress={this.onValidation}
          size="giant"
        >
          VALIDER
        </Button>
      </KeyboardAvoidingView>
    );
  }

  setEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  onValidation = () => {
    console.log("Password forgotten");
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
    backgroundColor: "#3366FF",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  validationButton: {
    marginHorizontal: 16,
  },
});
