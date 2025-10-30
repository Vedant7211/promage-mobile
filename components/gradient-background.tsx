import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#548AD8" stopOpacity="1" />
            <Stop offset="100%" stopColor="#8A4BD3" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
        
        {/* Decorative background pattern */}
        <Path
          d="M0 80 Q 50 60, 100 80 T 200 80 T 300 80 T 400 80"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M0 120 Q 60 100, 120 120 T 240 120 T 360 120"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Circular decorative elements */}
        <Path
          d="M 250 20 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"
          fill="rgba(255,255,255,0.05)"
        />
        <Path
          d="M 320 100 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0"
          fill="rgba(255,255,255,0.08)"
        />
        <Path
          d="M 50 50 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0"
          fill="rgba(255,255,255,0.06)"
        />
      </Svg>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  content: {
    padding: 24,
  },
});
