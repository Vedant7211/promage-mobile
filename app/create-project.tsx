import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { Avatar } from '@/components/avatar';
import { useState } from 'react';
import { useProjects } from '@/contexts/project-context';
import { useTheme } from '@/contexts/theme-context';

interface TeamMember {
  name: string;
  colorIndex: number;
}

interface Task {
  id: string;
  title: string;
  hours: string;
  assignedMembers: TeamMember[];
}

const availableMembers: TeamMember[] = [
  { name: 'John Doe', colorIndex: 0 },
  { name: 'Sarah Smith', colorIndex: 1 },
  { name: 'Mike Johnson', colorIndex: 2 },
  { name: 'Emily Davis', colorIndex: 3 },
  { name: 'Alex Brown', colorIndex: 4 },
  { name: 'Lisa Wilson', colorIndex: 5 },
  { name: 'Tom Anderson', colorIndex: 6 },
  { name: 'Kate Miller', colorIndex: 7 },
];

const colorThemes = [
  { name: 'Beige', color: AppColors.beige },
  { name: 'Light Blue', color: AppColors.lightBlue },
  { name: 'Light Green', color: AppColors.lightGreen },
  { name: 'Light Purple', color: AppColors.lightPurple },
];

const projectTypes = [
  { name: 'Fintech', value: 'fintech' as const },
  { name: 'Website', value: 'website' as const },
  { name: 'Mobile', value: 'mobile' as const },
  { name: 'Design', value: 'design' as const },
];

