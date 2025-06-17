import { Project } from '../types';

export const mockProject: Project = {
  id: 'proj-001',
  name: 'Digital Transformation Initiative',
  description: 'Enterprise-wide digital transformation project',
  startDate: '2024-01-15',
  endDate: '2024-09-30',
  budget: 2500000,
  status: 'active',
  progress: 67,
  
  resources: [
    {
      id: 'res-001',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      department: 'PMO',
      utilizationRate: 95,
      capacity: 40,
      allocated: 38,
      cost: 85000,
      skills: ['Project Management', 'Agile', 'Risk Management']
    },
    {
      id: 'res-002',
      name: 'Michael Chen',
      role: 'Lead Developer',
      department: 'Engineering',
      utilizationRate: 87,
      capacity: 40,
      allocated: 35,
      cost: 95000,
      skills: ['React', 'Node.js', 'Architecture']
    },
    {
      id: 'res-003',
      name: 'Emily Davis',
      role: 'UX Designer',
      department: 'Design',
      utilizationRate: 73,
      capacity: 40,
      allocated: 29,
      cost: 72000,
      skills: ['UI/UX', 'Figma', 'User Research']
    },
    {
      id: 'res-004',
      name: 'David Wilson',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      utilizationRate: 91,
      capacity: 40,
      allocated: 36,
      cost: 88000,
      skills: ['AWS', 'Docker', 'CI/CD']
    },
    {
      id: 'res-005',
      name: 'Lisa Rodriguez',
      role: 'QA Lead',
      department: 'Quality',
      utilizationRate: 82,
      capacity: 40,
      allocated: 33,
      cost: 76000,
      skills: ['Testing', 'Automation', 'Quality Assurance']
    }
  ],

  tasks: [
    {
      id: 'task-001',
      title: 'Requirements Analysis',
      description: 'Gather and analyze business requirements',
      assignedTo: ['res-001', 'res-003'],
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      duration: 31,
      progress: 100,
      status: 'completed',
      priority: 'high',
      dependencies: [],
      plannedValue: 125000,
      earnedValue: 125000,
      actualCost: 118000
    },
    {
      id: 'task-002',
      title: 'System Architecture Design',
      description: 'Design the overall system architecture',
      assignedTo: ['res-002', 'res-004'],
      startDate: '2024-02-10',
      endDate: '2024-03-10',
      duration: 29,
      progress: 100,
      status: 'completed',
      priority: 'critical',
      dependencies: ['task-001'],
      plannedValue: 180000,
      earnedValue: 180000,
      actualCost: 175000
    },
    {
      id: 'task-003',
      title: 'Frontend Development',
      description: 'Develop user interface components',
      assignedTo: ['res-002', 'res-003'],
      startDate: '2024-03-01',
      endDate: '2024-06-15',
      duration: 106,
      progress: 78,
      status: 'in-progress',
      priority: 'high',
      dependencies: ['task-002'],
      plannedValue: 450000,
      earnedValue: 351000,
      actualCost: 365000
    },
    {
      id: 'task-004',
      title: 'Backend API Development',
      description: 'Build REST API and database layer',
      assignedTo: ['res-002', 'res-004'],
      startDate: '2024-03-15',
      endDate: '2024-07-01',
      duration: 108,
      progress: 85,
      status: 'in-progress',
      priority: 'critical',
      dependencies: ['task-002'],
      plannedValue: 520000,
      earnedValue: 442000,
      actualCost: 448000
    },
    {
      id: 'task-005',
      title: 'Testing & Quality Assurance',
      description: 'Comprehensive testing of all components',
      assignedTo: ['res-005'],
      startDate: '2024-05-01',
      endDate: '2024-08-15',
      duration: 106,
      progress: 45,
      status: 'in-progress',
      priority: 'high',
      dependencies: ['task-003', 'task-004'],
      plannedValue: 280000,
      earnedValue: 126000,
      actualCost: 132000
    },
    {
      id: 'task-006',
      title: 'Deployment & Launch',
      description: 'Deploy to production environment',
      assignedTo: ['res-004', 'res-001'],
      startDate: '2024-08-01',
      endDate: '2024-09-30',
      duration: 60,
      progress: 15,
      status: 'in-progress',
      priority: 'critical',
      dependencies: ['task-005'],
      plannedValue: 95000,
      earnedValue: 14250,
      actualCost: 18000
    }
  ],

  milestones: [
    {
      id: 'mile-001',
      title: 'Requirements Approval',
      description: 'Stakeholder approval of requirements',
      targetDate: '2024-02-15',
      actualDate: '2024-02-14',
      status: 'achieved',
      progress: 100,
      dependentTasks: ['task-001']
    },
    {
      id: 'mile-002',
      title: 'Architecture Sign-off',
      description: 'Technical architecture approval',
      targetDate: '2024-03-10',
      actualDate: '2024-03-12',
      status: 'achieved',
      progress: 100,
      dependentTasks: ['task-002']
    },
    {
      id: 'mile-003',
      title: 'MVP Release',
      description: 'Minimum viable product release',
      targetDate: '2024-06-30',
      status: 'at-risk',
      progress: 72,
      dependentTasks: ['task-003', 'task-004']
    },
    {
      id: 'mile-004',
      title: 'Beta Testing Complete',
      description: 'Complete beta testing phase',
      targetDate: '2024-08-15',
      status: 'upcoming',
      progress: 35,
      dependentTasks: ['task-005']
    },
    {
      id: 'mile-005',
      title: 'Production Launch',
      description: 'Official production launch',
      targetDate: '2024-09-30',
      status: 'upcoming',
      progress: 15,
      dependentTasks: ['task-006']
    }
  ],

  risks: [
    {
      id: 'risk-001',
      title: 'Resource Availability',
      description: 'Key team members may be unavailable due to competing priorities',
      category: 'Resource',
      probability: 60,
      impact: 80,
      ragStatus: 'amber',
      owner: 'res-001',
      mitigationPlan: 'Cross-train team members and maintain backup resources',
      dateIdentified: '2024-02-01'
    },
    {
      id: 'risk-002',
      title: 'Technology Integration',
      description: 'Third-party API integration may cause delays',
      category: 'Technical',
      probability: 40,
      impact: 70,
      ragStatus: 'green',
      owner: 'res-002',
      mitigationPlan: 'Early prototyping and vendor communication',
      dateIdentified: '2024-03-15'
    },
    {
      id: 'risk-003',
      title: 'Budget Overrun',
      description: 'Project costs exceeding approved budget',
      category: 'Financial',
      probability: 70,
      impact: 90,
      ragStatus: 'red',
      owner: 'res-001',
      mitigationPlan: 'Weekly budget reviews and scope management',
      dateIdentified: '2024-04-10'
    },
    {
      id: 'risk-004',
      title: 'Performance Requirements',
      description: 'System may not meet performance benchmarks',
      category: 'Technical',
      probability: 50,
      impact: 60,
      ragStatus: 'amber',
      owner: 'res-004',
      mitigationPlan: 'Performance testing and optimization',
      dateIdentified: '2024-05-01'
    }
  ]
};