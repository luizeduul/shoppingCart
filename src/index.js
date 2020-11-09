import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes';

import store from './store';

const App = () => {
  return (
    <Provider
      store={store}
    >
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#131E38" />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
