import { Stack } from 'expo-router';
import './global.css';
import { ThemeProvider } from '@/contexts/theme-context';
import { ProjectProvider } from '@/contexts/project-context';
import { View } from 'react-native';
import { OfflineBanner } from '@/components/ui/offline-banner';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <View style={{ flex: 1 }}>
          <OfflineBanner />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="create-project" options={{ headerShown: false }} />
            <Stack.Screen name="project-detail" options={{ headerShown: false }} />
          </Stack>
        </View>
      </ProjectProvider>
    </ThemeProvider>
  );
}
