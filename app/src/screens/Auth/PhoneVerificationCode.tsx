import React, { useState, useEffect } from 'react';

import OTPInputView from '../../components/OTPInputView';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Box, Text, Heading, Stack, Button } from 'native-base';
import { gql, useMutation } from '@apollo/client';

const VERIFY_PHONE_VERIFICATION_CODE_MUTATION = gql`
  mutation VerifyPhoneVerificationCodeMutation(
    $phoneId: String!
    $code: String!
  ) {
    verifyPhoneVerificationCode(phoneId: $phoneId, code: $code)
  }
`;

const PhoneVerificationCodeScreen = ({ route, navigation }) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [clearInputs, setClearInputs] = useState(false);

  const [
    verifyPhoneVerificationCode,
    {
      data: phoneVerificationCodeData,
      loading: phoneVerificationCodeLoading,
      error: phoneVerificationCodeError,
    },
  ] = useMutation(VERIFY_PHONE_VERIFICATION_CODE_MUTATION);

  const handleContinue = () => {
    verifyPhoneVerificationCode({
      variables: { phoneId: route.params.phoneId, code: enteredCode },
    });
  };

  useEffect(() => {
    console.log(phoneVerificationCodeData);

    if (phoneVerificationCodeData) {
      if (phoneVerificationCodeData.verifyPhoneVerificationCode) {
        navigation.navigate('Register');
      } else {
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
          selectionColor="white"
        />

        <Stack mt={0} space={2}>
          <Button
            size="lg"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continue
          </Button>

          <Button
            size="lg"
            onPress={() => navigation.push('Login')}
            style={styles.cancelButton}
          >
            Cancel
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
    borderColor: '#0FB599',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    backgroundColor: '#092147',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 6,
    borderWidth: 2,
    color: 'white',
    margin: 3,
  },
  heading: {
    color: '#FFFFFF',
    fontFamily: 'Rubik_500Medium',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontFamily: 'Rubik_400Regular',
  },
  continueButton: {
    backgroundColor: '#00ABE7',
    borderColor: '#00ABE7',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#81C14B',
    borderColor: '#81C14B',
    color: '#FFFFFF',
  },
});

export default PhoneVerificationCodeScreen;
