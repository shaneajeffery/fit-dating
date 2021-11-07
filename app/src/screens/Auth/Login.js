import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { useForm, useController } from 'react-hook-form';
import { ImageOverlay } from './extra/image-overlay';
import { ArrowForwardIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/keyboard-avoiding-view';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (loginData) {
      const authToken = loginData.login.token;
      setItem('authToken', authToken);
      handleChangeLoginState(true);
    }
  }, [loginData, loginLoading, loginError]);

  const onLogin = ({ email, password }) => {
    login({ variables: { email, password } });
  };

  const ControlledInput = ({ label, styles, type, name, control }) => {
    const { field } = useController({
      control,
      defaultValue: '',
      name,
    });

    return (
      <Input
        label={label}
        style={styles}
        type={type}
        autoCapitalize="none"
        value={field.value}
        onChangeText={field.onChange}
      />
    );
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            Login
          </Text>
          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            size="giant"
            accessoryLeft={ArrowForwardIcon}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
          </Button>
        </View>
        <View style={styles.formContainer}>
          <ControlledInput
            label="Email"
            type="text"
            name="email"
            control={control}
          />
          <ControlledInput
            styles={styles.passwordInput}
            label="Password"
            type="password"
            name="password"
            control={control}
          />
        </View>
        <Button status="control" size="large" onPress={handleSubmit(onLogin)}>
          SIGN IN
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
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
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
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
