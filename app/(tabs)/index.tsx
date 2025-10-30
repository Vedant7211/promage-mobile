import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/theme-context';
import { Avatar } from '@/components/avatar';
import { AppColors } from '@/constants/colors';
import { GradientBackground } from '@/components/gradient-background';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const pendingTasks = [
    {
      id: 1,
      title: 'Create Design System',
      project: 'Fintech App',
      projectColor: AppColors.beige,
      timeLeft: '2h 30m',
    },
    {
      id: 2,
      title: 'Landing Page Design',
      project: 'Green Sky',
      projectColor: AppColors.lightBlue,
      timeLeft: '5h 15m',
    },
    {
      id: 3,
      title: 'Mobile Screen Design',
      project: 'Fintech App',
      projectColor: AppColors.beige,
      timeLeft: '1d 4h',
    },
    {
      id: 4,
      title: 'Create Wireframe',
      project: 'Portfolio',
      projectColor: AppColors.lightGreen,
      timeLeft: '3h 20m',
    },
  ];

  const projectCategories = [
    { id: 1, name: 'Active Projects', count: 8, color: '#4ECDC4', icon: 'folder.fill' },
    { id: 2, name: 'Completed', count: 12, color: '#95E1D3', icon: 'checkmark.circle.fill' },
    { id: 3, name: 'On Hold', count: 3, color: '#F38181', icon: 'pause.circle.fill' },
    { id: 4, name: 'Team Projects', count: 5, color: '#AA96DA', icon: 'person.3.fill' },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity>
            <IconSymbol name="line.3.horizontal" size={28} color={colors.text} />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-4">
              <IconSymbol name="bell" size={24} color={colors.text} />
            </TouchableOpacity>
            <Avatar name="John Doe" size={40} colorIndex={0} />
          </View>
        </View>

        <Text className="text-4xl font-bold" style={{ color: colors.text }}>
          Hi John,
        </Text>
        <Text className="text-base mt-2" style={{ color: colors.textSecondary }}>
          You have <Text style={{ color: AppColors.red, fontWeight: '600' }}>4 pending tasks</Text> this week
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Stats Card */}
        <View className="mx-6 mb-6">
          <GradientBackground>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-5xl font-bold text-white mb-2">24</Text>
                <Text className="text-base text-white opacity-90">
                  Complete 30 tasks to unlock{'\n'}Premium features
                </Text>
              </View>
              <TouchableOpacity 
                className="px-6 py-3 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                <Text className="text-white font-semibold">View Tasks</Text>
              </TouchableOpacity>
            </View>
          </GradientBackground>
        </View>

        {/* Pending Tasks */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold mr-2" style={{ color: colors.text }}>
                {pendingTasks.length} Pending tasks
              </Text>
              <TouchableOpacity>
                <IconSymbol name="info.circle" size={20} color={AppColors.red} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {pendingTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                className="rounded-2xl p-4 mb-4"
                style={{ 
                  backgroundColor: colors.card,
                  width: '48%',
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={() => router.push('/project-detail')}
              >
                <Text className="text-base font-semibold mb-2" style={{ color: colors.text }}>
                  {task.title}
                </Text>
                <Text className="text-sm mb-3" style={{ color: task.projectColor }}>
                  {task.project}
                </Text>
                <View className="flex-row items-center">
                  <IconSymbol name="clock" size={14} color={AppColors.red} />
                  <Text className="text-sm ml-1" style={{ color: AppColors.red }}>
                    {task.timeLeft}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Project Categories */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            Categories
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
            {projectCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="rounded-3xl p-6 mb-4"
                style={{ 
                  backgroundColor: category.color,
                  width: '48%',
                }}
              >
                <IconSymbol name={category.icon as any} size={32} color="#fff" />
                <Text className="text-2xl font-bold text-white mt-4 mb-1">
                  {category.count}
                </Text>
                <Text className="text-base text-white opacity-90">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
