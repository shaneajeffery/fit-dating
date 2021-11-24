import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Button, Text } from 'native-base';
import { removeItem } from '../../utils/async-storage';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  // const { handleChangeLoginState } = useContext(AuthContext);

  // const handleLogout = () => {
  //   removeItem('authToken');
  //   handleChangeLoginState(false);
  // };

  return (
    <Box style={styles.container}>
      <Text>Profile screen</Text>

      {/* <Button size="giant" onPress={() => handleLogout()}>
        Logout
      </Button> */}
    </Box>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
});
