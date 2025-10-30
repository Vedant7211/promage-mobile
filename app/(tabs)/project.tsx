import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { Avatar } from '@/components/avatar';
import { ProjectIcon } from '@/components/project-icon';
import { useTheme } from '@/contexts/theme-context';
import { useState } from 'react';
import { ProjectOptionsModal } from '@/components/project-options-modal';
import { useProjects, Project } from '@/contexts/project-context';

type ProjectStatus = 'active' | 'completed' | 'on-hold';

export default function ProjectScreen() {
  const router = useRouter();
  const { colors, theme, toggleTheme } = useTheme();
  const { projects, deleteProject, updateProjectStatus } = useProjects();
  
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectOptions = (project: Project) => {
    setSelectedProject(project);
    setShowOptionsModal(true);
  };

  const handleDeleteProject = (projectId: number) => {
    deleteProject(projectId);
  };

  const handleUpdateStatus = (projectId: number, status: ProjectStatus) => {
    updateProjectStatus(projectId, status);
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active': return '#4ECDC4';
      case 'completed': return '#95E1D3';
      case 'on-hold': return '#F38181';
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-5xl font-light" style={{ color: colors.text }}>Project</Text>
          <TouchableOpacity
            onPress={toggleTheme}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.card }}
          >
            <IconSymbol 
              name={theme === 'light' ? 'moon.fill' : 'sun.max.fill'} 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>
        <Text className="text-5xl font-light" style={{ color: colors.text }}>List ({projects.length})</Text>
      </View>

      {/* Project Cards */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            className="rounded-3xl p-6 mb-4"
            style={{ backgroundColor: project.backgroundColor }}
            onPress={() => router.push('/project-detail')}
            activeOpacity={0.8}
          >
            {/* Project Icon and Options */}
            <View className="flex-row justify-between items-start mb-4">
              <ProjectIcon type={project.iconType} size={96} />
              <View className="flex-row">
                <TouchableOpacity 
                  className="w-10 h-10 bg-white/60 rounded-full items-center justify-center mr-2"
                  onPress={(e) => {
                    e.stopPropagation();
                    handleProjectOptions(project);
                  }}
                >
                  <IconSymbol name="ellipsis" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-white/60 rounded-full items-center justify-center">
                  <IconSymbol name="arrow.up.right" size={18} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Project Title and Status */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-2xl font-bold text-black flex-1">
                {project.title}
              </Text>
              <View 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                <Text className="text-xs font-semibold text-white capitalize">
                  {project.status}
                </Text>
              </View>
            </View>

            {/* Date */}
            <View className="flex-row items-center mb-3">
              <IconSymbol name="calendar" size={16} color="#666" />
              <Text className="text-base text-gray-700 ml-2">{project.date}</Text>
            </View>

            {/* Description */}
            <Text className="text-base text-gray-800 mb-4 leading-6">
              {project.description}
            </Text>

            {/* Team Members and Hours */}
            <View className="flex-row justify-between items-center">
              {/* Team Members */}
              <View className="flex-row">
                {project.teamMembers.map((member, index) => (
                  <View
                    key={index}
                    className="border-2 border-white"
                    style={{ marginLeft: index > 0 ? -12 : 0, borderRadius: 20 }}
                  >
                    <Avatar name={member.name} size={40} colorIndex={member.colorIndex} />
                  </View>
                ))}
              </View>

              {/* Hours */}
              <Text className="text-base font-semibold" style={{ color: AppColors.primary }}>
                {project.hours}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute right-6 w-16 h-16 rounded-full items-center justify-center"
        onPress={() => router.push('/create-project')}
        style={{
          backgroundColor: AppColors.primary,
          bottom: 100,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <IconSymbol name="plus" size={32} color="#fff" />
      </TouchableOpacity>

      <ProjectOptionsModal
        visible={showOptionsModal}
        project={selectedProject}
        onClose={() => setShowOptionsModal(false)}
        onDelete={handleDeleteProject}
        onUpdateStatus={handleUpdateStatus}
      />
    </SafeAreaView>
  );
}