export default function CreateProjectScreen() {
  const router = useRouter();
  const { addProject } = useProjects();
  const { colors } = useTheme();
  
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorThemes[0].color);
  const [selectedProjectType, setSelectedProjectType] = useState<'fintech' | 'website' | 'mobile' | 'design'>('fintech');
  const [assignedMembers, setAssignedMembers] = useState<TeamMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskHours, setNewTaskHours] = useState('');
  const [taskAssignedMembers, setTaskAssignedMembers] = useState<TeamMember[]>([]);

  const toggleMember = (member: TeamMember) => {
    const exists = assignedMembers.find(m => m.name === member.name);
    if (exists) {
      setAssignedMembers(assignedMembers.filter(m => m.name !== member.name));
    } else {
      setAssignedMembers([...assignedMembers, member]);
    }
  };

  const toggleTaskMember = (member: TeamMember) => {
    const exists = taskAssignedMembers.find(m => m.name === member.name);
    if (exists) {
      setTaskAssignedMembers(taskAssignedMembers.filter(m => m.name !== member.name));
    } else {
      setTaskAssignedMembers([...taskAssignedMembers, member]);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() && newTaskHours.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        hours: newTaskHours + ' hr',
        assignedMembers: [...taskAssignedMembers],
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskHours('');
      setTaskAssignedMembers([]);
      setShowTaskModal(false);
    }
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleCreateProject = () => {
    // Validate required fields
    if (!projectTitle.trim()) {
      Alert.alert('Error', 'Please enter a project title');
      return;
    }
    if (!projectDescription.trim()) {
      Alert.alert('Error', 'Please enter a project description');
      return;
    }
    if (!dueDate.trim()) {
      Alert.alert('Error', 'Please enter a due date');
      return;
    }
    if (assignedMembers.length === 0) {
      Alert.alert('Error', 'Please assign at least one team member');
      return;
    }

    // Calculate total hours from tasks
    const totalHours = tasks.reduce((sum, task) => {
      const hours = parseInt(task.hours.replace(' hr', ''));
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);

    // Create new project
    addProject({
      title: projectTitle,
      description: projectDescription,
      date: dueDate,
      hours: `${totalHours} hours`,
      teamMembers: assignedMembers,
      iconType: selectedProjectType,
      backgroundColor: selectedColor,
      status: 'active',
    });

    Alert.alert('Success', 'Project created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 bg-white rounded-full items-center justify-center"
        >
          <IconSymbol name="xmark" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text className="text-white text-2xl font-semibold">Create Project</Text>
        
        <TouchableOpacity
          onPress={handleCreateProject}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: AppColors.primary }}
        >
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Project Details Card */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-xl font-semibold text-black mb-4">Project Details</Text>
          
          {/* Project Title */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">Project Title</Text>
          <TextInput
            className="bg-gray-100 rounded-2xl px-4 py-3 mb-4 text-base"
            placeholder="Enter project title"
            value={projectTitle}
            onChangeText={setProjectTitle}
            placeholderTextColor="#999"
          />

          {/* Project Description */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">Description</Text>
          <TextInput
            className="bg-gray-100 rounded-2xl px-4 py-3 mb-4 text-base"
            placeholder="Enter project description"
            value={projectDescription}
            onChangeText={setProjectDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          {/* Due Date */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">Due Date</Text>
          <TextInput
            className="bg-gray-100 rounded-2xl px-4 py-3 mb-4 text-base"
            placeholder="e.g., Thursday, 20 July 2023"
            value={dueDate}
            onChangeText={setDueDate}
            placeholderTextColor="#999"
          />

          {/* Project Type */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">Project Type</Text>
          <View className="flex-row flex-wrap mb-4">
            {projectTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => setSelectedProjectType(type.value)}
                className="px-4 py-2 rounded-full mr-2 mb-2"
                style={{
                  backgroundColor: selectedProjectType === type.value ? AppColors.primary : '#f3f4f6',
                }}
              >
                <Text
                  style={{
                    color: selectedProjectType === type.value ? '#fff' : '#666',
                    fontWeight: '600',
                  }}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color Theme */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">Color Theme</Text>
          <View className="flex-row mb-2">
            {colorThemes.map((theme) => (
              <TouchableOpacity
                key={theme.name}
                onPress={() => setSelectedColor(theme.color)}
                className="w-12 h-12 rounded-full mr-3"
                style={{
                  backgroundColor: theme.color,
                  borderWidth: selectedColor === theme.color ? 3 : 0,
                  borderColor: AppColors.primary,
                }}
              />
            ))}
          </View>
        </View>

        {/* Assigned Members Card */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-xl font-semibold text-black mb-4">Assign Team Members</Text>
          
          <View className="flex-row items-center flex-wrap">
            {assignedMembers.map((member, index) => (
              <View
                key={index}
                className="border-2 border-white mr-2 mb-2"
                style={{ borderRadius: 28 }}
              >
                <Avatar name={member.name} size={56} colorIndex={member.colorIndex} />
              </View>
            ))}
            
            {/* Add Member Button */}
            <TouchableOpacity
              onPress={() => setShowMemberModal(true)}
              className="w-14 h-14 rounded-full border-2 border-dashed items-center justify-center"
              style={{ borderColor: AppColors.gray[400] }}
            >
              <IconSymbol name="plus" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tasks Card */}
        <View className="bg-white rounded-3xl p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-black">Tasks</Text>
            <TouchableOpacity
              onPress={() => setShowTaskModal(true)}
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: AppColors.primary }}
            >
              <Text className="text-white font-semibold text-sm">Add Task</Text>
            </TouchableOpacity>
          </View>

          {tasks.length === 0 ? (
            <Text className="text-gray-500 text-center py-4">No tasks added yet</Text>
          ) : (
            tasks.map((task, index) => (
              <View
                key={task.id}
                className={`flex-row items-center justify-between ${
                  index < tasks.length - 1 ? 'mb-4 pb-4 border-b border-gray-200' : ''
                }`}
              >
                <View className="flex-1">
                  <Text className="text-base font-medium text-black mb-1">{task.title}</Text>
                  <View className="flex-row items-center">
                    <IconSymbol name="flag" size={14} color="#999" />
                    <Text className="text-sm text-gray-500 ml-1">{task.hours}</Text>
                  </View>
                  <View className="flex-row mt-2">
                    {task.assignedMembers.map((member, idx) => (
                      <View
                        key={idx}
                        className="border-2 border-white"
                        style={{ marginLeft: idx > 0 ? -8 : 0, borderRadius: 16 }}
                      >
                        <Avatar name={member.name} size={32} colorIndex={member.colorIndex} />
                      </View>
                    ))}
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeTask(task.id)}>
                  <IconSymbol name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Member Selection Modal */}
      <Modal
        visible={showMemberModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMemberModal(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-white rounded-t-3xl p-6" style={{ maxHeight: '80%' }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Select Team Members</Text>
              <TouchableOpacity onPress={() => setShowMemberModal(false)}>
                <IconSymbol name="xmark" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {availableMembers.map((member) => {
                const isSelected = assignedMembers.find(m => m.name === member.name);
                return (
                  <TouchableOpacity
                    key={member.name}
                    onPress={() => toggleMember(member)}
                    className="flex-row items-center justify-between py-3 border-b border-gray-200"
                  >
                    <View className="flex-row items-center">
                      <Avatar name={member.name} size={40} colorIndex={member.colorIndex} />
                      <Text className="text-base ml-3">{member.name}</Text>
                    </View>
                    <View 
                      className="w-6 h-6 rounded-full items-center justify-center"
                      style={{ 
                        backgroundColor: isSelected ? AppColors.primary : '#e5e7eb',
                        borderWidth: isSelected ? 0 : 2,
                        borderColor: '#d1d5db'
                      }}
                    >
                      {isSelected && (
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Task Creation Modal */}
      <Modal
        visible={showTaskModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTaskModal(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Add Task</Text>
              <TouchableOpacity onPress={() => setShowTaskModal(false)}>
                <IconSymbol name="xmark" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <Text className="text-sm font-semibold text-gray-700 mb-2">Task Title</Text>
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-3 mb-4 text-base"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholderTextColor="#999"
            />

            <Text className="text-sm font-semibold text-gray-700 mb-2">Estimated Hours</Text>
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-3 mb-4 text-base"
              placeholder="Enter hours (e.g., 25)"
              value={newTaskHours}
              onChangeText={setNewTaskHours}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Text className="text-sm font-semibold text-gray-700 mb-2">Assign To</Text>
            <ScrollView className="mb-4" style={{ maxHeight: 200 }}>
              {availableMembers.map((member) => {
                const isSelected = taskAssignedMembers.find(m => m.name === member.name);
                return (
                  <TouchableOpacity
                    key={member.name}
                    onPress={() => toggleTaskMember(member)}
                    className="flex-row items-center justify-between py-3 border-b border-gray-200"
                  >
                    <View className="flex-row items-center">
                      <Avatar name={member.name} size={40} colorIndex={member.colorIndex} />
                      <Text className="text-base ml-3">{member.name}</Text>
                    </View>
                    <View 
                      className="w-6 h-6 rounded-full items-center justify-center"
                      style={{ 
                        backgroundColor: isSelected ? AppColors.primary : '#e5e7eb',
                        borderWidth: isSelected ? 0 : 2,
                        borderColor: '#d1d5db'
                      }}
                    >
                      {isSelected && (
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              onPress={addTask}
              className="rounded-2xl py-4 items-center"
              style={{ backgroundColor: AppColors.primary }}
            >
              <Text className="text-white font-semibold text-base">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
