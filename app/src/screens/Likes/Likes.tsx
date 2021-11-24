import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from 'native-base';

const LikesScreen = () => {
  return (
    <Box style={styles.container}>
      <Text>Likes screen</Text>
    </Box>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
});
