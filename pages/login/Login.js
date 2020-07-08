import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "./3rd-party";

const LockIcon = (props) => <Icon name="lock" {...props} />;

const EmailIcon = (props) => <Icon name="email" {...props} />;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordVisible: false,
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Connexion
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
          <Input
            size="large"
            style={styles.passwordInput}
            placeholder="Mot de passe"
            accessoryRight={LockIcon}
            caption="Une majuscule, une minuscule, un chiffre et un caractère spéciale."
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={this.setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="basic"
              onPress={this.onForgotPasswordButtonPress}
            >
              Mot de passe oublié ?
            </Button>
          </View>
        </Layout>
        <Button
          style={styles.signInButton}
          onPress={this._onSignIn}
          size="giant"
        >
          CONNEXION
        </Button>
        <Button
          style={styles.signUpButton}
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
    this.setState({
      email: value,
    });
  };

  setPassword = (value) => {
    this.setState({
      password: value,
    });
  };

  onForgotPasswordButtonPress = () => {
    this.props.navigation.navigate("PasswordReset");
  };

  onSignUpButtonPress = () => {
    this.props.navigation.navigate("Signup");
  };

  _onSignIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
    console.log("Hello");
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
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
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
