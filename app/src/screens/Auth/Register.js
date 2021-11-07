import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from './extra/keyboard-avoiding-view';
import { ImageOverlay } from './extra/image-overlay';
import {
  Text,
  Button,
  Input,
  IndexPath,
  Datepicker,
  Select,
  SelectItem,
  NativeDateService,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { setItem } from '../../utils/async-storage';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm, useController } from 'react-hook-form';
import { CalendarIcon } from './extra/icons';
import IntlPhoneInput from 'react-native-intl-phone-input';

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
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(
    new IndexPath(0)
  );

  const formatDateService = new NativeDateService('en', {
    format: 'MM/DD/YYYY',
  });

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

  const onChangeText = ({ dialCode, phoneNumber, isVerified }) => {
    if (isVerified) {
      setEnteredPhoneNumber(`${dialCode} ${phoneNumber}`);
    }
  };

  const onRegister = ({ email, password, zipCode, username }) => {
    register({
      variables: {
        email,
        password,
        phone: enteredPhoneNumber,
        zipCode,
        gender: genderData.listGenders[selectedGenderIndex].id,
        username,
        dateOfBirth: selectedDateOfBirth,
      },
    });
  };

  const ControlledInput = ({
    label,
    styles,
    type,
    name,
    control,
    secureTextEntry,
  }) => {
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
        secureTextEntry={secureTextEntry}
      />
    );
  };

  if (genderLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            Register
          </Text>
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

          <Text
            style={{
              color: '#8F9BB3',
              fontSize: '12px',
              fontWeight: '800',
              marginBottom: 4,
            }}
          >
            Phone Number
          </Text>

          <IntlPhoneInput onChangeText={onChangeText} defaultCountry="US" />

          <Datepicker
            label="Date of Birth"
            onSelect={(nextDate) => setSelectedDateOfBirth(nextDate)}
            date={selectedDateOfBirth}
            accessoryRight={CalendarIcon}
            min={new Date(1920, 1, 1)}
            max={new Date()}
            dateService={formatDateService}
          />
          <ControlledInput label="Zip Code" name="zipCode" control={control} />

          <Select
            selectedIndex={selectedGenderIndex}
            onSelect={(index) => {
              setSelectedGenderIndex(index);
            }}
            value={genderData.listGenders[selectedGenderIndex - 1].name}
          >
            {genderData.listGenders.map((gender) => (
              <SelectItem title={gender.name} />
            ))}
          </Select>
        </View>
        <Button
          mt="2"
          colorScheme="indigo"
          _text={{ color: 'white' }}
          onPress={handleSubmit(onRegister)}
        >
          Register
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
