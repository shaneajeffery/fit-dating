import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  // Link,
  Button,
  HStack,
} from 'native-base';
import { Link } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { useForm, useController } from 'react-hook-form';

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = () => {
  const { control, handleSubmit } = useForm();

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN);

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

  const ControlledInput = ({ type, name, control }) => {
    const { field } = useController({
      control,
      defaultValue: '',
      name,
    });

    return (
      <Input
        type={type}
        autoCapitalize="none"
        value={field.value}
        onChangeText={field.onChange}
      />
    );
  };

  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Email
          </FormControl.Label>
          <ControlledInput type="text" name="email" control={control} />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Password
          </FormControl.Label>
          <ControlledInput type="password" name="password" control={control} />
          {/* <Link
            _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
            alignSelf="flex-end"
            mt="1"
          >
            Forget Password?
          </Link> */}
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          _text={{ color: 'white' }}
          onPress={handleSubmit(onLogin)}
        >
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{' '}
          </Text>
          <Link to={{ screen: 'Register' }}>Sign Up</Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
