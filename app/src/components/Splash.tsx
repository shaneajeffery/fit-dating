import React from 'react';

import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

export const Splash = ({ onLayoutRootView }) => {
  const { width } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" />
      <View style={styles.videoContainer}>
        <Video
          source={require('../../assets/splash-logo.mp4')}
          shouldPlay
          resizeMode="cover"
          style={{ width, height: 300 }}
        />
      </View>
    </SafeAreaView>
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
