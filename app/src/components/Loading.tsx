import React from 'react';

import { HStack, Heading, Spinner } from 'native-base';
import { StyleSheet, View } from 'react-native';

export const Loading = () => {
  return (
    <View style={[styles.loadingContainer]}>
      <HStack space={2} alignItems="center">
        <Spinner />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 145,
    backgroundColor: '#092147',
  },
});
