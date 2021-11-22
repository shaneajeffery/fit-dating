/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { StyleSheet, View, Image, SafeAreaView, Text, Box } from 'react-native';
import { Stack, Button } from 'native-base';

import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { FontAwesome } from '@expo/vector-icons';

// import MaskInput from 'react-native-mask-input';

// import PHONE_NUMBER_MASKS from '../../utils/phone-number-masks';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface Props {
  navigation: any;
}

const LoginScreen = ({ navigation }: Props) => {
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const { handleChangeLoginState } = useContext(AuthContext);

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (loginData) {
      const authToken = loginData.login.token;
      setItem('authToken', authToken);
      handleChangeLoginState(true);
    }
  }, [loginData, loginLoading, loginError]);

  const handleLogin = async () => {
    console.log('hello worl');

    // login({ variables: { email: params.email, password: params.password } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          width={100}
          height={100}
          resizeMode="contain"
          source={require('./assets/logo.png')}
        />
      </View>

      <Stack
        ml={3}
        mr={3}
        space={1}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <Button
          size="lg"
          onPress={handleLogin}
          style={styles.phoneButton}
          leftIcon={
            <FontAwesome
              name="mobile-phone"
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        >
          Login with Phone Number
        </Button>
        <Button
          size="lg"
          onPress={handleLogin}
          style={styles.facebookButton}
          leftIcon={
            <FontAwesome
              name="facebook"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        >
          Login with Facebook
        </Button>

        <Button
          size="lg"
          onPress={handleLogin}
          style={styles.appleButton}
          leftIcon={
            <FontAwesome
              name="apple"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
        >
          Login with Apple
        </Button>

        <Button
          size="lg"
          onPress={handleLogin}
          style={styles.googleButton}
          leftIcon={
            <FontAwesome
              name="google"
              size={20}
              color="white"
              style={{ marginRight: 4 }}
            />
          }
        >
          Login with Google
        </Button>
      </Stack>

      {/* <View style={styles.signInContainer}>
        <Text style={styles.signInLabel}>Login</Text>
      </View>
      <Stack ml={3} mr={3} mt={3} space={4}>
        <View>
          <MaskInput
            value={enteredPhoneNumber}
            onChangeText={(masked, unmasked) => {
              setEnteredPhoneNumber(unmasked); // you can use the unmasked value as well
            }}
            mask={PHONE_NUMBER_MASKS['united_states']}
            placeholder="Enter your phone number"
            selectionColor="white"
            placeholderTextColor="#FFFFFF96"
            style={styles.phoneInput}
          />
        </View>
      </Stack>

      <Stack ml={3} mr={3} mt={5} space={0}>
        <Button size="lg" onPress={handleLogin} style={styles.signInButton}>
          SIGN IN
        </Button>
        <Button
          size="lg"
          onPress={() => navigation.push('Register')}
          style={styles.registerButton}
        >
          REGISTER
        </Button>
      </Stack> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    height: 37,
    borderRadius: 3,
  },
  forgotPasswordText: {
    color: '#97C153',
    fontFamily: 'Rubik_500Medium',
  },

  phoneButton: {
    fontFamily: 'Rubik_500Medium',
    marginBottom: 10,
    backgroundColor: '#092147',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',

    justifyContent: 'flex-start',
    fontSize: 100,
  },

  googleButton: {
    marginBottom: 10,
    backgroundColor: '#EA4335',
    borderColor: '#EA4335',
    color: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  facebookButton: {
    marginBottom: 10,
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
    color: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  appleButton: {
    marginBottom: 10,
    backgroundColor: '#7D7D7D',
    borderColor: '#7D7D7D',
    color: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  signInButton: {
    marginBottom: 10,
    backgroundColor: '#00ABE7',
    borderColor: '#00ABE7',
    color: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  registerButton: {
    marginBottom: 10,
    backgroundColor: '#81C14B',
    borderColor: '#81C14B',
    color: '#FFFFFF',
  },

  actionsContainer: {
    marginTop: 50,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: '#092147',
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    marginTop: 40,
    marginLeft: 5,
  },
  socialAuthContainer: {
    marginTop: 48,
  },

  formContainer: {
    marginTop: 30,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    fontFamily: 'Rubik_500Medium',
    color: '#ffffff',
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 8,
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default LoginScreen;
