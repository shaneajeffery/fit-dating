/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { persistCache } from 'apollo3-cache-persist';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { Video } from 'expo-av';

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
} from '@expo-google-fonts/rubik';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Auth/Login';
import RegisterScreen from './src/screens/Auth/Register';
import LikesScreen from './src/screens/Likes/Likes';
import MessagesScreen from './src/screens/Messages/Messages';
import ProfileScreen from './src/screens/Profile/Profile';
import ResetPasswordScreen from './src/screens/Auth/ResetPassword';

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
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded || loadingCache) {
    const { width } = Dimensions.get('window');

    return (
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar barStyle="light-content" />
        <View style={styles.videoContainer}>
          <Video
            source={require('./assets/splash-logo.mp4')}
            shouldPlay
            resizeMode="cover"
            style={{ width, height: 300 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleChangeLoginState = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ApolloProvider client={client}>
        <NativeBaseProvider>
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
                  <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                  />
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
        </NativeBaseProvider>
      </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092147',
  },

  videoContainer: {
    marginTop: 100,
  },
});
