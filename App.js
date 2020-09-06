import React, {Component} from 'react';
import { StyleSheet } from "react-native";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  Input,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import AppContainer from './navigation'

const HeartIcon = (props) => <Icon {...props} name="heart" />;
export default class App extends Component {
  render() {
    return (
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppContainer />
      </ApplicationProvider>
    </>
    );
  }
}