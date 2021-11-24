import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from 'native-base';

const MessagesScreen = () => {
  return (
    <Box style={styles.container}>
      <Text>Messages screen</Text>
    </Box>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
});
