import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/theme-context';
import { Avatar } from '@/components/avatar';

export default function ProfileScreen() {
  const { theme, toggleTheme, colors } = useTheme();

  const settingsOptions = [
    { id: 1, title: 'Edit Profile', icon: 'person.circle', action: () => {} },
    { id: 2, title: 'Notifications', icon: 'bell', action: () => {} },
    { id: 3, title: 'Privacy', icon: 'lock', action: () => {} },
    { id: 4, title: 'Help & Support', icon: 'questionmark.circle', action: () => {} },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* User Info Card */}
        <View className="rounded-3xl p-6 mb-4" style={{ backgroundColor: colors.card }}>
          <View className="items-center mb-4">
            <Avatar name="John Doe" size={80} colorIndex={0} />
            <Text className="text-2xl font-bold mt-4" style={{ color: colors.text }}>
              John Doe
            </Text>
            <Text className="text-base mt-1" style={{ color: colors.textSecondary }}>
              john.doe@example.com
            </Text>
          </View>

          <View className="flex-row justify-around mt-4 pt-4" style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.text }}>12</Text>
              <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>Projects</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.text }}>48</Text>
              <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>Tasks</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.text }}>8</Text>
              <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>Team</Text>
            </View>
          </View>
        </View>

        {/* Theme Toggle */}
        <View className="rounded-3xl p-6 mb-4" style={{ backgroundColor: colors.card }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                <IconSymbol name={theme === 'light' ? 'sun.max.fill' : 'moon.fill'} size={20} color={colors.primary} />
              </View>
              <View>
                <Text className="text-base font-semibold" style={{ color: colors.text }}>
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </Text>
                <Text className="text-sm" style={{ color: colors.textSecondary }}>
                  Switch theme
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleTheme}
              className="w-14 h-8 rounded-full p-1"
              style={{ 
                backgroundColor: theme === 'light' ? colors.primary : '#4A4A4A',
                justifyContent: 'center'
              }}
            >
              <View 
                className="w-6 h-6 rounded-full bg-white"
                style={{
                  transform: [{ translateX: theme === 'light' ? 24 : 0 }]
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Options */}
        <View className="rounded-3xl p-6 mb-4" style={{ backgroundColor: colors.card }}>
          <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Settings</Text>
          
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.action}
              className={`flex-row items-center justify-between py-4 ${
                index < settingsOptions.length - 1 ? 'border-b' : ''
              }`}
              style={{ borderBottomColor: colors.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                  <IconSymbol name={option.icon as any} size={20} color={colors.primary} />
                </View>
                <Text className="text-base" style={{ color: colors.text }}>{option.title}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          className="rounded-3xl p-4 items-center"
          style={{ backgroundColor: '#EF4444' }}
        >
          <Text className="text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
