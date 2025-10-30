import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/theme-context';

type ProjectStatus = 'active' | 'completed' | 'on-hold';

interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  hours: string;
  teamMembers: { name: string; colorIndex: number }[];
  iconType: 'fintech' | 'website' | 'mobile' | 'design';
  backgroundColor: string;
  status: ProjectStatus;
}

interface ProjectOptionsModalProps {
  visible: boolean;
  project: Project | null;
  onClose: () => void;
  onDelete: (projectId: number) => void;
  onUpdateStatus: (projectId: number, status: ProjectStatus) => void;
}

export function ProjectOptionsModal({
  visible,
  project,
  onClose,
  onDelete,
  onUpdateStatus,
}: ProjectOptionsModalProps) {
  const router = useRouter();
  const { colors } = useTheme();

  const handleDelete = () => {
    if (project) {
      Alert.alert(
        'Delete Project',
        `Are you sure you want to delete "${project.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              onDelete(project.id);
              onClose();
            },
          },
        ]
      );
    }
  };

  const handleStatusUpdate = (status: ProjectStatus) => {
    if (project) {
      onUpdateStatus(project.id, status);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity activeOpacity={1}>
            <View className="rounded-t-3xl p-6" style={{ backgroundColor: colors.card }}>
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-semibold" style={{ color: colors.text }}>
                  Project Options
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <IconSymbol name="xmark" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              {/* Edit Option */}
              <TouchableOpacity
                className="flex-row items-center py-4 border-b"
                style={{ borderBottomColor: colors.border }}
                onPress={() => {
                  onClose();
                  router.push('/create-project');
                }}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="pencil" size={20} color={colors.primary} />
                </View>
                <Text className="text-base" style={{ color: colors.text }}>Edit Project</Text>
              </TouchableOpacity>

              {/* Status Options */}
              <View className="py-2">
                <Text className="text-sm font-semibold mb-2" style={{ color: colors.textSecondary }}>
                  Update Status
                </Text>
                <TouchableOpacity
                  className="flex-row items-center py-3"
                  onPress={() => handleStatusUpdate('active')}
                >
                  <View 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: '#4ECDC4' }}
                  />
                  <Text className="text-base" style={{ color: colors.text }}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center py-3"
                  onPress={() => handleStatusUpdate('completed')}
                >
                  <View 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: '#95E1D3' }}
                  />
                  <Text className="text-base" style={{ color: colors.text }}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center py-3"
                  onPress={() => handleStatusUpdate('on-hold')}
                >
                  <View 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: '#F38181' }}
                  />
                  <Text className="text-base" style={{ color: colors.text }}>On Hold</Text>
                </TouchableOpacity>
              </View>

              {/* Delete Option */}
              <TouchableOpacity
                className="flex-row items-center py-4 mt-2 border-t"
                style={{ borderTopColor: colors.border }}
                onPress={handleDelete}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: '#FEE2E2' }}
                >
                  <IconSymbol name="trash" size={20} color="#EF4444" />
                </View>
                <Text className="text-base" style={{ color: '#EF4444' }}>Delete Project</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
