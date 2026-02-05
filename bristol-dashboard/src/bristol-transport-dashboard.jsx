import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ChevronDown, ChevronUp, AlertCircle, TrendingUp, TrendingDown, MapPin, Activity, Heart, Shield, DollarSign } from 'lucide-react';

// Embedded ward data - completely self-contained
const WARD_DATA = [
  { ward: "Hartcliffe & Withywood", tdi: 85.9, goodHealth: 73.7, lifeSat: 53.9, poorMentalWB: 35.9, transportPoverty: 2.69, safeAfterDark: 31.717, foodInsec: 0, priority: "Highest Priority", color: "#DC2626", lostProductivity: 28.6, qolUplift: 28.0, accessibilityGap: 78 },
  { ward: "Lawrence Hill", tdi: 82.8, goodHealth: 82.7, lifeSat: 57.1, poorMentalWB: 18.4, transportPoverty: 2.35, safeAfterDark: 41.683, foodInsec: 0, priority: "Highest Priority", color: "#DC2626", lostProductivity: 27.4, qolUplift: 26.8, accessibilityGap: 74 },
  { ward: "Filwood", tdi: 72.1, goodHealth: 78.3, lifeSat: 64.5, poorMentalWB: 22.5, transportPoverty: 2.62, safeAfterDark: 42.550, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 23.8, qolUplift: 23.7, accessibilityGap: 72 },
  { ward: "Bishopsworth", tdi: 59.9, goodHealth: 83.3, lifeSat: 73.5, poorMentalWB: 20.5, transportPoverty: 2.76, safeAfterDark: 59.883, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 22.4, qolUplift: 24.3, accessibilityGap: 70 },
  { ward: "Easton", tdi: 68.1, goodHealth: 79.5, lifeSat: 65.5, poorMentalWB: 24.9, transportPoverty: 2.16, safeAfterDark: 54.800, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 20.1, qolUplift: 21.8, accessibilityGap: 68 },
  { ward: "Southmead", tdi: 71.9, goodHealth: 76.3, lifeSat: 59.2, poorMentalWB: 22.6, transportPoverty: 2.38, safeAfterDark: 47.033, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 20.7, qolUplift: 21.0, accessibilityGap: 64 },
  { ward: "Stockwood", tdi: 69.3, goodHealth: 0, lifeSat: 0, poorMentalWB: 0, transportPoverty: 0, safeAfterDark: 0, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 22.1, qolUplift: 22.0, accessibilityGap: 70 },
  { ward: "Knowle", tdi: 66.1, goodHealth: 0, lifeSat: 0, poorMentalWB: 0, transportPoverty: 0, safeAfterDark: 0, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 19.3, qolUplift: 19.1, accessibilityGap: 66 },
  { ward: "Avonmouth & Lawrence Weston", tdi: 63.7, goodHealth: 77.5, lifeSat: 54.1, poorMentalWB: 18.6, transportPoverty: 2.23, safeAfterDark: 60.333, foodInsec: 0, priority: "High-Need, High-Potential", color: "#DC2626", lostProductivity: 19.2, qolUplift: 20.5, accessibilityGap: 62 },
  { ward: "Hillfields", tdi: 66.5, goodHealth: 82.4, lifeSat: 64.6, poorMentalWB: 22.4, transportPoverty: 2.38, safeAfterDark: 44.950, foodInsec: 0, priority: "Moderate Need", color: "#F59E0B", lostProductivity: 17.9, qolUplift: 16.4, accessibilityGap: 60 },
  { ward: "Eastville", tdi: 71.2, goodHealth: 82.3, lifeSat: 62.2, poorMentalWB: 21.6, transportPoverty: 2.41, safeAfterDark: 56.067, foodInsec: 0, priority: "Moderate Need", color: "#F59E0B", lostProductivity: 16.5, qolUplift: 15.4, accessibilityGap: 56 },
  { ward: "Brislington East", tdi: 58.7, goodHealth: 76.4, lifeSat: 0, poorMentalWB: 0, transportPoverty: 0, safeAfterDark: 0, foodInsec: 0, priority: "Moderate Need", color: "#F59E0B", lostProductivity: 17.6, qolUplift: 13.5, accessibilityGap: 52 },
  { ward: "Bedminster", tdi: 52.5, goodHealth: 90.7, lifeSat: 73.3, poorMentalWB: 14.9, transportPoverty: 1.83, safeAfterDark: 70.717, foodInsec: 0, priority: "Moderate Need", color: "#F59E0B", lostProductivity: 11.5, qolUplift: 11.2, accessibilityGap: 48 },
  { ward: "Central", tdi: 81.9, goodHealth: 75.9, lifeSat: 56.5, poorMentalWB: 24.4, transportPoverty: 2.21, safeAfterDark: 55.500, foodInsec: 0, priority: "Latent Demand", color: "#3B82F6", lostProductivity: 9.4, qolUplift: 7.7, accessibilityGap: 28 },
  { ward: "Horfield", tdi: 46.3, goodHealth: 0, lifeSat: 0, poorMentalWB: 0, transportPoverty: 0, safeAfterDark: 0, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 13.8, qolUplift: 10.1, accessibilityGap: 40 },
  { ward: "Southville", tdi: 45.1, goodHealth: 83.5, lifeSat: 70.0, poorMentalWB: 14.6, transportPoverty: 1.71, safeAfterDark: 68.633, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 10.1, qolUplift: 8.8, accessibilityGap: 34 },
  { ward: "Redland", tdi: 39.1, goodHealth: 84.4, lifeSat: 77.1, poorMentalWB: 15.9, transportPoverty: 1.58, safeAfterDark: 77.400, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 7.2, qolUplift: 5.5, accessibilityGap: 26 },
  { ward: "Clifton", tdi: 51.5, goodHealth: 91.8, lifeSat: 67.7, poorMentalWB: 22.3, transportPoverty: 1.59, safeAfterDark: 81.750, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 5.7, qolUplift: 4.1, accessibilityGap: 22 },
  { ward: "Clifton Down", tdi: 56.2, goodHealth: 93.4, lifeSat: 80.5, poorMentalWB: 7.0, transportPoverty: 1.57, safeAfterDark: 83.767, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 5.1, qolUplift: 3.8, accessibilityGap: 20 },
  { ward: "Cotham", tdi: 60.1, goodHealth: 91.0, lifeSat: 69.9, poorMentalWB: 11.5, transportPoverty: 1.79, safeAfterDark: 74.333, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 5.9, qolUplift: 4.0, accessibilityGap: 24 },
  { ward: "Bishopston & Ashley Down", tdi: 55.4, goodHealth: 91.6, lifeSat: 75.4, poorMentalWB: 11.9, transportPoverty: 1.66, safeAfterDark: 77.883, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 9.1, qolUplift: 6.0, accessibilityGap: 42 },
  { ward: "Stoke Bishop", tdi: 44.0, goodHealth: 95.6, lifeSat: 80.8, poorMentalWB: 10.3, transportPoverty: 1.44, safeAfterDark: 74.400, foodInsec: 0, priority: "Stable", color: "#10B981", lostProductivity: 5.0, qolUplift: 4.2, accessibilityGap: 20 }
];

