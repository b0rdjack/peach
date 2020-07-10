import { createStackNavigator } from "react-navigation-stack";
import Home from "../pages/home/Home";
import Journey from "../pages/journey/Journey";

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Journey: { screen: Journey },
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
