import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../pages/home/Home";
import Journeys from "../pages/journeys/Journeys";
import { AntDesign } from "@expo/vector-icons";
import Profil from "../pages/profil/Profil";
import DeleteAccount from "../pages/delete_account/DeleteAccount";

const AppNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Parcours",
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
        },
        headerTintColor: "#fff",
        headerMode: "screen",
        headerStyle: {
          backgroundColor: "#FFA13D",
        },
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Profil")}
          >
            <AntDesign
              name="user"
              size={26}
              color="white"
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        ),
        headerLeft: () => <View style={{ padding: 6 }}></View>,
        headerMode: "screen",
      }),
    },
    Journeys: {
      screen: Journeys,
      navigationOptions: {
        title: "Parcours",
      },
    },
    Profil: {
      screen: Profil,
      navigationOptions: {
        title: "Profil"
      }
    },
    DeleteAccount: {
      screen: DeleteAccount,
      navigationOptions: {
        title: "Paramètres"
      }
    }
  },
  {
    intialRouteName: "Home",
  }
);
const styles = StyleSheet.create({
  icon: {
    marginRight: 16,
  },
});
export default AppNavigation;
