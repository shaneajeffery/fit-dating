import * as React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import data from '../config/data/salon';
import { SPACING, width, height } from '../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
// import GoBack from '../components/GoBack';

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
              style={{ height: CELL_HEIGHT, marginBottom: SPACING }}
            >
              <View style={{ flex: 1, padding: SPACING }}>
                <SharedElement
                  id={`item.${item.key}.bg`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      { borderRadius: 16, backgroundColor: item.color },
                    ]}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                        borderRadius: 16,
                      }}
                    />
                  </View>
                </SharedElement>

                <SharedElement id={`item.${item.key}.name`}>
                  <Text style={styles.name}>{item.name}</Text>
                </SharedElement>
                <Text
                  style={styles.jobTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {item.jobTitle}
                </Text>
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
    fontSize: 22,
    color: '#222',
    position: 'absolute',
  },
  jobTitle: {
    fontSize: 10,
    color: '#222',
    width: width * 0.6,
    textTransform: 'uppercase',
    marginTop: 32,
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
});
