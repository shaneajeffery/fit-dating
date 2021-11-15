/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { persistCache } from 'apollo3-cache-persist';
import * as eva from '@eva-design/eva';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json';
import {
  useFonts,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_500Medium,
} from '@expo-google-fonts/rubik';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Auth/Login';
import RegisterScreen from './src/screens/Auth/Register';
import LikesScreen from './src/screens/Likes/Likes';
import MessagesScreen from './src/screens/Messages/Messages';
import ProfileScreen from './src/screens/Profile/Profile';

import { AuthContext } from './src/context/AuthContext';

const cache = new InMemoryCache();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:9090',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  });

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (!fontsLoaded || loadingCache) {
    return <Text>Loading...</Text>;
  }

  const handleChangeLoginState = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <AuthContext.Provider
            value={{
              handleChangeLoginState: handleChangeLoginState,
            }}
          >
            <StatusBar barStyle="light-content" />
            <NavigationContainer>
              {loggedIn === false ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login">
                    {(props) => <LoginScreen {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  {/* <Tab.Screen name="ResetPassword" component={ResetPassword} /> */}
                </Stack.Navigator>
              ) : (
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Likes" component={LikesScreen} />
                  <Tab.Screen name="Messages" component={MessagesScreen} />
                  <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider>
      </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092147',
  },
});
