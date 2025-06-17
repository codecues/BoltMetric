import React from 'react';
import { Calendar, Clock, User, AlertCircle, CheckCircle, Play, Square } from 'lucide-react';
import { Task, Resource } from '../../types';

interface TasksTimelineProps {
  tasks: Task[];
  resources: Resource[];
}

export const TasksTimeline: React.FC<TasksTimelineProps> = ({ tasks, resources }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-emerald-600" />;
      case 'in-progress': return <Play size={16} className="text-blue-600" />;
      case 'blocked': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Square size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'blocked': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getResourceName = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource ? resource.name : 'Unknown';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar size={24} className="mr-2 text-blue-600" />
          Tasks & Timeline
        </h2>
        <div className="text-sm text-gray-500">
          {tasks.length} total tasks
        </div>
      </div>

      <div className="space-y-6">
        {tasks.map((task, index) => (
          <div key={task.id} className="relative">
            {index < tasks.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                {getStatusIcon(task.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-sm font-medium text-gray-900 mb-1">{task.progress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-md p-3 border border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar size={14} className="mr-1" />
                        Timeline
                      </div>
                      <div className="text-sm font-medium">
                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {task.duration} days
                      </div>
                    </div>

                    <div className="bg-white rounded-md p-3 border border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <User size={14} className="mr-1" />
                        Assigned To
                      </div>
                      <div className="text-sm font-medium">
                        {task.assignedTo.length === 1 
                          ? getResourceName(task.assignedTo[0])
                          : `${task.assignedTo.length} members`
                        }
                      </div>
                      {task.assignedTo.length > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {task.assignedTo.map(id => getResourceName(id)).join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="bg-white rounded-md p-3 border border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Clock size={14} className="mr-1" />
                        Earned Value
                      </div>
                      <div className="text-sm font-medium">
                        {formatCurrency(task.earnedValue)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        of {formatCurrency(task.plannedValue)}
                      </div>
                    </div>
                  </div>

                  {task.dependencies.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <div className="text-sm font-medium text-amber-800 mb-1">Dependencies</div>
                      <div className="text-xs text-amber-700">
                        Depends on {task.dependencies.length} task{task.dependencies.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};