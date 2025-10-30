import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { Avatar } from '@/components/avatar';
import { useTheme } from '@/contexts/theme-context';

export default function ProjectDetailScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();

  const projectData = {
    title: 'Green sky Website Dev',
    description: 'GreenSky DG focuses on evaluating and developing solar opportunities for landholders',
    dueDate: 'Thursday, 20 July 2023',
    assignedMembers: [
      { name: 'John Doe', colorIndex: 0 },
      { name: 'Sarah Smith', colorIndex: 1 },
      { name: 'Mike Johnson', colorIndex: 2 },
      { name: 'Emily Davis', colorIndex: 3 },
      { name: 'Alex Brown', colorIndex: 4 },
    ],
    tasks: [
      {
        id: 1,
        title: 'Create Design System',
        hours: '25 hr',
        completed: true,
        assignedMembers: [
          { name: 'John Doe', colorIndex: 0 },
          { name: 'Sarah Smith', colorIndex: 1 },
        ],
      },
      {
        id: 2,
        title: 'Create Wireframe',
        hours: '18 hr',
        completed: true,
        assignedMembers: [
          { name: 'Mike Johnson', colorIndex: 2 },
          { name: 'Emily Davis', colorIndex: 3 },
        ],
      },
      {
        id: 3,
        title: 'Landing Page Design',
        hours: '8 hr',
        completed: false,
        assignedMembers: [
          { name: 'Alex Brown', colorIndex: 4 },
        ],
      },
      {
        id: 4,
        title: 'Mobile Screen Design',
        hours: '40 hr',
        completed: false,
        assignedMembers: [
          { name: 'Lisa Wilson', colorIndex: 5 },
          { name: 'Tom Anderson', colorIndex: 6 },
          { name: 'Kate Miller', colorIndex: 7 },
        ],
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme === 'light' ? colors.primary : colors.background }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.3)' : '#fff' }}
        >
          <IconSymbol name="arrow.left" size={24} color={theme === 'light' ? '#fff' : '#000'} />
        </TouchableOpacity>
        
        <Text className="text-2xl font-semibold" style={{ color: colors.headerText }}>Project Detail</Text>
        
        <TouchableOpacity className="w-12 h-12 bg-transparent items-center justify-center">
          <IconSymbol name="pencil" size={24} color={colors.headerText} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Project Info Card */}
        <View className="rounded-3xl p-6 mb-4" style={{ backgroundColor: colors.card, borderWidth: theme === 'light' ? 0 : 4, borderColor: AppColors.primary }}>
          <Text className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
            {projectData.title}
          </Text>
          
          <Text className="text-base mb-4 leading-6" style={{ color: colors.textSecondary }}>
            {projectData.description}
          </Text>
          
          <View className="flex-row items-center">
            <Text className="text-sm font-semibold" style={{ color: colors.textSecondary }}>Due date: </Text>
            <Text className="text-sm" style={{ color: colors.text }}>{projectData.dueDate}</Text>
          </View>
        </View>

        {/* Assigned To Section */}
        <View className="rounded-3xl p-6 mb-4" style={{ backgroundColor: colors.card }}>
          <Text className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Assigned to</Text>
          
          <View className="flex-row items-center">
            {projectData.assignedMembers.map((member, index) => (
              <View
                key={index}
                className="border-2 border-white"
                style={{ marginLeft: index > 0 ? -12 : 0, borderRadius: 28 }}
              >
                <Avatar name={member.name} size={56} colorIndex={member.colorIndex} />
              </View>
            ))}
            
            {/* Add Member Button */}
            <TouchableOpacity
              className="w-14 h-14 rounded-full border-2 border-dashed border-gray-400 items-center justify-center ml-2"
            >
              <IconSymbol name="plus" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Section */}
        <View className="rounded-3xl p-6 mb-6" style={{ backgroundColor: colors.card }}>
          <Text className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Task</Text>
          
          {projectData.tasks.map((task, index) => (
            <View
              key={task.id}
              className={`flex-row items-center justify-between ${
                index < projectData.tasks.length - 1 ? 'mb-5' : ''
              }`}
            >
              {/* Checkbox and Task Info */}
              <View className="flex-row items-center flex-1">
                {/* Checkbox */}
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-4"
                  style={{
                    backgroundColor: task.completed ? AppColors.primary : 'transparent',
                    borderWidth: task.completed ? 0 : 2,
                    borderColor: task.completed ? 'transparent' : AppColors.gray[300],
                  }}
                >
                  {task.completed && (
                    <IconSymbol name="checkmark" size={20} color="#fff" />
                  )}
                </View>
                
                {/* Task Details */}
                <View className="flex-1">
                  <Text className="text-lg font-medium mb-1" style={{ color: colors.text }}>
                    {task.title}
                  </Text>
                  <View className="flex-row items-center">
                    <IconSymbol name="flag" size={14} color={colors.textSecondary} />
                    <Text className="text-sm ml-1" style={{ color: colors.textSecondary }}>{task.hours}</Text>
                  </View>
                </View>
              </View>
              
              {/* Assigned Members */}
              <View className="flex-row">
                {task.assignedMembers.map((member, idx) => (
                  <View
                    key={idx}
                    className="border-2 border-white"
                    style={{ marginLeft: idx > 0 ? -8 : 0, borderRadius: 20 }}
                  >
                    <Avatar name={member.name} size={40} colorIndex={member.colorIndex} />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
