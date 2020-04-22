import * as Permissions from 'expo-permissions';

export const SetPermissions = async (...args) => {
    const { status } = await Permissions.askAsync(...args);
    if (status !== 'granted') {
      return false;
    }
    return true;
} 