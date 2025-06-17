import React from 'react';
import { AlertTriangle, Shield, TrendingDown, User } from 'lucide-react';
import { Risk, Resource } from '../../types';

interface RiskAssessmentProps {
  risks: Risk[];
  resources: Resource[];
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ risks, resources }) => {
  const getRagStatusColor = (status: string) => {
    switch (status) {
      case 'red': return 'bg-red-500 text-white border-red-600';
      case 'amber': return 'bg-amber-500 text-white border-amber-600';
      case 'green': return 'bg-emerald-500 text-white border-emerald-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getRagStatusBg = (status: string) => {
    switch (status) {
      case 'red': return 'bg-red-50 border-red-200';
      case 'amber': return 'bg-amber-50 border-amber-200';
      case 'green': return 'bg-emerald-50 border-emerald-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskScore = (probability: number, impact: number) => {
    return (probability * impact) / 100;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'Critical', color: 'text-red-600' };
    if (score >= 50) return { level: 'High', color: 'text-amber-600' };
    if (score >= 30) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-emerald-600' };
  };

  const getResourceName = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource ? resource.name : 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const ragCounts = risks.reduce((acc, risk) => {
    acc[risk.ragStatus] = (acc[risk.ragStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Shield size={24} className="mr-2 text-blue-600" />
          Risk Assessment
        </h2>
        <div className="text-sm text-gray-500">
          {risks.length} identified risks
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-700">Total Risks</div>
          <div className="text-2xl font-bold text-gray-900">{risks.length}</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="text-sm font-medium text-red-700">Critical</div>
          <div className="text-2xl font-bold text-red-900">{ragCounts.red || 0}</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="text-sm font-medium text-amber-700">High</div>
          <div className="text-2xl font-bold text-amber-900">{ragCounts.amber || 0}</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="text-sm font-medium text-emerald-700">Low</div>
          <div className="text-2xl font-bold text-emerald-900">{ragCounts.green || 0}</div>
        </div>
      </div>

      <div className="space-y-4">
        {risks.map((risk) => {
          const riskScore = getRiskScore(risk.probability, risk.impact);
          const riskLevel = getRiskLevel(riskScore);
          
          return (
            <div key={risk.id} className={`rounded-lg p-4 border-2 ${getRagStatusBg(risk.ragStatus)} hover:shadow-sm transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{risk.title}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full border ${getRagStatusColor(risk.ragStatus)}`}>
                      {risk.ragStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{risk.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">
                      {risk.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${riskLevel.color} bg-white`}>
                      {riskLevel.level} Risk
                    </span>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Risk Score</div>
                  <div className={`text-2xl font-bold ${riskLevel.color}`}>
                    {riskScore.toFixed(0)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-md p-3 border border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <TrendingDown size={14} className="mr-1" />
                    Probability
                  </div>
                  <div className="text-lg font-semibold">{risk.probability}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${risk.probability}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-md p-3 border border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <AlertTriangle size={14} className="mr-1" />
                    Impact
                  </div>
                  <div className="text-lg font-semibold">{risk.impact}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: `${risk.impact}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-md p-3 border border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <User size={14} className="mr-1" />
                    Owner
                  </div>
                  <div className="text-sm font-semibold">{getResourceName(risk.owner)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Since {formatDate(risk.dateIdentified)}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-1">Mitigation Plan</div>
                <div className="text-sm text-gray-600">{risk.mitigationPlan}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};