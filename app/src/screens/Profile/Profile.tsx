import React, { useContext } from 'react';
import { Box, Button, Text } from 'native-base';
import { removeItem } from '../../utils/async-storage';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { handleChangeLoginState } = useContext(AuthContext);

  const handleLogout = () => {
    removeItem('authToken');
    handleChangeLoginState(false);
  };

  return (
    <Box>
      <Text>Profile screen</Text>

      <Button size="giant" onPress={() => handleLogout()}>
        Logout
      </Button>
    </Box>
  );
};

export default ProfileScreen;
