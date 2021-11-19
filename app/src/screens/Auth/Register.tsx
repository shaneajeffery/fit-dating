/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';

import { Text, Button, Input, Select, Image, Stack, VStack } from 'native-base';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { setItem } from '../../utils/async-storage';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm, useController } from 'react-hook-form';
import { CalendarIcon } from './extra/icons';
import IntlPhoneInput from 'react-native-intl-phone-input';

import { AuthContext } from '../../context/AuthContext';

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
    $dateOfBirth: String!
    $zipCode: String!
    $gender: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      phone: $phone
      dateOfBirth: $dateOfBirth
      zipCode: $zipCode
      gender: $gender
    ) {
      token
    }
  }
`;

const GENDER_QUERY = gql`
  query GenderQuery {
    listGenders {
      id
      name
    }
  }
`;

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm();
  // const [showPassword, setShowPassword] = useState(false);
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  // const [selectedGenderIndex, setSelectedGenderIndex] = useState<any>(
  //   new IndexPath(0)
  // );
  const { handleChangeLoginState } = useContext(AuthContext);

  // const formatDateService = new NativeDateService('en', {
  //   format: 'MM/DD/YYYY',
  // });

  const {
    data: genderData,
    loading: genderLoading,
    error: genderError,
  } = useQuery(GENDER_QUERY);

  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(REGISTER_MUTATION);

  useEffect(() => {
    if (registerData) {
      const authToken = registerData.createUser.token;
      setItem('authToken', authToken);
      handleChangeLoginState(true);
    }
  }, [registerData, registerLoading, registerError]);

  const onChangeText = (params: any) => {
    if (params.isVerified) {
      setEnteredPhoneNumber(`${params.dialCode} ${params.phoneNumber}`);
    }
  };

  const onRegister = (params: any) => {
    register({
      variables: {
        email: params.email,
        password: params.password,
        phone: enteredPhoneNumber,
        zipCode: params.zipCode,
        // gender: genderData.listGenders[selectedGenderIndex].id,
        username: params.username,
        dateOfBirth: selectedDateOfBirth,
      },
    });
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
        autoCapitalize="none"
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={params.secureTextEntry}
        color="#ffffff"
        borderColor="grey"
        size="lg"
      />
    );
  };

  if (genderLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          width={200}
          height={100}
          resizeMode="contain"
          source={require('./assets/logo.png')}
          alt="logo"
        />
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerLabel}>Register</Text>
      </View>

      <Stack ml={3} mr={3} mt={3} space={4}>
        <ControlledInput placeholder="Email" name="email" control={control} />
        <ControlledInput
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry={true}
        />
        <ControlledInput
          placeholder="Username"
          name="username"
          control={control}
        />

        {/* <Datepicker
          label="Date of Birth"
          onSelect={(nextDate) => setSelectedDateOfBirth(nextDate)}
          date={selectedDateOfBirth}
          accessoryRight={CalendarIcon}
          min={new Date(1920, 1, 1)}
          max={new Date()}
          dateService={formatDateService}
        /> */}

        <IntlPhoneInput onChangeText={onChangeText} defaultCountry="US" />

        <ControlledInput label="Zip Code" name="zipCode" control={control} />

        <VStack>
          <ControlledInput label="Zip Code" name="zipCode" control={control} />
          <ControlledInput label="Zip Code" name="zipCode" control={control} />
        </VStack>

        {/* <Select
          selectedIndex={selectedGenderIndex}
          onSelect={(index: any) => {
            setSelectedGenderIndex(index);
          }}
          value={genderData.listGenders[selectedGenderIndex - 1].name}
        >
          {genderData.listGenders.map((gender: Record<string, string>) => (
            <SelectItem title={gender.name} />
          ))} */}
        {/* </Select> */}
      </Stack>
      <Button onPress={handleSubmit(onRegister)}>Register</Button>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: '#092147',
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
  registerContainer: {
    marginTop: 10,
    marginLeft: 5,
  },
  registerLabel: {
    fontFamily: 'Rubik_500Medium',
    color: '#ffffff',
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 8,
  },
});
