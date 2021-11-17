/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';

import { Text, Button, Input, Select } from 'native-base';
import { StyleSheet, View } from 'react-native';
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
        style={params.styles}
        autoCapitalize="none"
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={params.secureTextEntry}
      />
    );
  };

  if (genderLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <Text style={styles.signInLabel}>Register</Text>
      </View>

      <View style={styles.formContainer}>
        <ControlledInput label="Email" name="email" control={control} />
        <ControlledInput
          label="Password"
          name="password"
          control={control}
          secureTextEntry={true}
        />
        <ControlledInput label="Username" name="username" control={control} />

        <Text>Phone Number</Text>

        <IntlPhoneInput onChangeText={onChangeText} defaultCountry="US" />

        {/* <Datepicker
          label="Date of Birth"
          onSelect={(nextDate) => setSelectedDateOfBirth(nextDate)}
          date={selectedDateOfBirth}
          accessoryRight={CalendarIcon}
          min={new Date(1920, 1, 1)}
          max={new Date()}
          dateService={formatDateService}
        /> */}
        <ControlledInput label="Zip Code" name="zipCode" control={control} />

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
      </View>
      <Button onPress={handleSubmit(onRegister)}>Register</Button>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    // backgroundColor: '#092147',
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
