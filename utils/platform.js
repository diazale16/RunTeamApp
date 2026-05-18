import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

export const platformSpecificStyles = {
  isWeb,
  isMobile,
  hasNativeSensors: isMobile,
  hasGPS: isMobile,
  canScanQR: isMobile,
};

export default { isWeb, isMobile, platformSpecificStyles };
