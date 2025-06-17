import React from 'react';
import { Flag, Calendar, CheckCircle, AlertTriangle, Clock, Target } from 'lucide-react';
import { Milestone } from '../../types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'achieved': return <CheckCircle size={20} className="text-emerald-600" />;
      case 'at-risk': return <AlertTriangle size={20} className="text-amber-600" />;
      case 'delayed': return <AlertTriangle size={20} className="text-red-600" />;
      default: return <Clock size={20} className="text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'at-risk': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'delayed': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-emerald-500';
      case 'at-risk': return 'bg-amber-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysUntil = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Flag size={24} className="mr-2 text-blue-600" />
          Milestones
        </h2>
        <div className="text-sm text-gray-500">
          {milestones.filter(m => m.status === 'achieved').length} of {milestones.length} completed
        </div>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const daysUntil = calculateDaysUntil(milestone.targetDate);
          
          return (
            <div key={milestone.id} className="relative">
              {index < milestones.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  {getStatusIcon(milestone.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(milestone.status)}`}>
                            {milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          
                          {milestone.status === 'upcoming' && daysUntil >= 0 && (
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                              {daysUntil} days remaining
                            </span>
                          )}
                          
                          {milestone.status === 'achieved' && milestone.actualDate && (
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                              Completed {formatDate(milestone.actualDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-gray-900 mb-1">{milestone.progress}%</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(milestone.status)}`}
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Target size={14} className="mr-1" />
                          Target Date
                        </div>
                        <div className="text-sm font-medium">{formatDate(milestone.targetDate)}</div>
                        {milestone.actualDate && milestone.status === 'achieved' && (
                          <div className="text-xs text-gray-500 mt-1">
                            Actual: {formatDate(milestone.actualDate)}
                          </div>
                        )}
                      </div>

                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Calendar size={14} className="mr-1" />
                          Dependencies
                        </div>
                        <div className="text-sm font-medium">
                          {milestone.dependentTasks.length} task{milestone.dependentTasks.length !== 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Must complete first
                        </div>
                      </div>
                    </div>

                    {milestone.status === 'at-risk' && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-md p-3">
                        <div className="flex items-center text-sm font-medium text-amber-800">
                          <AlertTriangle size={14} className="mr-1" />
                          At Risk
                        </div>
                        <div className="text-xs text-amber-700 mt-1">
                          This milestone may not meet its target date based on current progress.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};