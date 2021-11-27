import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {
  Box,
  Divider,
  IconButton,
  VStack,
  Badge,
  Heading,
  ScrollView,
  HStack,
} from 'native-base';
import { height } from '../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { Feather, Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const TOP_HEIGHT_HEIGHT = height * 0.33;

const ProfileDetails = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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

        <View
          style={{
            flex: 1,
            position: 'absolute',
            marginTop: 5,
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
                }}
                _icon={{
                  size: 25,
                  color: '#092147',
                }}
                onPress={() => navigation.goBack()}
              />
            </Box>
          </VStack>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: 5,
            marginRight: 10,
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
                  size: 25,
                  color: '#092147',
                }}
              />
            </Box>
          </VStack>
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

      <ScrollView>
        <Box>
          <Heading>Activity Interests</Heading>
          <HStack
            space={{
              base: 1,
            }}
            height={35}
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

        <Box>
          <Heading>Dietary Interests</Heading>
        </Box>

        <Box>
          <Heading>About</Heading>
        </Box>

        <Box>
          <Heading>Profile Questions</Heading>
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
