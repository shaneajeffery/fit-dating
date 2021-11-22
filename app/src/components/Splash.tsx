import React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';

export const Splash = () => {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.videoContainer}>
      <Video
        source={require('../../assets/splash-logo.mp4')}
        shouldPlay
        resizeMode="cover"
        style={{ width, height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092147',
  },

  videoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
