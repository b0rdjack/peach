import React, { Component } from "react";
import { View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "./3rd-party";
import { API_URL } from "../../constant";
import { createAlert } from "../../components/Alert";
const LockIcon = (props) => <Icon name="lock" {...props} />;

const EmailIcon = (props) => <Icon name="email" {...props} />;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showEmailError: true,
      password: "",
      showPasswordError: true,
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
          <Text category="h1" status="control" style={styles.headerText}>
            Connexion
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
            autoCapitalize="none"
            accessoryRight={EmailIcon}
            disabled={this.state.loading}
            value={this.state.email}
            onChangeText={this.setEmail}
            caption={
              this.state.showEmailError ? "Adresse e-mail non valide" : ""
            }
          />
          <Input
            size="large"
            style={styles.passwordInput}
            placeholder="Mot de passe"
            disabled={this.state.loading}
            accessoryRight={LockIcon}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={this.setPassword}
            caption={
              this.state.showPasswordError ? "Mot de passe non valide" : ""
            }
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              disabled={this.state.loading}
              status="basic"
              onPress={this.onForgotPasswordButtonPress}
            >
              Mot de passe oublié ?
            </Button>
          </View>
        </Layout>
        <Button
          style={styles.signInButton}
          disabled={this.state.loading}
          onPress={this._onSignIn}
          size="giant"
        >
          CONNEXION
        </Button>
        <Button
          style={styles.signUpButton}
          disabled={this.state.loading}
          appearance="ghost"
          status="basic"
          onPress={this.onSignUpButtonPress}
        >
          Pas de compte ? Inscrivez-vous !
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

  setPassword = (value) => {
    if (value.length < 8) {
      this.setState({
        password: value,
        showPasswordError: true,
      });
    } else {
      this.setState({
        password: value,
        showPasswordError: false,
      });
    }
  };

  onForgotPasswordButtonPress = () => {
    this.props.navigation.navigate("PasswordReset");
  };

  onSignUpButtonPress = () => {
    this.props.navigation.navigate("Signup");
  };

  _onSignIn = () => {
    Keyboard.dismiss();
    if (!this.state.showEmailError && !this.state.showPasswordError) {
      this.setState({
        loading: true,
      });
      fetch(API_URL + "customer", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email.toLowerCase(),
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.setState({
            loading: false,
          });
          if (!response.error) {
            let token = response.token_type + " " + response.access_token;
            await AsyncStorage.setItem("token", token);
            this.props.navigation.navigate("App");
          } else {
            createAlert("Oups!", response.messages, false);
          }
        })
        .catch((e) => {
          this.setState({
            loading: false,
          });
          console.error(e);
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
    minHeight: 200,
    backgroundColor: "#3366FF",
  },
  headerText: {
    marginBottom: 15,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
