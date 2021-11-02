import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (itemName) => {
  const value = await AsyncStorage.getItem(itemName);
  return value ? JSON.parse(value) : null;
};

export const setItem = async (itemName, value) => {
  return AsyncStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = async (itemName) => {
  return AsyncStorage.removeItem(itemName);
};
