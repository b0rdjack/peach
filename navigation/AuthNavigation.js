import { createStackNavigator } from "react-navigation-stack";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import PasswordReset from "../pages/password_reset/PasswordReset";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    PasswordReset: { screen: PasswordReset },
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
