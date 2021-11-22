import React, { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';
import { Box, Text, Heading, Stack, Button } from 'native-base';
import { gql, useMutation } from '@apollo/client';
import MaskInput from 'react-native-mask-input';

import PHONE_NUMBER_MASKS from '../../utils/phone-number-masks';

const REQUEST_PHONE_VERIFICATION_CODE_MUTATION = gql`
  mutation RequestPhoneVerificationCodeMutation($phoneNumber: String!) {
    requestPhoneVerificationCode(phoneNumber: $phoneNumber) {
      phoneId
    }
  }
`;

const PhoneVerificationScreen = ({ navigation }) => {
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [maskedEnteredPhoneNumber, setMaskedEnteredPhoneNumber] = useState('');

  const [
    requestPhoneVerificationCode,
    {
      data: phoneVerificationCodeData,
      loading: phoneVerificationCodeLoading,
      error: phoneVerificationCodeError,
    },
  ] = useMutation(REQUEST_PHONE_VERIFICATION_CODE_MUTATION);

  const handleContinue = () => {
    requestPhoneVerificationCode({
      variables: { phoneNumber: enteredPhoneNumber },
    });
  };

  useEffect(() => {
    if (phoneVerificationCodeData) {
      console.log(phoneVerificationCodeData);
      navigation.navigate('PhoneVerificationCode', {
        phoneId: phoneVerificationCodeData.requestPhoneVerificationCode.phoneId,
        phoneNumber: maskedEnteredPhoneNumber,
      });
    }
  }, [phoneVerificationCodeData]);

  return (
    <Box style={styles.container}>
      <Stack mt={3} space={4}>
        <Heading style={styles.heading}>Enter phone number</Heading>
        <Text fontSize="md" style={styles.text}>
          Enter your phone number to receive a passcode for authentication.
        </Text>

        <MaskInput
          value={enteredPhoneNumber}
          onChangeText={(masked, unmasked) => {
            setEnteredPhoneNumber(unmasked);
            setMaskedEnteredPhoneNumber(masked);
          }}
          mask={PHONE_NUMBER_MASKS['united_states']}
          placeholder="(123) 456-7890"
          selectionColor="white"
          placeholderTextColor="#FFFFFF96"
          style={styles.phoneInput}
        />
        <Text fontSize="xs" style={styles.text}>
          By continuing, you will an SMS for verification. Message and data
          rates may apply.
        </Text>

        <Stack mt={0} space={2}>
          <Button
            size="lg"
            onPress={handleContinue}
            style={styles.signInButton}
          >
            Continue
          </Button>
          <Button
            size="lg"
            onPress={() => navigation.push('Login')}
            style={styles.registerButton}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    backgroundColor: '#092147',
  },
  heading: {
    color: '#FFFFFF',
    fontFamily: 'Rubik_500Medium',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Rubik_400Regular',
  },
  phoneInput: {
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    height: 37,
    borderRadius: 3,
    marginBottom: 20,
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: '#00ABE7',
    borderColor: '#00ABE7',
    color: '#FFFFFF',
  },

  registerButton: {
    backgroundColor: '#81C14B',
    borderColor: '#81C14B',
    color: '#FFFFFF',
  },
});
