import React, { useContext } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { removeItem } from '../../utils/async-storage';
import { AppContext } from '../../../App';

const ProfileScreen = () => {
  const { handleChangeLoginState } = useContext(AppContext);

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
