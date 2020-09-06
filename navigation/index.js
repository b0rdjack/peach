import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigation from "./AuthNavigation";
import AppNavigation from './AppNavigation';
import AuthLoading from './AuthLoading';

const SwitchContainer = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthNavigation,
    App: AppNavigation
  }, {
    initialRouteName: 'AuthLoading'
  }
)

const AppContainer = createAppContainer(SwitchContainer);

export default AppContainer;
