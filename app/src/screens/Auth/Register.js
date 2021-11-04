import React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
} from 'native-base';
import { useForm, useController } from 'react-hook-form';

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm();

  const onRegister = ({ email, password }) => {
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
        Register
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
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Username
          </FormControl.Label>
          <ControlledInput type="text" name="username" control={control} />
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Phone
          </FormControl.Label>
          <ControlledInput type="text" name="phone" control={control} />
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Date Of Birth
          </FormControl.Label>
          <ControlledInput type="text" name="dateOfBirth" control={control} />
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Zip Code
          </FormControl.Label>
          <ControlledInput type="text" name="zipCode" control={control} />
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}
          >
            Gender
          </FormControl.Label>
          <ControlledInput type="text" name="gender" control={control} />
        </FormControl>

        <Button
          mt="2"
          colorScheme="indigo"
          _text={{ color: 'white' }}
          onPress={handleSubmit(onRegister)}
        >
          Register
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            Already Have An Account?
          </Text>
          <Link to={{ screen: 'Register' }}>Sign In</Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RegisterScreen;
