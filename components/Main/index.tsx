import Feed from './Feed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Add from './Add';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import Search from './Search';

const Main = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName='Feed'
      labeled={false}
      inactiveColor='#3e2465'
      activeColor='indigo'
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name='Add'
        component={Add}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='plus-box' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Main;
