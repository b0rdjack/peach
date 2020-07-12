import React, { Component } from "react";
import { View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import { createAlert } from "../../components/Alert";
import { API_URL } from "../../constant";
import AsyncStorage from "@react-native-community/async-storage";

const LockIcon = (props) => <Icon name="lock" {...props} />;
const DeleteIcon = (props) => <Icon name="trash-2-outline" {...props} />;

export default class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      password: "",
      showPasswordError: true,
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({
      token: this.props.navigation.state.params.token,
    });
  }
  render() {
    return (
      <Layout level="1" style={styles.container}>
        <View style={{ marginVertical: 25 }}>
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
          <Button
            style={styles.delete}
            status="danger"
            size="large"
            appearance="outline"
            onPress={this._delete}
            disabled={this.state.loading}
            accessoryLeft={DeleteIcon}
          >
            Supprimer mon compte
          </Button>
        </View>
      </Layout>
    );
  }

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
  _delete = async () => {
    if (this.state.showPasswordError) {
      createAlert("Oups !", "Veuillez saisir un mot de passe valide", true);
    } else {
      this.setState({
        loading: true,
      });
      fetch(API_URL + "customer", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.token,
        },
        body: JSON.stringify({
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.setState({
            loading: false,
          });
          if (!response.error) {
            await AsyncStorage.clear();
            createAlert(
              "Information",
              "Votre compte a bien été supprimé.",
              true
            );
            this.props.navigation.navigate("Auth");
          } else {
            createAlert("Oups !", response.messages, false);
          }
        })
        .catch((e) => {
          this.setState({
            loading: false,
          });
          console.error(e);
        });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  passwordInput: {},
  delete: {
    marginTop: 25,
  },
});
