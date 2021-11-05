import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { Link } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { setItem } from '../../utils/async-storage';
import { useForm, useController } from 'react-hook-form';
import { ImageOverlay } from './extra/image-overlay';
import {
  ArrowForwardIcon,
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from './extra/icons';
import { KeyboardAvoidingView } from './extra/keyboard-avoiding-view';

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const onSignInButtonPress = () => {};

  const onSignUpButtonPress = () => {};

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
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpeg')}
      >
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            SIGN IN
          </Text>
          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            size="giant"
            // accessoryLeft={ArrowForwardIcon}
            onPress={onSignUpButtonPress}
          >
            Sign Up
          </Button>
        </View>
        <View style={styles.formContainer}>
          <Input
            label="EMAIL"
            placeholder="Email"
            status="control"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder="Password"
            label="PASSWORD"
            status="control"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button status="control" size="large" onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        {/* <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Sign with a social account
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View> */}
      </ImageOverlay>
    </KeyboardAvoidingView>

    // <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
    //   <Heading size="lg" fontWeight="600" color="coolGray.800">
    //     Welcome
    //   </Heading>
    //   <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
    //     Sign in to continue!
    //   </Heading>

    //   <VStack space={3} mt="5">
    //     <FormControl>
    //       <FormControl.Label
    //         _text={{
    //           color: 'coolGray.800',
    //           fontSize: 'xs',
    //           fontWeight: 500,
    //         }}
    //       >
    //         Email
    //       </FormControl.Label>
    //       <ControlledInput type="text" name="email" control={control} />
    //     </FormControl>
    //     <FormControl>
    //       <FormControl.Label
    //         _text={{
    //           color: 'coolGray.800',
    //           fontSize: 'xs',
    //           fontWeight: 500,
    //         }}
    //       >
    //         Password
    //       </FormControl.Label>
    //       <ControlledInput type="password" name="password" control={control} />
    //       {/* <Link
    //         _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
    //         alignSelf="flex-end"
    //         mt="1"
    //       >
    //         Forget Password?
    //       </Link> */}
    //     </FormControl>
    //     <Button
    //       mt="2"
    //       colorScheme="indigo"
    //       _text={{ color: 'white' }}
    //       onPress={handleSubmit(onLogin)}
    //     >
    //       Sign in
    //     </Button>
    //     <HStack mt="6" justifyContent="center">
    //       <Text fontSize="sm" color="muted.700" fontWeight={400}>
    //         I'm a new user.{' '}
    //       </Text>
    //       <Link to={{ screen: 'Register' }}>Sign Up</Link>
    //     </HStack>
    //   </VStack>
    // </Box>
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
