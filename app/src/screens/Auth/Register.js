import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

const RegisterScreen = () => {
  return (
    <Layout>
      <Text>Register screen</Text>
    </Layout>
  );
};

export default RegisterScreen;

// import React, { useState } from 'react';
// // import {
// //   Box,
// //   Text,
// //   Heading,
// //   VStack,
// //   FormControl,
// //   Input,
// //   Button,
// //   HStack,
// // } from 'native-base';

// import { Layout, Text, Button, Input } from '@ui-kitten/components';

// import { Link } from '@react-navigation/native';
// import { useForm, useController, Controller } from 'react-hook-form';
// import DatePicker from 'react-native-date-picker';

// const RegisterScreen = () => {
//   const { control, handleSubmit } = useForm();

//   const [showPassword, setShowPassword] = useState(false);
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());

//   console.log(selectedDateOfBirth.toDateString());

//   const onRegister = (data) => {
//     console.log(data);

//     // login({ variables: { email, password } });
//   };

//   const ControlledInput = ({ type, name, control, InputRightElement }) => {
//     const { field } = useController({
//       control,
//       defaultValue: '',
//       name,
//     });

//     return (
//       <Input
//         type={showPassword ? 'text' : type}
//         autoCapitalize="none"
//         value={field.value}
//         onChangeText={field.onChange}
//         InputRightElement={InputRightElement}
//       />
//     );
//   };

//   return (
//     <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Heading size="lg" fontWeight="600" color="coolGray.800">
//         Register
//       </Heading>

//       <VStack space={3} mt="5">
//         <ControlledInput
//           label="Email"
//           type="text"
//           name="email"
//           control={control}
//         />

//         <ControlledInput
//           type="password"
//           name="password"
//           control={control}
//           InputRightElement={
//             <Button
//               size="xs"
//               m="1"
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </Button>
//           }
//         />

//         <FormControl>
//           <FormControl.Label
//             _text={{
//               color: 'coolGray.800',
//               fontSize: 'xs',
//               fontWeight: 500,
//             }}
//           >
//             Username
//           </FormControl.Label>
//           <ControlledInput type="text" name="username" control={control} />
//         </FormControl>

//         <FormControl>
//           <FormControl.Label
//             _text={{
//               color: 'coolGray.800',
//               fontSize: 'xs',
//               fontWeight: 500,
//             }}
//           >
//             Phone
//           </FormControl.Label>
//           <ControlledInput type="text" name="phone" control={control} />
//         </FormControl>

//         <FormControl>
//           <FormControl.Label
//             _text={{
//               color: 'coolGray.800',
//               fontSize: 'xs',
//               fontWeight: 500,
//             }}
//           >
//             Date Of Birth
//           </FormControl.Label>
//           <DatePicker
//             display="modal"
//             open={datePickerOpen}
//             date={selectedDateOfBirth}
//             onConfirm={(date) => {
//               setDatePickerOpen(false);
//               setSelectedDateOfBirth(date);
//             }}
//             onCancel={() => {
//               setDatePickerOpen(false);
//             }}
//           />

//           <Input
//             type="text"
//             name="dateOfBirth"
//             value={selectedDateOfBirth.toDateString()}
//             onFocus={() => setDatePickerOpen(true)}
//           />
//         </FormControl>

//         <FormControl>
//           <FormControl.Label
//             _text={{
//               color: 'coolGray.800',
//               fontSize: 'xs',
//               fontWeight: 500,
//             }}
//           >
//             Zip Code
//           </FormControl.Label>
//           <ControlledInput type="text" name="zipCode" control={control} />
//         </FormControl>

//         <FormControl>
//           <FormControl.Label
//             _text={{
//               color: 'coolGray.800',
//               fontSize: 'xs',
//               fontWeight: 500,
//             }}
//           >
//             Gender
//           </FormControl.Label>
//           <ControlledInput type="text" name="gender" control={control} />
//         </FormControl>

//         <Button
//           mt="2"
//           colorScheme="indigo"
//           _text={{ color: 'white' }}
//           onPress={handleSubmit(onRegister)}
//         >
//           Register
//         </Button>
//         <HStack mt="6" justifyContent="center">
//           <Text fontSize="sm" color="muted.700" fontWeight={400}>
//             Already Have An Account?
//           </Text>
//           <Link to={{ screen: 'Login' }}>Sign In</Link>
//         </HStack>
//       </VStack>
//     </Layout>
//   );
// };

// export default RegisterScreen;
