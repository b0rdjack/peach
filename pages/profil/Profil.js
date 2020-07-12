import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Card,
  Divider,
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../../constant";
import { createAlert } from "../../components/Alert";
import ProfilItem from "../../components/ProfilItem";

const UserIcon = (props) => <Icon name="person-outline" {...props} />;
const LogoutIcon = (props) => <Icon name="power-outline" {...props} />;
const DeleteIcon = (props) => <Icon name="trash-2-outline" {...props} />;

export default class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      loading: false,
      disable: false,
      user: {},
    };
  }

  async componentDidMount() {
    await this._getToken();
    await this._getUser();
  }

  render() {
    return (
      <Layout level="1" style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerText}>
            <AntDesign name="user" size={64} color="white" />
          </View>
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        {this.state.user ? (
          <View style={{ flex: 1 }}>
            <ProfilItem label="Prénom" value={this.state.user.first_name} />
            <Divider />
            <ProfilItem label="Nom" value={this.state.user.last_name} />
            <Divider />
            <ProfilItem label="E-mail" value={this.state.user.email} />
            <Divider />
          </View>
        ) : null}
        <Button
          style={styles.logout}
          status="warning"
          size="large"
          appearance="outline"
          onPress={this.logout}
          disabled={this.state.disable}
          accessoryLeft={LogoutIcon}
        >
          Déconnexion
        </Button>
        <Button
          style={styles.delete}
          status="danger"
          size="large"
          appearance="outline"
          onPress={this.delete}
          disabled={this.state.disable}
          accessoryLeft={DeleteIcon}
        >
          Supprimer mon compte
        </Button>
      </Layout>
    );
  }

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  delete = () => {
    this.props.navigation.navigate("DeleteAccount", {
      token: this.state.token,
    });
  };

  _getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    this.setState({
      token: token,
    });
  };

  _getUser = async () => {
    this.setState({
      loading: true,
      disable: true,
    });
    fetch(API_URL + "customer", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          loading: false,
          disable: false,
        });
        if (!response.error) {
          this.setState({
            user: response.user,
          });
        } else {
          createAlert("Oups !", response.messages, false);
          this.setState({
            disable: true,
          });
        }
      })
      .catch((e) => {
        this.setState({
          loading: false,
          disable: true,
        });
        console.error(e);
      });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    backgroundColor: "#3CA9FC",
  },
  logout: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  delete: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
