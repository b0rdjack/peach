import { createStackNavigator } from "react-navigation-stack";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default AuthNavigation;
