import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Detalles from './Components/Detalles';
import GenI from './Components/GenI';

const stackNavigator = createStackNavigator(
  {
    Inicio: {
      screen: GenI,
    },
    Detalles: {
      screen: Detalles,
    },
  },
  {
    initialRouteName: 'Inicio',
  },
);

const AppContainer = createAppContainer(stackNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
