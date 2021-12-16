import React, { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';
import { Box, Text, Heading, Stack, Button } from 'native-base';
import { gql, useMutation } from '@apollo/client';
import MaskInput from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';

import PHONE_NUMBER_MASKS from '../../utils/phone-number-masks';

const REQUEST_PHONE_VERIFICATION_CODE_MUTATION = gql`
  mutation RequestPhoneVerificationCodeMutation($phoneNumber: String!) {
    requestPhoneVerificationCode(phoneNumber: $phoneNumber) {
      phoneId
      userId
      userCreated
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
        userId: phoneVerificationCodeData.requestPhoneVerificationCode.userId,
        userCreated:
          phoneVerificationCodeData.requestPhoneVerificationCode.userCreated,
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
          selectionColor="#092147"
          placeholderTextColor="grey"
          style={styles.phoneInput}
        />
        <Text fontSize="xs" style={styles.text}>
          By continuing, you will an SMS for verification. Message and data
          rates may apply.
        </Text>

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
              <Text style={styles.continueButtonText}>Continue</Text>
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

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
  },
  heading: {
    color: '#092147',
    fontFamily: 'Rubik_500Medium',
  },
  text: {
    color: '#092147',
    fontFamily: 'Rubik_400Regular',
  },
  phoneInput: {
    color: '#092147',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    height: 37,
    borderRadius: 3,
    marginBottom: 20,
    marginTop: 10,
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
});
