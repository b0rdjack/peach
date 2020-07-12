import React, { Component } from "react";
import { View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "../login/3rd-party";
import { createAlert } from "../../components/Alert";
import { API_URL } from "../../constant";

const EmailIcon = (props) => <Icon name="email" {...props} />;

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showEmailError: true,
      loading: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Réinitialisation
          </Text>
          <Text
            style={styles.passwordResetLabel}
            category="s1"
            status="control"
          >
            Mot de passe oublié
          </Text>
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            placeholder="E-mail"
            size="large"
            accessoryRight={EmailIcon}
            disabled={this.state.loading}
            value={this.state.email}
            onChangeText={this.setEmail}
            caption={
              this.state.showEmailError ? "Adresse e-mail non valide" : ""
            }
          />
        </Layout>
        <Button
          style={styles.validationButton}
          disabled={this.state.loading}
          onPress={this.onValidation}
          size="giant"
        >
          VALIDER
        </Button>
        <Button
          style={styles.loginButton}
          disabled={this.state.loading}
          appearance="ghost"
          status="basic"
          onPress={this.onLoginButtonPress}
        >
          Se connecter
        </Button>
      </KeyboardAvoidingView>
    );
  }

  setEmail = (value) => {
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      this.setState({
        email: value,
        showEmailError: true,
      });
    } else {
      this.setState({
        email: value,
        showEmailError: false,
      });
    }
  };

  onLoginButtonPress = () => {
    this.props.navigation.navigate("Login");
  };

  onValidation = () => {
    Keyboard.dismiss();
    if (!this.state.showEmailError) {
      this.setState({
        loading: true,
      });
      fetch(API_URL + "reset_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email.toLowerCase(),
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.setState({
            loading: false,
          });
          if (!response.error) {
            createAlert("Information", response.messages, false);
          } else {
            createAlert("Oups !", response.messages, false);
          }
        });
    } else {
      this.setState({
        loading: false,
      });
      createAlert("Oups !", "Veuillez saisir tous les champs !", true);
    }
  };
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
  passwordResetLabel: {
    marginTop: 16,
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  validationButton: {
    marginHorizontal: 16,
  },
  loginButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