// Correlation data
const CORRELATIONS = [
  { vars: "Transport Poverty → % Good Health", r: -0.790, strength: "Very Strong" },
  { vars: "TDI → % Good Health", r: -0.745, strength: "Strong" },
  { vars: "Transport Poverty → % Feel Safe After Dark", r: -0.864, strength: "Very Strong" },
  { vars: "Transport Exclusion → % Fear of Crime Affects Life", r: 0.760, strength: "Strong" },
  { vars: "Transport Poverty → % Poor Mental Wellbeing", r: 0.590, strength: "Moderate" },
  { vars: "Transport Poverty → % Life Satisfaction", r: -0.583, strength: "Moderate" }
];

// Policy scenario impacts
const SCENARIO_IMPACTS = {
  comprehensive: {
    name: "Comprehensive Mix",
    description: "Poverty -15% (worst quartile) + Exclusion -15% citywide + TDI -10% + Eliminate deserts",
    impacts: [
      { metric: "% Feel Safe After Dark", change: 5.11, unit: "pp" },
      { metric: "% Satisfied with Life", change: 3.39, unit: "pp" },
      { metric: "% Good Health", change: 1.33, unit: "pp" },
      { metric: "% Poor Mental Wellbeing", change: -3.13, unit: "pp" },
      { metric: "Food Insecurity (Mod+Severe)", change: -2.37, unit: "pp" },
      { metric: "% Victim of Crime", change: -1.68, unit: "pp" }
    ]
  },
  povertyReduction: {
    name: "Target Transport Poverty",
    description: "Reduce poverty 20% in worst-quartile wards",
    impacts: [
      { metric: "% Feel Safe After Dark", change: 2.59, unit: "pp" },
      { metric: "% Satisfied with Life", change: 1.56, unit: "pp" },
      { metric: "% Good Health", change: 1.22, unit: "pp" },
      { metric: "% Poor Mental Wellbeing", change: -1.42, unit: "pp" }
    ]
  },
  exclusionReduction: {
    name: "Cut Exclusion Citywide",
    description: "Reduce exclusion score 15% across all wards",
    impacts: [
      { metric: "% Feel Safe After Dark", change: 2.52, unit: "pp" },
      { metric: "% Satisfied with Life", change: 2.34, unit: "pp" },
      { metric: "Food Insecurity", change: -1.01, unit: "pp" }
    ]
  }
};

