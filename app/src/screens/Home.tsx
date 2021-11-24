import React from 'react';
import { Box, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <Box style={styles.container}>
      <Text>Home screen</Text>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: '#061833',
  },
});
