import React from 'react';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';
import { Task } from '../../types';

interface EarnedValueChartProps {
  tasks: Task[];
}

export const EarnedValueChart: React.FC<EarnedValueChartProps> = ({ tasks }) => {
  const totalPlannedValue = tasks.reduce((sum, task) => sum + task.plannedValue, 0);
  const totalEarnedValue = tasks.reduce((sum, task) => sum + task.earnedValue, 0);
  const totalActualCost = tasks.reduce((sum, task) => sum + task.actualCost, 0);

  const costPerformanceIndex = totalEarnedValue / totalActualCost;
  const schedulePerformanceIndex = totalEarnedValue / totalPlannedValue;
  const costVariance = totalEarnedValue - totalActualCost;
  const scheduleVariance = totalEarnedValue - totalPlannedValue;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPerformanceColor = (value: number, isVariance = false) => {
    if (isVariance) {
      return value >= 0 ? 'text-emerald-600' : 'text-red-600';
    }
    return value >= 1 ? 'text-emerald-600' : 'text-red-600';
  };

  const getPerformanceStatus = (value: number, isVariance = false) => {
    if (isVariance) {
      if (value > 0) return 'Positive';
      if (value < 0) return 'Negative';
      return 'On Track';
    }
    if (value > 1.1) return 'Excellent';
    if (value >= 1) return 'Good';
    if (value >= 0.9) return 'Acceptable';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <TrendingUp size={24} className="mr-2 text-blue-600" />
          Earned Value Analysis
        </h2>
        <div className="text-sm text-gray-500">
          Performance Metrics
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-blue-700">Planned Value (PV)</div>
            <Target size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalPlannedValue)}</div>
          <div className="text-xs text-blue-600 mt-1">Baseline budget</div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-emerald-700">Earned Value (EV)</div>
            <TrendingUp size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900">{formatCurrency(totalEarnedValue)}</div>
          <div className="text-xs text-emerald-600 mt-1">Value delivered</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-purple-700">Actual Cost (AC)</div>
            <DollarSign size={16} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900">{formatCurrency(totalActualCost)}</div>
          <div className="text-xs text-purple-600 mt-1">Money spent</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-1">Cost Performance Index</div>
          <div className={`text-xl font-bold ${getPerformanceColor(costPerformanceIndex)}`}>
            {costPerformanceIndex.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {getPerformanceStatus(costPerformanceIndex)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-1">Schedule Performance Index</div>
          <div className={`text-xl font-bold ${getPerformanceColor(schedulePerformanceIndex)}`}>
            {schedulePerformanceIndex.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {getPerformanceStatus(schedulePerformanceIndex)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-1">Cost Variance</div>
          <div className={`text-xl font-bold ${getPerformanceColor(costVariance, true)}`}>
            {formatCurrency(costVariance)}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {getPerformanceStatus(costVariance, true)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-1">Schedule Variance</div>
          <div className={`text-xl font-bold ${getPerformanceColor(scheduleVariance, true)}`}>
            {formatCurrency(scheduleVariance)}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {getPerformanceStatus(scheduleVariance, true)}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Budget Efficiency</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${costPerformanceIndex >= 1 ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(costPerformanceIndex * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{(costPerformanceIndex * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Schedule Efficiency</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${schedulePerformanceIndex >= 1 ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(schedulePerformanceIndex * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{(schedulePerformanceIndex * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(totalEarnedValue / totalPlannedValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{((totalEarnedValue / totalPlannedValue) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};