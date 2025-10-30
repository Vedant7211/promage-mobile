import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import "./global.css"
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
   <View>
    <Text className="text-3xl">Modal</Text>
    <Link href="/" dismissTo>
        <Text>Go to home screen</Text>
    </Link>
   </View>
  );
}

