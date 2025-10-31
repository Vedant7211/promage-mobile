import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

type ProjectStatus = 'active' | 'completed' | 'on-hold';

export interface Project {
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

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  updateProjectStatus: (id: number, status: ProjectStatus) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Fintech Mobile App UI',
    date: '20 July',
    description: 'Fintech app development provides more freedom to banking and other financial institutions.',
    hours: '91 hours',
    teamMembers: [
      { name: 'John Doe', colorIndex: 0 },
      { name: 'Sarah Smith', colorIndex: 1 },
      { name: 'Mike Johnson', colorIndex: 2 },
      { name: 'Emily Davis', colorIndex: 3 },
      { name: 'Alex Brown', colorIndex: 4 },
    ],
    iconType: 'fintech',
    backgroundColor: '#F8E9C8',
    status: 'active',
  },
  {
    id: 2,
    title: 'Green sky Website Design',
    date: '12 June',
    description: 'Website redesign for Green sky environmental services.',
    hours: '64 hours',
    teamMembers: [
      { name: 'Lisa Wilson', colorIndex: 5 },
      { name: 'Tom Anderson', colorIndex: 6 },
      { name: 'Kate Miller', colorIndex: 7 },
    ],
    iconType: 'website',
    backgroundColor: '#DEECEC',
    status: 'active',
  },
  {
    id: 3,
    title: 'E-commerce Mobile App',
    date: '15 August',
    description: 'Building a modern e-commerce platform with seamless checkout experience.',
    hours: '120 hours',
    teamMembers: [
      { name: 'John Doe', colorIndex: 0 },
      { name: 'Emily Davis', colorIndex: 3 },
      { name: 'Tom Anderson', colorIndex: 6 },
    ],
    iconType: 'mobile',
    backgroundColor: '#DED3FD',
    status: 'active',
  },
  {
    id: 4,
    title: 'Brand Identity Design',
    date: '5 September',
    description: 'Complete brand identity package including logo, colors, and guidelines.',
    hours: '45 hours',
    teamMembers: [
      { name: 'Sarah Smith', colorIndex: 1 },
      { name: 'Kate Miller', colorIndex: 7 },
    ],
    iconType: 'design',
    backgroundColor: '#DFECDE',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Healthcare Dashboard',
    date: '22 July',
    description: 'Analytics dashboard for healthcare providers to track patient data.',
    hours: '88 hours',
    teamMembers: [
      { name: 'Mike Johnson', colorIndex: 2 },
      { name: 'Alex Brown', colorIndex: 4 },
      { name: 'Lisa Wilson', colorIndex: 5 },
    ],
    iconType: 'website',
    backgroundColor: '#DEECEC',
    status: 'on-hold',
  },
];

const PROJECTS_STORAGE_KEY = 'projects';
const OFFLINE_PROJECTS_STORAGE_KEY = 'offline_projects';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const isConnected = useNetworkStatus();

  useEffect(() => {
    const loadAndSyncProjects = async () => {
      await loadProjectsFromStorage();
      if (isConnected) {
        await syncOfflineProjects();
      }
    };
    loadAndSyncProjects();
  }, [isConnected]);

  const loadProjectsFromStorage = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem(PROJECTS_STORAGE_KEY);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(initialProjects);
      }
    } catch (error) {
      console.error('Failed to load projects from storage', error);
    }
  };

  const syncOfflineProjects = async () => {
    try {
      const offlineProjectsStr = await AsyncStorage.getItem(OFFLINE_PROJECTS_STORAGE_KEY);
      if (offlineProjectsStr) {
        const offlineProjects: Omit<Project, 'id'>[] = JSON.parse(offlineProjectsStr);
        if (offlineProjects.length > 0) {
          setProjects(prevProjects => {
            const newProjects = [...prevProjects];
            offlineProjects.forEach(project => {
              const newProject: Project = {
                ...project,
                id: Math.max(...newProjects.map(p => p.id), 0) + 1,
              };
              newProjects.unshift(newProject);
            });
            return newProjects;
          });
          await AsyncStorage.removeItem(OFFLINE_PROJECTS_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to sync offline projects', error);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    if (!isConnected) {
      try {
        const offlineProjectsStr = await AsyncStorage.getItem(OFFLINE_PROJECTS_STORAGE_KEY);
        const offlineProjects = offlineProjectsStr ? JSON.parse(offlineProjectsStr) : [];
        offlineProjects.push(project);
        await AsyncStorage.setItem(OFFLINE_PROJECTS_STORAGE_KEY, JSON.stringify(offlineProjects));
      } catch (error) {
        console.error('Failed to save project offline', error);
      }
      return;
    }

    setProjects(prevProjects => {
      const newProject: Project = {
        ...project,
        id: Math.max(...prevProjects.map(p => p.id), 0) + 1,
      };
      const updatedProjects = [newProject, ...prevProjects];
      AsyncStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  const updateProject = (id: number, updatedFields: Partial<Project>) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(p =>
        p.id === id ? { ...p, ...updatedFields } : p
      );
      AsyncStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  const deleteProject = (id: number) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter(p => p.id !== id);
      AsyncStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  const updateProjectStatus = (id: number, status: ProjectStatus) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(p =>
        p.id === id ? { ...p, status } : p
      );
      AsyncStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject, 
      updateProject, 
      deleteProject, 
      updateProjectStatus 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
}
