// async-storage.js file
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async () => {
  const value = await AsyncStorage.getItem('token');
  return value ? JSON.parse(value) : null;
};

export const setItem = async (value) => {
  return AsyncStorage.setItem('token', JSON.stringify(value));
};

export const removeItem = async () => {
  return AsyncStorage.removeItem('token');
};
