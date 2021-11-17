/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Stack, Button, Input, Text } from 'native-base';

import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { useForm, useController } from 'react-hook-form';

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
  const { control, handleSubmit } = useForm();

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

  const onLogin = (params: any) => {
    login({ variables: { email: params.email, password: params.password } });
  };

  const ControlledInput = (params: any) => {
    const { field } = useController({
      control: params.control,
      defaultValue: '',
      name: params.name,
    });

    return (
      <Input
        size="lg"
        placeholder={params.placeholder}
        autoCapitalize="none"
        secureTextEntry={params.secureTextEntry}
        value={field.value}
        onChangeText={field.onChange}
        color="#ffffff"
        borderColor="grey"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} />
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.signInLabel}>Login</Text>
      </View>
      <Stack ml={3} mr={3} mt={3} space={4}>
        <ControlledInput
          placeholder="Enter your e-mail or phone number"
          type="text"
          name="email"
          control={control}
        />
        <ControlledInput
          styles={styles.passwordInput}
          placeholder="Enter your password"
          secureTextEntry={true}
          name="password"
          control={control}
        />
      </Stack>

      <Stack>
        <Button
          variant="link"
          onPress={() => navigation.navigate('ResetPassword')}
          color="#97C153"
        >
          Forgot Your Password?
        </Button>
      </Stack>

      <Stack ml={3} mr={3} mt={20} space={0}>
        <Button
          size="lg"
          onPress={handleSubmit(onLogin)}
          style={styles.signInButton}
        >
          SIGN IN
        </Button>
        <Button
          size="lg"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
        >
          REGISTER
        </Button>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    marginBottom: 10,
    backgroundColor: '#00ABE7',
    borderColor: '#00ABE7',
    color: '#FFFFFF',
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
    paddingVertical: 100,
    paddingHorizontal: 5,
    backgroundColor: '#092147',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  signInContainer: {
    marginTop: 43,
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
