/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { persistCache } from 'apollo3-cache-persist';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { getItem, setItem } from './src/utils/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
} from '@expo-google-fonts/rubik';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Auth/Login';
import RegisterScreen from './src/screens/Auth/Register';
import PhoneVerification from './src/screens/Auth/PhoneVerification';
import PhoneVerificationCode from './src/screens/Auth/PhoneVerificationCode';
import LikesScreen from './src/screens/Likes/Likes';
import MessagesScreen from './src/screens/Messages/Messages';
import ProfileScreen from './src/screens/Profile/Profile';

import { AuthContext } from './src/context/AuthContext';
import { Splash } from './src/components/Splash';

import AnimatedSplash from 'react-native-animated-splash-screen';

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

    const userAuthToken = getItem('authToken');

    console.log('START :: Auth Token');
    console.log(userAuthToken);
    console.log('END :: Auth Token');

    if (userAuthToken) {
      setAppIsReady(true);
      setLoggedIn(true);
    } else {
      prepare();
    }
  }, []);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  const handleChangeLoginState = (loggedIn: boolean, token?: string) => {
    if (token) {
      console.log(token);

      setItem('authToken', token);
    }

    setLoggedIn(loggedIn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedSplash
        isLoaded={appIsReady && fontsLoaded && !loadingCache}
        customComponent={<Splash />}
        backgroundColor={'#092147'}
        translucent={true}
      >
        <ApolloProvider client={client}>
          <NativeBaseProvider>
            <AuthContext.Provider
              value={{
                handleChangeLoginState: handleChangeLoginState,
              }}
            >
              <StatusBar />
              <NavigationContainer>
                {loggedIn === false ? (
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login">
                      {(props) => <LoginScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen
                      name="PhoneVerification"
                      component={PhoneVerification}
                    />
                    <Stack.Screen
                      name="PhoneVerificationCode"
                      component={PhoneVerificationCode}
                    />
                  </Stack.Navigator>
                ) : (
                  <Tab.Navigator
                    screenOptions={{
                      headerShown: false,
                      tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        marginTop: -30,
                        borderTopWidth: 0,
                        shadowColor: 'black',
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                      },

                      tabBarShowLabel: false,
                    }}
                  >
                    <Tab.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <FontAwesome
                            name="home"
                            size={20}
                            color={focused ? '#0FB599' : 'lightgrey'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Likes"
                      component={LikesScreen}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <FontAwesome
                            name="heart"
                            size={16}
                            color={focused ? '#0FB599' : 'lightgrey'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Messages"
                      component={MessagesScreen}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <FontAwesome
                            name="comments"
                            size={20}
                            color={focused ? '#0FB599' : 'lightgrey'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Profile"
                      component={ProfileScreen}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <FontAwesome
                            name="user-circle"
                            size={18}
                            color={focused ? '#0FB599' : 'lightgrey'}
                          />
                        ),
                      }}
                    />
                  </Tab.Navigator>
                )}
              </NavigationContainer>
            </AuthContext.Provider>
          </NativeBaseProvider>
        </ApolloProvider>
      </AnimatedSplash>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
  },

  videoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
