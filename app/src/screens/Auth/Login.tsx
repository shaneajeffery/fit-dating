/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { useForm, useController } from 'react-hook-form';

import { ArrowForwardIcon } from './extra/icons';

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
        placeholder={params.placeholder}
        label={params.label}
        style={params.styles}
        autoCapitalize="none"
        secureTextEntry={params.secureTextEntry}
        value={field.value}
        onChangeText={field.onChange}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} />
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.signInLabel} status="control" category="h4">
          Login
        </Text>
      </View>
      <View style={styles.formContainer}>
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
      </View>
      <Button status="control" size="large" onPress={handleSubmit(onLogin)}>
        SIGN IN
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#092147',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 43,
    marginLeft: 5,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
    fontFamily: 'Rubik_500Medium',
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
