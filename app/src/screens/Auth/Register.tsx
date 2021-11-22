/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';

import {
  Text,
  Button,
  Input,
  Select,
  Image,
  Stack,
  HStack,
  Icon,
  Checkbox,
} from 'native-base';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { setItem } from '../../utils/async-storage';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm, useController } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import MaskInput from 'react-native-mask-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Loading } from '../../components/Loading';

import { AuthContext } from '../../context/AuthContext';

import PHONE_NUMBER_MASKS from '../../utils/phone-number-masks';

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

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState<
    Date | undefined
  >();
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('united_states');
  const [selectedGender, setSelectedGender] = useState('');
  const { handleChangeLoginState } = useContext(AuthContext);

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

  const onRegister = (params: any) => {
    register({
      variables: {
        email: params.email,
        password: params.password,
        phone: enteredPhoneNumber,
        zipCode: params.zipCode,
        gender: selectedGender,
        username: params.username,
        dateOfBirth: selectedDateOfBirth,
      },
    });
  };

  const formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
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
        selectionColor="white"
        autoCorrect={false}
        onFocus={params.onFocus}
        style={params.style}
        InputRightElement={params.InputRightElement}
      />
    );
  };

  if (genderLoading) {
    return <Loading />;
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
          placeholder="Username"
          name="username"
          control={control}
        />
        <ControlledInput
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry={true}
        />

        <Input
          placeholder="Date of Birth"
          onPressIn={() => setCalendarOpen(true)}
          value={selectedDateOfBirth ? formatDate(selectedDateOfBirth) : ''}
          color="#ffffff"
          borderColor="grey"
          size="lg"
          selectionColor="white"
          InputRightElement={
            <Icon
              as={<MaterialIcons name="calendar-today" />}
              onPress={() => setCalendarOpen(true)}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
        />

        <Select
          selectedValue={selectedGender}
          placeholder="Select Gender"
          color="white"
          onValueChange={(itemValue) => setSelectedGender(itemValue)}
          borderColor="grey"
          // @ts-ignore
          style={{ height: 37, width: 10, fontSize: 16, padding: 0 }}
        >
          {genderData.listGenders.map(
            (gender: Record<string, string>, index: number) => (
              <Select.Item key={index} label={gender.name} value={gender.id} />
            )
          )}
        </Select>

        {/* <Select
          selectedValue={selectedCountry}
          accessibilityLabel="Select Country"
          placeholder="Select Country"
          color="white"
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          borderColor="grey"
          // @ts-ignore
          style={{ height: 37, width: '100%', fontSize: 16 }}
        >
          <Select.Item label="Australia" value="australia" />
          <Select.Item label="New Zealand" value="new_zealand" />
          <Select.Item label="United States" value="united_states" />
          <Select.Item label="United Kingdom" value="united_kingdom" />
        </Select> */}

        {selectedCountry ? (
          <HStack space={3} alignItems="center">
            <View style={{ width: '48.3%' }}>
              <MaskInput
                value={enteredPhoneNumber}
                onChangeText={(masked, unmasked) => {
                  setEnteredPhoneNumber(unmasked); // you can use the unmasked value as well
                }}
                mask={PHONE_NUMBER_MASKS[selectedCountry]}
                style={styles.phoneInput}
                placeholder="Phone Number"
                selectionColor="white"
                placeholderTextColor="#FFFFFF96"
              />
            </View>
            <View style={{ width: '48.3%' }}>
              <ControlledInput
                placeholder="Zip Code"
                name="zipCode"
                control={control}
              />
            </View>
          </HStack>
        ) : (
          <View />
        )}

        <Checkbox value="test">
          <View style={{ marginLeft: 15, width: 325 }}>
            <Text color="white">
              By creating an account, you agree to our Terms and Conditions and
              Privacy Policy.
            </Text>
          </View>
        </Checkbox>
      </Stack>

      <Stack ml={3} mr={3} mt={5} space={0}>
        <Button
          size="lg"
          onPress={handleSubmit(onRegister)}
          style={styles.registerButton}
        >
          REGISTER
        </Button>
        <Button
          size="lg"
          onPress={() => navigation.push('Login')}
          style={styles.backButton}
        >
          BACK TO LOGIN
        </Button>
      </Stack>

      <DatePicker
        mode="date"
        modal
        open={calendarOpen}
        date={selectedDateOfBirth ? selectedDateOfBirth : new Date()}
        onConfirm={(date) => {
          setCalendarOpen(false);
          setSelectedDateOfBirth(date);
        }}
        onCancel={() => {
          setCalendarOpen(false);
        }}
        style={{ height: 0 }}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  phoneInput: {
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    height: 37,
    borderRadius: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  registerButton: {
    marginBottom: 10,
    backgroundColor: '#00ABE7',
    borderColor: '#00ABE7',
    color: '#FFFFFF',
  },
  backButton: {
    marginBottom: 10,
    backgroundColor: '#81C14B',
    borderColor: '#81C14B',
    color: '#FFFFFF',
  },
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
