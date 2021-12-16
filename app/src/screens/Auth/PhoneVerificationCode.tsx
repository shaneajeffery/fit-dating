import React, { useState, useEffect, useContext } from 'react';

import OTPInputView from '../../components/OTPInputView';
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, Stack, Button } from 'native-base';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const VERIFY_PHONE_VERIFICATION_CODE_MUTATION = gql`
  mutation VerifyPhoneVerificationCodeMutation(
    $phoneId: String!
    $code: String!
  ) {
    verifyPhoneVerificationCode(phoneId: $phoneId, code: $code)
  }
`;

const GET_USER_BY_STYTCH_ID_QUERY = gql`
  query GetUserByStytchIdQuery($phoneId: String!, $userId: String!) {
    getUserByStytchId(phoneId: $phoneId, userId: $userId) {
      id
      finishedOnboarding
    }
  }
`;

const CREATE_JWT_TOKEN_MUTATION = gql`
  mutation createJwtTokenMutation($userId: String!) {
    createJwtToken(userId: $userId) {
      token
    }
  }
`;

const PhoneVerificationCodeScreen = ({ route, navigation }) => {
  // TODO: left off needing to handle logging the user in if they already
  // exist in Stytch and then that will take care of the redirect to Home.

  const { handleChangeLoginState } = useContext(AuthContext);
  const [enteredCode, setEnteredCode] = useState('');

  const [
    verifyPhoneVerificationCode,
    {
      data: phoneVerificationCodeData,
      loading: phoneVerificationCodeLoading,
      error: phoneVerificationCodeError,
    },
  ] = useMutation(VERIFY_PHONE_VERIFICATION_CODE_MUTATION);

  const [createJwtToken, { data: jwtTokenData, error: jwtTokenDataError }] =
    useMutation(CREATE_JWT_TOKEN_MUTATION);

  const [
    getUserByStytchId,
    {
      data: stytchUserData,
      loading: stytchUserDataLoading,
      error: stytchUserDataError,
    },
  ] = useLazyQuery(GET_USER_BY_STYTCH_ID_QUERY);

  const handleContinue = () => {
    verifyPhoneVerificationCode({
      variables: { phoneId: route.params.phoneId, code: enteredCode },
    });
  };

  useEffect(() => {
    getUserByStytchId({
      variables: {
        phoneId: route.params.phoneId,
        userId: route.params.userId,
      },
    });
  }, []);

  useEffect(() => {
    console.log(jwtTokenDataError);

    if (jwtTokenData) {
      handleChangeLoginState(true, jwtTokenData.createJwtToken.token);
      console.log(jwtTokenData);
    }
  }, [jwtTokenData]);

  useEffect(() => {
    if (phoneVerificationCodeError) {
      console.log(phoneVerificationCodeError);
    }

    if (phoneVerificationCodeData) {
      if (
        stytchUserData &&
        stytchUserData.getUserByStytchId.finishedOnboarding
      ) {
        console.log(stytchUserData);

        createJwtToken({
          variables: { userId: stytchUserData.getUserByStytchId.id },
        });
      } else {
        navigation.navigate('Register');
      }
    }
  }, [phoneVerificationCodeData]);

  return (
    <Box style={styles.container}>
      <Stack mt={3} space={4}>
        <Heading style={styles.heading}>Enter passcode</Heading>
        <Text fontSize="md" style={styles.text}>
          A 6-digit passcode was sent to you at{' '}
          <Text fontWeight="black">{route.params.phoneNumber}</Text>.
        </Text>

        <OTPInputView
          style={{
            width: '80%',
            height: 50,
            alignItems: 'center',
          }}
          pinCount={6}
          onCodeChanged={(code) => setEnteredCode(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.borderStyleBase}
          codeInputHighlightStyle={styles.borderStyleHighLighted}
          selectionColor="#092147"
        />

        <Stack mt={0} space={2}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#58B29A', '#8AC33D']}
            style={styles.linearGradient}
          >
            <Button
              size="lg"
              onPress={handleContinue}
              style={styles.continueButton}
            >
              Continue
            </Button>
          </LinearGradient>

          <Button
            size="lg"
            onPress={() => navigation.push('Login')}
            variant=""
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#092147',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  textInputContainer: {
    marginBottom: 20,
  },

  heading: {
    color: '#092147',
    fontFamily: 'Rubik_500Medium',
  },
  text: {
    color: '#092147',
    fontWeight: '800',
    fontFamily: 'Rubik_400Regular',
  },
  continueButton: {
    backgroundColor: 'transparent',
  },
  continueButtonText: {
    color: 'white',
    fontFamily: 'Rubik_500Medium',
    fontSize: 16,
  },
  cancelButton: {},
  cancelButtonText: {
    color: '#092147',
    fontFamily: 'Rubik_400Regular',
    fontSize: 16,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
  },
});

export default PhoneVerificationCodeScreen;
