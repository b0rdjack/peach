import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "../login/3rd-party";
import { Layout, Input, Icon, Text, Button } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";

const LockIcon = (props) => <Icon name="lock" {...props} />;

const EmailIcon = (props) => <Icon name="email" {...props} />;

const PersonIcon = (props) => <Icon name="person" {...props} />;

const CalendarIcon = (props) => <Icon name="calendar" {...props} />;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      passwordVisible: false,
      datepicker: new Date(),
      date_of_birth: "JJ/MM/AAAA",
      show: false,
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Inscription
          </Text>
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            placeholder="Nom"
            size="large"
            accessoryRight={PersonIcon}
            value={this.state.lastname}
            onChangeText={this.setLastname}
          />
          <Input
            placeholder="Prénom"
            size="large"
            style={styles.inputs}
            accessoryRight={PersonIcon}
            value={this.state.firstname}
            onChangeText={this.setFirstname}
          />
          <Input
            placeholder="Date de naissance"
            size="large"
            style={styles.inputs}
            accessoryRight={CalendarIcon}
            value={this.state.date_of_birth}
            onFocus={this.showDatePicker}
          />
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.datepicker}
              mode="date"
              display="calendar"
              onChange={this.setDateOfBirth}
            />
          )}
          <Input
            placeholder="E-mail"
            size="large"
            style={styles.inputs}
            accessoryRight={EmailIcon}
            value={this.state.email}
            onChangeText={this.setEmail}
          />
          <Input
            size="large"
            placeholder="Mot de passe"
            style={styles.inputs}
            accessoryRight={LockIcon}
            caption="Une majuscule, une minuscule, un chiffre, un caractère spéciale et 8 caractères minimum."
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={this.setPassword}
          />
        </Layout>
        <Button
          style={styles.signUpButton}
          onPress={this.onSignUp}
          size="giant"
        >
          INSCRIPTION
        </Button>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="basic"
          onPress={this.onSignInButtonPress}
        >
          Déjà inscrit ? Connectez-vous !
        </Button>
      </KeyboardAvoidingView>
    );
  }

  setLastname = (value) => {
    this.setState({
      lastname: value,
    });
  };

  setFirstname = (value) => {
    this.setState({
      firstname: value,
    });
  };

  showDatePicker = () => {
    this.setState({
      show: true,
    });
  };

  setDateOfBirth = (event, selectedDate) => {
    if (selectedDate != undefined) {
      let day = selectedDate.getDate();
      if (day < 10) day = "0" + day
      let month = selectedDate.getMonth();
      if (month < 10) month = "0" + month
      let year = selectedDate.getFullYear();
      this.setState({
        datepicker: selectedDate,
        date_of_birth: day + "/" + month + "/" + year,
        show: false,
      });
    }
  };

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

  onSignUp = () => {
    console.log("Sign Up");
  };

  onSignInButtonPress = () => {
    this.props.navigation.navigate("Login");
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
  inputs: {
    marginTop: 16,
  },
  signUpLabel: {
    marginTop: 16,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
