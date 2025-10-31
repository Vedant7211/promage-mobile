import React from 'react';
import { View, Text } from 'react-native';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const OfflineBanner = () => {
  const isConnected = useNetworkStatus();

  if (isConnected) {
    return null;
  }

  return (
    <View style={{ backgroundColor: '#ff4444', padding: 10 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        You are currently offline. Some features may be unavailable.
      </Text>
    </View>
  );
};
