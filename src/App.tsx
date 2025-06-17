import React, { useState } from 'react';
import { DashboardHeader } from './components/Dashboard/DashboardHeader';
import { ResourceOverview } from './components/Resources/ResourceOverview';
import { TasksTimeline } from './components/Tasks/TasksTimeline';
import { MilestoneTracker } from './components/Milestones/MilestoneTracker';
import { RiskAssessment } from './components/Risks/RiskAssessment';
import { EarnedValueChart } from './components/Analytics/EarnedValueChart';
import { mockProject } from './data/mockData';
import { BarChart3, Users, Calendar, Flag, Shield, TrendingUp } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'resources', label: 'Resources', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: Calendar },
    { id: 'milestones', label: 'Milestones', icon: Flag },
    { id: 'risks', label: 'Risks', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResourceOverview resources={mockProject.resources} />
              <EarnedValueChart tasks={mockProject.tasks} />
            </div>
            <RiskAssessment risks={mockProject.risks} resources={mockProject.resources} />
          </div>
        );
      case 'resources':
        return <ResourceOverview resources={mockProject.resources} />;
      case 'tasks':
        return <TasksTimeline tasks={mockProject.tasks} resources={mockProject.resources} />;
      case 'milestones':
        return <MilestoneTracker milestones={mockProject.milestones} />;
      case 'risks':
        return <RiskAssessment risks={mockProject.risks} resources={mockProject.resources} />;
      case 'analytics':
        return <EarnedValueChart tasks={mockProject.tasks} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader project={mockProject} />
        
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;