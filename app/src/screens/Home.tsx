import * as React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import data from '../config/data/salon';
import { SPACING, width, height } from '../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';

import LinearGradient from 'react-native-linear-gradient';

export const CELL_HEIGHT = height * 0.5;

export default function SalonList({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          width={undefined}
          height={undefined}
          resizeMode="contain"
          aspectRatio={1.8}
          source={require('./Auth/assets/logo.png')}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ margin: SPACING }}
        style={{ marginTop: -10 }}
        renderItem={({ item }) => {
          return (
            <TouchableScale
              activeScale={0.9}
              tension={20}
              friction={7}
              useNativeDriver
              onPress={() => navigation.push('SalonListDetails', { item })}
              style={{
                height: CELL_HEIGHT,
                marginBottom: SPACING,
              }}
            >
              <View style={{ flex: 1, padding: SPACING }}>
                <SharedElement
                  id={`item.${item.key}.bg`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View style={[StyleSheet.absoluteFillObject]}>
                    <ImageBackground
                      source={{ uri: item.image }}
                      style={{
                        flex: 1,
                      }}
                      imageStyle={{ borderRadius: 16 }}
                    >
                      <LinearGradient
                        colors={['#ffffff00', '#00000090']}
                        style={{
                          backgroundColor: 'transparent',
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          borderRadius: 16,
                        }}
                      />
                    </ImageBackground>
                  </View>
                </SharedElement>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  <SharedElement id={`item.${item.key}.name`}>
                    <Text style={styles.name}>{item.name}</Text>
                  </SharedElement>
                  <Text
                    style={styles.location}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {item.age} &#183; {item.location}
                  </Text>
                </View>
              </View>
            </TouchableScale>
          );
        }}
      />
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: height }] },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'white',
              transform: [{ translateY: 0 }],
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
            },
          ]}
        />
      </SharedElement>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 32,
    color: 'white',
    position: 'absolute',
  },
  location: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 16,
    color: 'white',
    width: width * 0.6,

    marginTop: 40,
  },
  itemImage: {
    width: CELL_HEIGHT * 0.75,
    height: CELL_HEIGHT * 0.75,
    position: 'absolute',
    bottom: 0,
    right: SPACING / 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  linearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
