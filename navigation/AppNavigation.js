import { createStackNavigator } from "react-navigation-stack";
import Home from "../pages/home/Home";

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    intialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default AppNavigation;
