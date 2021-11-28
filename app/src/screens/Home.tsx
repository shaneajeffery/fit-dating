/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import data from '../config/data/salon';
import { SPACING, width, height } from '../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

import {
  Badge,
  HStack,
  ScrollView,
  VStack,
  Box,
  IconButton,
  StatusBar,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const CELL_HEIGHT = height * 0.4;

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 0.9 }}>
          <Image
            width={undefined}
            height={undefined}
            resizeMode="contain"
            // @ts-ignore
            aspectRatio={1.8}
            source={require('./Auth/assets/logo.png')}
          />
        </View>

        <View>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<Feather name="filter" />}
            padding={2}
            style={{
              backgroundColor: 'white',
            }}
            _icon={{
              size: 25,
              color: '#092147',
            }}
            onPress={() => navigation.navigate('ProfileFiltersModal')}
          />
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ margin: SPACING }}
        style={{ marginTop: -10 }}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.push('ProfileDetails', { item })}
            >
              <View
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
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}
                  >
                    <VStack space={1} alignItems="center">
                      <Box>
                        <IconButton
                          size="sm"
                          variant="outline"
                          icon={<Feather name="heart" />}
                          borderRadius="full"
                          padding={2}
                          style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            shadowRadius: 2,
                            shadowColor: '#000000',
                            shadowOpacity: 0.2,
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                          }}
                          _icon={{
                            size: 25,
                            color: '#092147',
                          }}
                        />
                      </Box>
                      <Box>
                        <IconButton
                          size="sm"
                          variant="outline"
                          icon={<Feather name="send" />}
                          borderRadius="full"
                          padding={2}
                          style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            shadowRadius: 2,
                            shadowColor: '#000000',
                            shadowOpacity: 0.2,
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                          }}
                          _icon={{
                            size: 25,
                            color: '#092147',
                          }}
                        />
                      </Box>
                    </VStack>
                  </View>

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
                    <ScrollView
                      horizontal={true}
                      maxHeight={25}
                      marginTop={2}
                      marginBottom={2}
                      showsHorizontalScrollIndicator={false}
                    >
                      <HStack
                        space={{
                          base: 1,
                        }}
                        height={25}
                      >
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>
                              Crossfit
                            </Text>
                          </Badge>
                        </LinearGradient>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>F45</Text>
                          </Badge>
                        </LinearGradient>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>
                              Running
                            </Text>
                          </Badge>
                        </LinearGradient>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>
                              Peleton
                            </Text>
                          </Badge>
                        </LinearGradient>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>
                              Gluten Free
                            </Text>
                          </Badge>
                        </LinearGradient>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#58B29A', '#8AC33D']}
                          style={styles.linearGradient}
                        >
                          <Badge variant="outline" style={styles.activityBadge}>
                            <Text style={styles.activityBadgeText}>Paleo</Text>
                          </Badge>
                        </LinearGradient>
                      </HStack>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
  activityBadge: {
    borderRadius: 15,
    borderColor: 'transparent',
  },
  activityBadgeText: {
    color: 'white',
    // fontFamily: 'Rubik_400Regular',
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 5,
  },
  name: {
    // fontFamily: 'Rubik_500Medium',
    fontSize: 32,
    color: 'white',
    position: 'absolute',
  },
  location: {
    // fontFamily: 'Rubik_400Regular',
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
    borderRadius: 5,
  },
});
