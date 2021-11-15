import React, { useContext } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { removeItem } from '../../utils/async-storage';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { handleChangeLoginState } = useContext(AuthContext);

  const handleLogout = () => {
    removeItem('authToken');
    handleChangeLoginState(false);
  };

  return (
    <Layout>
      <Text>Profile screen</Text>

      <Button status="control" size="giant" onPress={() => handleLogout()}>
        Logout
      </Button>
    </Layout>
  );
};

export default ProfileScreen;
