import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image } from 'react-native';

import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import AddProduct from './screen/AddProduct';
import Profile from './screen/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ()=>
            <Image source={require('./assets/images/female.png')} style={{width: 30, height: 30, borderRadius: 10}} resizeMode="stretch"/>
          
        }}/>
        <Tab.Screen name="Add" component={AddProduct} options={{
          tabBarIcon: ()=>
            <Image source={require('./assets/images/female.png')} style={{width: 30, height: 30, borderRadius: 10}} resizeMode="stretch"/>
          
        }}/><Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ()=>
            <Image source={require('./assets/images/female.png')} style={{width: 30, height: 30, borderRadius: 10}} resizeMode="stretch"/>
          
        }}/>
  
      </Tab.Navigator>
    );
  }

const App = () => {

    const doLogout = (navigation) => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ gestureEnabled: false }} />
                    <Stack.Screen name='HomeTabs' component={HomeTabs} options={{ gestureEnabled: false }} />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default App;