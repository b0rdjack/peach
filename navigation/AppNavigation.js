import { createStackNavigator } from "react-navigation-stack";
import Home from "../pages/home/Home";
import Journeys from "../pages/journeys/Journeys";

const AppNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Journeys: {
      screen: Journeys,
      navigationOptions: {
        title: "Parcours",
      },
    },
  },
  {
    intialRouteName: "Home",
  }
);

export default AppNavigation;
