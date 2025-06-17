export interface Resource {
  id: string;
  name: string;
  role: string;
  department: string;
  utilizationRate: number;
  capacity: number;
  allocated: number;
  cost: number;
  skills: string[];
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  plannedValue: number;
  earnedValue: number;
  actualCost: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: 'upcoming' | 'achieved' | 'delayed' | 'at-risk';
  progress: number;
  dependentTasks: string[];
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  probability: number;
  impact: number;
  ragStatus: 'red' | 'amber' | 'green';
  owner: string;
  mitigationPlan: string;
  dateIdentified: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  tasks: Task[];
  resources: Resource[];
  milestones: Milestone[];
  risks: Risk[];
}