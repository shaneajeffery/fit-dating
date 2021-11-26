import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import data, { iconColors } from '../../config/data/salon';
import { SPACING, width, height } from '../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import { CELL_HEIGHT } from '../Home';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
const AnimatableAntDesign = Animatable.createAnimatableComponent(AntDesign);

const TOP_HEIGHT_HEIGHT = height * 0.33;
const DURATION = 400;

const fadeInRight = {
  0: {
    opacity: 0,
    translateX: 10,
  },
  1: {
    opacity: 1,
    translateX: 0,
  },
};
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 10,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const ProfileDetails = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatableAntDesign
        delay={DURATION}
        animation={fadeInRight}
        name="arrowleft"
        size={28}
        style={{
          padding: 12,
          position: 'absolute',
          zIndex: 2,
        }}
        color={'#092147'}
        onPress={() => {
          // animation(0).start()
          navigation.goBack();
        }}
      />
      <SharedElement
        id={`item.${item.key}.bg`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View
          style={[
            {
              height: TOP_HEIGHT_HEIGHT + 32,
            },
          ]}
        />
      </SharedElement>
      <View style={{ height: TOP_HEIGHT_HEIGHT }}>
        <SharedElement
          id={`item.${item.key}.image`}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: 'white' }]}
        >
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </SharedElement>
        {/* <SharedElement id={`item.${item.key}.name`}>
          <Text style={styles.name}>{item.name}</Text>
        </SharedElement> */}
      </View>
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
              transform: [{ translateY: -height + TOP_HEIGHT_HEIGHT }],
            },
          ]}
        >
          <ScrollView
            style={{ flexGrow: 0, height: height - TOP_HEIGHT_HEIGHT }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: SPACING * 4,
              }}
            >
              {['isv', 'Trophy', 'edit'].map((icon, index) => {
                return (
                  <Animatable.View
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    key={icon}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: 64,
                      backgroundColor: iconColors[index],
                    }}
                  >
                    <AntDesign name={icon} size={22} color={'#fff'} />
                  </Animatable.View>
                );
              })}
            </View>
            <View style={{ margin: SPACING * 2 }}>
              {item.categories.map((subcat, index) => {
                return (
                  <Animatable.View
                    animation={fadeInBottom}
                    delay={DURATION + 400 + index * 150}
                    key={subcat.key}
                    style={{ marginBottom: SPACING }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        marginBottom: SPACING,
                      }}
                    >
                      {subcat.title}
                    </Text>
                    {subcat.subcats.map((ii, index) => {
                      return (
                        <Animatable.View
                          animation={fadeInBottom}
                          delay={DURATION + 600 + index * 150}
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginLeft: SPACING,
                          }}
                        >
                          <View
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: 4,
                              backgroundColor: 'gold',
                              marginRight: SPACING / 2,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 13,
                              margin: SPACING / 2,
                            }}
                            key={ii}
                          >
                            {ii}
                          </Text>
                        </Animatable.View>
                      );
                    })}
                  </Animatable.View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SharedElement>
    </SafeAreaView>
  );
};

ProfileDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};

const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    color: 'white',
    // position: 'absolute',
    // top: TOP_HEIGHT_HEIGHT - 64,
    // left: SPACING,
  },
  itemImage: {
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 16,
  },
});

export default ProfileDetails;
