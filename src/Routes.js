import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import Catalog from './pages/Catalog';
import Header from './components/Header';
import Cart from './pages/Cart';

const { Screen, Navigator } = createStackNavigator();

const Routes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: '#313746' },
      }}
      initialRouteName={Catalog}
    >
      <Screen
        name="Catalog"
        component={Catalog}
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => <Header />,
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header />,
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { marginLeft: 20 },
          headerBackImage: () => (
            <Feather name="chevron-left" size={24} color="#f3f9ff" />
          ),
        }}
      />
    </Navigator>
  );
};

export default Routes;
