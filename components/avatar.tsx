import { View, Text } from 'react-native';

interface AvatarProps {
  name: string;
  size?: number;
  colorIndex?: number;
}

const avatarColors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Light Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
];

export function Avatar({ name, size = 40, colorIndex = 0 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const backgroundColor = avatarColors[colorIndex % avatarColors.length];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: size * 0.4,
          fontWeight: '600',
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
