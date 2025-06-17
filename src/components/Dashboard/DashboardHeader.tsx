import React from 'react';
import { Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Project } from '../../types';

interface DashboardHeaderProps {
  project: Project;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ project }) => {
  const totalPlannedValue = project.tasks.reduce((sum, task) => sum + task.plannedValue, 0);
  const totalEarnedValue = project.tasks.reduce((sum, task) => sum + task.earnedValue, 0);
  const totalActualCost = project.tasks.reduce((sum, task) => sum + task.actualCost, 0);
  const cpi = totalEarnedValue / totalActualCost;
  const spi = totalEarnedValue / totalPlannedValue;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
          <p className="text-gray-600 max-w-2xl">{project.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mt-6 lg:mt-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{project.progress}%</div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Budget</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(project.budget)}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <DollarSign size={24} className="text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Earned Value</p>
              <p className="text-2xl font-bold text-emerald-900">{formatCurrency(totalEarnedValue)}</p>
            </div>
            <div className="p-3 bg-emerald-200 rounded-lg">
              <TrendingUp size={24} className="text-emerald-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Cost Performance</p>
              <p className="text-2xl font-bold text-purple-900">{cpi.toFixed(2)}</p>
              <p className="text-xs text-purple-600">{cpi > 1 ? 'Under Budget' : 'Over Budget'}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <DollarSign size={24} className="text-purple-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Schedule Performance</p>
              <p className="text-2xl font-bold text-amber-900">{spi.toFixed(2)}</p>
              <p className="text-xs text-amber-600">{spi > 1 ? 'Ahead of Schedule' : 'Behind Schedule'}</p>
            </div>
            <div className="p-3 bg-amber-200 rounded-lg">
              <Clock size={24} className="text-amber-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};