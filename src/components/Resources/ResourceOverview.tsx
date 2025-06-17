import React from 'react';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Resource } from '../../types';

interface ResourceOverviewProps {
  resources: Resource[];
}

export const ResourceOverview: React.FC<ResourceOverviewProps> = ({ resources }) => {
  const totalCapacity = resources.reduce((sum, resource) => sum + resource.capacity, 0);
  const totalAllocated = resources.reduce((sum, resource) => sum + resource.allocated, 0);
  const totalCost = resources.reduce((sum, resource) => sum + resource.cost, 0);
  const averageUtilization = resources.reduce((sum, resource) => sum + resource.utilizationRate, 0) / resources.length;

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600 bg-red-50 border-red-200';
    if (rate >= 80) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  const getUtilizationIcon = (rate: number) => {
    if (rate >= 90) return <AlertTriangle size={16} className="text-red-600" />;
    if (rate >= 80) return <TrendingUp size={16} className="text-amber-600" />;
    return <CheckCircle size={16} className="text-emerald-600" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Users size={24} className="mr-2 text-blue-600" />
          Resource Overview
        </h2>
        <div className="text-sm text-gray-500">
          {resources.length} team members
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm font-medium text-blue-700">Total Capacity</div>
          <div className="text-2xl font-bold text-blue-900">{totalCapacity}h</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="text-sm font-medium text-emerald-700">Allocated</div>
          <div className="text-2xl font-bold text-emerald-900">{totalAllocated}h</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-sm font-medium text-purple-700">Avg. Utilization</div>
          <div className="text-2xl font-bold text-purple-900">{averageUtilization.toFixed(0)}%</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700">Total Cost</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</div>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {resource.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                  <p className="text-sm text-gray-600">{resource.role} • {resource.department}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getUtilizationColor(resource.utilizationRate)}`}>
                {getUtilizationIcon(resource.utilizationRate)}
                <span>{resource.utilizationRate}%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-500">Capacity</div>
                <div className="font-semibold">{resource.capacity}h/week</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Allocated</div>
                <div className="font-semibold">{resource.allocated}h/week</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Cost</div>
                <div className="font-semibold">{formatCurrency(resource.cost)}</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Utilization</span>
                <span className="font-medium">{resource.utilizationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    resource.utilizationRate >= 90 ? 'bg-red-500' : 
                    resource.utilizationRate >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(resource.utilizationRate, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Skills</div>
              <div className="flex flex-wrap gap-1">
                {resource.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};