const BristolTransportDashboard = () => {
  const [selectedScenario, setSelectedScenario] = useState('comprehensive');
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('tdi');

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const validWards = WARD_DATA.filter(w => w.goodHealth > 0);
    const avgGoodHealth = validWards.reduce((sum, w) => sum + w.goodHealth, 0) / validWards.length;
    const avgTDI = WARD_DATA.reduce((sum, w) => sum + w.tdi, 0) / WARD_DATA.length;
    const highPriorityCount = WARD_DATA.filter(w => w.priority === "Highest Priority" || w.priority === "High-Need, High-Potential").length;
    
    return {
      avgGoodHealth: avgGoodHealth.toFixed(1),
      avgTDI: avgTDI.toFixed(1),
      healthGap: (95.6 - 73.7).toFixed(1), // Stoke Bishop vs Hartcliffe
      highPriorityCount
    };
  }, []);

  // Sort wards
  const sortedWards = useMemo(() => {
    return [...WARD_DATA].sort((a, b) => {
      switch(sortBy) {
        case 'tdi': return b.tdi - a.tdi;
        case 'health': return a.goodHealth - b.goodHealth;
        case 'productivity': return b.lostProductivity - a.lostProductivity;
        default: return 0;
      }
    });
  }, [sortBy]);

  const topWorstWards = sortedWards.slice(0, 5);
  const topBestWards = [...sortedWards].reverse().slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-8 border-blue-600">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Bristol Transport Disadvantage Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Quantifying the health, safety, and economic costs of inadequate transport infrastructure
          </p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">32 Wards Analyzed</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">90+ Outcome Metrics</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">R² up to 0.84</span>
          </div>
        </div>

        {/* Key Findings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 opacity-80" />
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{summaryStats.healthGap}pp</div>
            <div className="text-red-100 text-sm">Health gap between best and worst wards</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 opacity-80" />
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">-0.86</div>
            <div className="text-orange-100 text-sm">Correlation: Transport poverty → Feeling unsafe</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">+5.11pp</div>
            <div className="text-blue-100 text-sm">Projected safety improvement (comprehensive reform)</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 opacity-80" />
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{summaryStats.highPriorityCount}</div>
            <div className="text-purple-100 text-sm">High-priority wards needing urgent intervention</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {['overview', 'correlations', 'scenarios', 'wards'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab 
                    ? 'border-b-4 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Transport Disadvantage by Ward</h2>
                  <p className="text-gray-600 mb-6">
                    The Transport Disadvantage Index (TDI) combines structural inadequacy, affordability barriers, 
                    physical accessibility issues, and perceived exclusion into a single 0-100 score.
                  </p>
                  
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={sortedWards} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="ward" 
                        angle={-45} 
                        textAnchor="end" 
                        height={100}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis label={{ value: 'Transport Disadvantage Index (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        formatter={(value) => [value.toFixed(1), 'TDI']}
                      />
                      <Bar dataKey="tdi" radius={[8, 8, 0, 0]}>
                        {sortedWards.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Health Outcomes vs Transport Poverty</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="transportPoverty" 
                          name="Transport Poverty"
                          label={{ value: 'Transport Poverty (%)', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="goodHealth" 
                          name="Good Health"
                          label={{ value: '% in Good Health', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value) => value.toFixed(1)}
                          contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        />
                        <Scatter 
                          data={WARD_DATA.filter(w => w.goodHealth > 0)} 
                          fill="#3B82F6"
                          shape="circle"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-2">r = -0.79, p &lt; 0.001</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Safety vs Transport Poverty</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="transportPoverty" 
                          name="Transport Poverty"
                          label={{ value: 'Transport Poverty (%)', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="safeAfterDark" 
                          name="Feel Safe"
                          label={{ value: '% Feel Safe After Dark', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value) => value.toFixed(1)}
                          contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        />
                        <Scatter 
                          data={WARD_DATA.filter(w => w.safeAfterDark > 0)} 
                          fill="#EF4444"
                          shape="circle"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-2">r = -0.86, p &lt; 0.001</p>
                  </div>
                </div>
              </div>
            )}

            {/* CORRELATIONS TAB */}
            {activeTab === 'correlations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Transport-Outcome Correlations</h2>
                  <p className="text-gray-600 mb-6">
                    These are the strongest statistical relationships found in the data. All correlations shown are statistically significant (p &lt; 0.001).
                  </p>
                </div>

                {CORRELATIONS.map((corr, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{corr.vars}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        Math.abs(corr.r) > 0.8 ? 'bg-red-100 text-red-800' :
                        Math.abs(corr.r) > 0.6 ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {corr.strength}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            corr.r < 0 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}
                          style={{ width: `${Math.abs(corr.r) * 100}%` }}
                        />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 w-20 text-right">
                        {corr.r.toFixed(3)}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Insight</h3>
                  <p className="text-blue-800">
                    The correlation between transport poverty and feeling safe after dark (r = -0.86) is 
                    remarkably strong, suggesting transport infrastructure and safety perceptions are deeply 
                    intertwined. This isn't coincidental—poor transport clusters with unsafe built environments.
                  </p>
                </div>
              </div>
            )}

            {/* SCENARIOS TAB */}
            {activeTab === 'scenarios' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Scenario Modeling</h2>
                  <p className="text-gray-600 mb-6">
                    These projections use regression coefficients to estimate the impact of specific transport interventions. 
                    All changes are expressed in percentage points (pp).
                  </p>
                </div>

                <div className="flex gap-4 mb-6">
                  {Object.keys(SCENARIO_IMPACTS).map(key => (
                    <button
                      key={key}
                      onClick={() => setSelectedScenario(key)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedScenario === key
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {SCENARIO_IMPACTS[key].name}
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {SCENARIO_IMPACTS[selectedScenario].name}
                  </h3>
                  <p className="text-gray-700">
                    {SCENARIO_IMPACTS[selectedScenario].description}
                  </p>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={SCENARIO_IMPACTS[selectedScenario].impacts}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 200, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" label={{ value: 'Change (percentage points)', position: 'insideBottom', offset: -10 }} />
                    <YAxis 
                      type="category" 
                      dataKey="metric" 
                      width={190}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value > 0 ? '+' : ''}${value.toFixed(2)} pp`, 'Impact']}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                    <Bar dataKey="change" radius={[0, 8, 8, 0]}>
                      {SCENARIO_IMPACTS[selectedScenario].impacts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.change > 0 ? '#10B981' : '#EF4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Positive Changes</h4>
                    </div>
                    <p className="text-sm text-green-800">
                      Improved health, safety, and life satisfaction across multiple wards
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-900">Reduced Harms</h4>
                    </div>
                    <p className="text-sm text-red-800">
                      Lower mental health problems, crime, and food insecurity
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">Economic Gains</h4>
                    </div>
                    <p className="text-sm text-purple-800">
                      Reduced productivity losses and financial hardship
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* WARDS TAB */}
            {activeTab === 'wards' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Ward-Level Comparison</h2>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700"
                  >
                    <option value="tdi">Sort by TDI</option>
                    <option value="health">Sort by Health</option>
                    <option value="productivity">Sort by Lost Productivity</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                      <TrendingDown className="w-6 h-6" />
                      Top 5 Highest Disadvantage
                    </h3>
                    {topWorstWards.map((ward, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-red-50 to-white rounded-lg p-4 mb-3 border-l-4 border-red-500">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{ward.ward}</h4>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${ward.color}20`, color: ward.color }}>
                              {ward.priority}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">{ward.tdi.toFixed(1)}</div>
                            <div className="text-xs text-gray-600">TDI Score</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                          <div>
                            <div className="text-gray-600">Health</div>
                            <div className="font-semibold">{ward.goodHealth > 0 ? `${ward.goodHealth.toFixed(1)}%` : 'N/A'}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Lost Prod.</div>
                            <div className="font-semibold">{ward.lostProductivity.toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Access Gap</div>
                            <div className="font-semibold">{ward.accessibilityGap}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      Top 5 Lowest Disadvantage
                    </h3>
                    {topBestWards.map((ward, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-white rounded-lg p-4 mb-3 border-l-4 border-green-500">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{ward.ward}</h4>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${ward.color}20`, color: ward.color }}>
                              {ward.priority}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{ward.tdi.toFixed(1)}</div>
                            <div className="text-xs text-gray-600">TDI Score</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                          <div>
                            <div className="text-gray-600">Health</div>
                            <div className="font-semibold">{ward.goodHealth > 0 ? `${ward.goodHealth.toFixed(1)}%` : 'N/A'}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Lost Prod.</div>
                            <div className="font-semibold">{ward.lostProductivity.toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Access Gap</div>
                            <div className="font-semibold">{ward.accessibilityGap}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 mt-8">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-3">Priority Investment Matrix</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="tdi" 
                        name="Current Disadvantage"
                        label={{ value: 'Transport Disadvantage Index', position: 'insideBottom', offset: -10 }}
                        domain={[0, 100]}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="qolUplift" 
                        name="Improvement Potential"
                        label={{ value: 'QoL Uplift Potential (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                <p className="font-bold text-gray-900 mb-2">{data.ward}</p>
                                <p className="text-sm text-gray-600">TDI: {data.tdi.toFixed(1)}</p>
                                <p className="text-sm text-gray-600">QoL Uplift: {data.qolUplift.toFixed(1)}%</p>
                                <p className="text-sm text-gray-600">Priority: {data.priority}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter data={WARD_DATA} shape="circle">
                        {WARD_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 justify-center mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-600"></div>
                      <span>Highest Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <span>Moderate Need</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span>Latent Demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-600"></div>
                      <span>Stable</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-gray-300 rounded-xl p-6 text-center">
          <p className="text-sm mb-2">
            <strong>Data Source:</strong> Bristol Transport Project — Ward-level analysis combining transport metrics, 
            Quality of Life Survey 2023, health outcomes, crime/safety data, and economic indicators
          </p>
          <p className="text-xs text-gray-400">
            All correlations shown are statistically significant. Policy scenarios use OLS regression coefficients 
            for projection. This dashboard is fully self-contained and embeddable.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BristolTransportDashboard;
