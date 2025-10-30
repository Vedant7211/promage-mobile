import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface ProjectIconProps {
  type: 'fintech' | 'website' | 'mobile' | 'design';
  size?: number;
}

const projectIcons = {
  fintech: {
    icon: 'chart.bar.fill',
    colors: ['#FF6B6B', '#FFA07A', '#FFD93D'],
  },
  website: {
    icon: 'globe',
    colors: ['#6BCF7F', '#4ECDC4', '#45B7D1'],
  },
  mobile: {
    icon: 'iphone',
    colors: ['#BB8FCE', '#A569BD', '#8E44AD'],
  },
  design: {
    icon: 'paintbrush.fill',
    colors: ['#F7DC6F', '#F8C471', '#E59866'],
  },
};

export function ProjectIcon({ type, size = 96 }: ProjectIconProps) {
  const config = projectIcons[type];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <View
        style={{
          position: 'absolute',
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.2,
          backgroundColor: config.colors[0],
          opacity: 0.6,
          top: size * 0.15,
          left: size * 0.15,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: size * 0.175,
          backgroundColor: config.colors[1],
          opacity: 0.5,
          bottom: size * 0.2,
          right: size * 0.15,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.25,
          height: size * 0.25,
          borderRadius: size * 0.125,
          backgroundColor: config.colors[2],
          opacity: 0.4,
          top: size * 0.5,
          left: size * 0.5,
        }}
      />

      {/* Main icon */}
      <View
        style={{
          zIndex: 10,
        }}
      >
        <IconSymbol name={config.icon as any} size={size * 0.4} color="#333" />
      </View>
    </View>
  );
}
