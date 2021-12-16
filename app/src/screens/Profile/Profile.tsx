/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import {
  Box,
  Divider,
  IconButton,
  VStack,
  Badge,
  Heading,
  ScrollView,
  HStack,
  Icon,
  Button,
} from 'native-base';
import { height } from '../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from 'react-native-image-slider-box';

const TOP_HEIGHT_HEIGHT = height * 0.4;

const ProfileDetails = ({ navigation, route }) => {
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);

  const { item } = route.params;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['top', 'left', 'right']}
    >
      <View style={{ height: TOP_HEIGHT_HEIGHT }}>
        <View
          style={[StyleSheet.absoluteFillObject, { backgroundColor: 'white' }]}
        >
          <SliderBox
            images={images}
            sliderBoxHeight={TOP_HEIGHT_HEIGHT}
            dotColor="#00ABE7"
            paginationBoxVerticalPadding={40}
            imageLoadingColor="#092147"
          />
        </View>

        <View
          style={{
            position: 'absolute',
            marginTop: 20,
            marginLeft: 10,
            zIndex: 2,
          }}
        >
          <VStack space={1} alignItems="center">
            <Box>
              <IconButton
                size="sm"
                variant="unstyled"
                icon={<Ionicons name="arrow-back-outline" />}
                padding={2}
                style={{
                  borderColor: 'transparent',
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
                  color: 'white',
                }}
                onPress={() => navigation.goBack()}
              />
            </Box>
          </VStack>
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: 20,
            marginRight: 10,
            zIndex: 0,
          }}
        >
          <HStack space={1} alignItems="center">
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
                  size: 20,
                  color: '#092147',
                }}
                onPress={() => navigation.goBack()}
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
                  size: 20,
                  color: '#092147',
                }}
              />
            </Box>
          </HStack>
        </View>
      </View>

      <Box style={styles.generalInfoBox}>
        <Text>Sophia</Text>
        <Divider orientation="vertical" />
        <Badge
          style={{
            borderRadius: 15,
            borderColor: '#58B29A',
            backgroundColor: 'transparent',
            borderWidth: 1,
          }}
        >
          <Text style={{ color: '#58B29A' }}>25</Text>
        </Badge>
        <Divider orientation="vertical" />
        <Text>Miami, FL</Text>
        <Divider orientation="vertical" />
        <Text>Single</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={{ marginTop: 25, marginHorizontal: 15 }}>
          <Heading size="sm" style={{ marginBottom: 15 }}>
            About
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <HStack
            space={{
              base: 1,
            }}
            flexWrap="wrap"
            style={{ marginTop: 10 }}
          >
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  // @ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Badge
                style={[
                  styles.activityBadge,
                  {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                  },
                ]}
              >
                <Icon
                  as={Ionicons}
                  name="school-outline"
                  size="xs"
                  //@ts-ignore
                  style={{ marginRight: 5, color: 'grey' }}
                />
                <Text style={{ color: '#092147' }}>University</Text>
              </Badge>
            </Box>
          </HStack>
        </Box>

        <Box style={{ marginTop: 25, marginHorizontal: 15 }}>
          <Heading size="sm" style={{ marginBottom: 15 }}>
            Activity Interests
          </Heading>
          <HStack
            space={{
              base: 1,
            }}
            flexWrap="wrap"
          >
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
          </HStack>
        </Box>

        <Box style={{ marginTop: 25, marginHorizontal: 15 }}>
          <Heading size="sm" style={{ marginBottom: 15 }}>
            Dietary Interests
          </Heading>
          <HStack
            space={{
              base: 1,
            }}
            flexWrap="wrap"
          >
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
            <Box style={{ marginTop: 5 }}>
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
            </Box>
          </HStack>
        </Box>

        <Box style={{ marginTop: 25, marginHorizontal: 15 }}>
          <Heading size="sm" style={{ marginBottom: 15 }}>
            Profile Questions
          </Heading>
        </Box>
      </ScrollView>
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
    // borderRadius: 32,
  },
  generalInfoBox: {
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: -20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 32,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  linearGradient: {
    borderRadius: 5,
  },
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
});

export default ProfileDetails;
