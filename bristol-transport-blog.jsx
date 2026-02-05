import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis, LineChart, Line, ReferenceLine, Legend } from 'recharts';

// Ward data for Transport Disadvantage Index
const wardData = [
  { ward: 'Hartcliffe & Withywood', tdi: 85.9, category: 'high' },
  { ward: 'Lawrence Hill', tdi: 82.8, category: 'high' },
  { ward: 'Bishopsworth', tdi: 74.8, category: 'high' },
  { ward: 'Filwood', tdi: 72.1, category: 'high' },
  { ward: 'Hengrove & Whitchurch', tdi: 71.2, category: 'high' },
  { ward: 'Stockwood', tdi: 69.3, category: 'moderate' },
  { ward: 'Easton', tdi: 68.5, category: 'moderate' },
  { ward: 'Avonmouth & Lawrence Weston', tdi: 67.2, category: 'moderate' },
  { ward: 'Southmead', tdi: 64.9, category: 'moderate' },
  { ward: 'Clifton Down', tdi: 29.1, category: 'low' },
  { ward: 'Clifton', tdi: 28.5, category: 'low' },
  { ward: 'Cotham', tdi: 27.3, category: 'low' },
  { ward: 'Stoke Bishop', tdi: 21.7, category: 'low' },
];

// Correlation data
const correlationData = [
  { name: 'Safety', correlation: -0.86, impact: 'Wards with higher transport poverty have dramatically lower percentages feeling safe after dark' },
  { name: 'Health', correlation: -0.79, impact: 'Transport-poor wards show far lower self-reported health outcomes' },
  { name: 'Food Security', correlation: -0.72, impact: 'Poor transport correlates strongly with food insecurity' },
  { name: 'Mental Wellbeing', correlation: -0.59, impact: 'Transport disadvantage linked to poorer mental health' },
];

// Key stats
const keyStats = [
  { label: 'Community voices heard', value: '180+', icon: '🗣️' },
  { label: 'Bristol wards analysed', value: '34', icon: '📍' },
  { label: 'Gap in feeling safe', value: '52.1%', icon: '🔒' },
  { label: 'Policy recommendations', value: '15', icon: '📋' },
];

const getBarColor = (category) => {
  switch(category) {
    case 'high': return '#dc2626';
    case 'moderate': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6b7280';
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700">
        <p className="font-bold text-lg">{data.ward}</p>
        <p className="text-2xl font-black" style={{ color: getBarColor(data.category) }}>
          {data.tdi}%
        </p>
        <p className="text-slate-400 text-sm">Transport Disadvantage Index</p>
      </div>
    );
  }
  return null;
};

const CorrelationTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 max-w-xs">
        <p className="font-bold text-lg">{data.name}</p>
        <p className="text-2xl font-black text-amber-400">r = {data.correlation}</p>
        <p className="text-slate-300 text-sm mt-2">{data.impact}</p>
      </div>
    );
  }
  return null;
};

export default function BristolTransportBlog() {
  const [activeSection, setActiveSection] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-purple-500/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm border border-purple-500/30">
              Bristol Transport Project
            </span>
            <span className="px-4 py-1.5 bg-amber-500/30 rounded-full text-amber-300 text-sm font-medium backdrop-blur-sm border border-amber-500/30">
              Policy Research
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Transport Justice in Bristol:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
              Who Gets Left Behind?
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            When buses don't run, communities suffer. Our research reveals how Bristol's transport gaps create a two-tier city—and what we can do about it.
          </p>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
            <span>By Ruth Badru & the Bristol Transport Project Team</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </div>
      </header>

      {/* Key Stats Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyStats.map((stat, i) => (
            <div 
              key={i}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 transform transition-all duration-700 ${animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-3xl md:text-4xl font-black text-white mt-2">{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Introduction */}
        <section className="prose prose-lg prose-invert max-w-none mb-16">
          <p className="text-xl text-slate-300 leading-relaxed">
            Bristol prides itself on sustainability and innovation. Yet beneath the surface, a stark divide exists: residents in some neighbourhoods enjoy frequent, reliable public transport, while others are effectively stranded. We set out to understand this gap—not through assumptions, but by listening to the communities most affected.
          </p>
          <p className="text-lg text-slate-400">
            Through town halls, focus groups, surveys, and a policy symposium with council representatives and transport providers, we co-produced this research with over 180 Bristol residents. The findings reveal transport isn't just about getting from A to B—it's about health, safety, jobs, and belonging.
          </p>
        </section>

        {/* The Divide Visualization */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-green-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">The Divide: Transport Disadvantage Across Bristol</h2>
          </div>
          
          <p className="text-slate-400 mb-8">
            We created a Transport Disadvantage Index (TDI) combining transport poverty, service coverage, and exclusion factors. The results show a clear pattern: outer estates and peripheral areas face compounded disadvantage.
          </p>
          
          <div className="bg-slate-800/30 rounded-3xl p-6 md:p-8 border border-slate-700/50">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} />
                  <YAxis type="category" dataKey="ward" tick={{ fill: '#94a3b8', fontSize: 12 }} width={180} axisLine={{ stroke: '#475569' }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <ReferenceLine x={60} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'High disadvantage threshold', fill: '#f59e0b', fontSize: 10 }} />
                  <Bar dataKey="tdi" radius={[0, 8, 8, 0]}>
                    {wardData.map((entry, index) => (
                      <Cell key={index} fill={getBarColor(entry.category)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="text-sm text-slate-400">High Disadvantage (60%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500"></div>
                <span className="text-sm text-slate-400">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                <span className="text-sm text-slate-400">Low Disadvantage</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6">
              <p className="text-red-400 font-medium mb-2">Hartcliffe & Withywood</p>
              <p className="text-4xl font-black text-red-400">85.9%</p>
              <p className="text-slate-400 text-sm mt-2">Highest disadvantage. Limited bus routes, especially evenings. High proportion of non-drivers including elderly and low-income families.</p>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-2xl p-6">
              <p className="text-emerald-400 font-medium mb-2">Stoke Bishop</p>
              <p className="text-4xl font-black text-emerald-400">21.7%</p>
              <p className="text-slate-400 text-sm mt-2">Lowest disadvantage. Affluent area with high car ownership and access to local rail connections.</p>
            </div>
          </div>
        </section>

        {/* Beyond Transport Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">Beyond Buses: Transport Shapes Everything</h2>
          </div>
          
          <p className="text-slate-400 mb-8">
            Our analysis uncovered striking correlations between transport disadvantage and broader quality of life. These aren't coincidences—they reveal how transport systems either connect or isolate communities.
          </p>
          
          <div className="bg-slate-800/30 rounded-3xl p-6 md:p-8 border border-slate-700/50">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={correlationData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <XAxis type="number" domain={[-1, 0]} tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} tickFormatter={(v) => `r = ${v}`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8' }} width={120} axisLine={{ stroke: '#475569' }} />
                  <Tooltip content={<CorrelationTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="correlation" fill="#f59e0b" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Negative correlations: as transport poverty increases, these outcomes worsen</p>
          </div>
          
          <blockquote className="mt-10 border-l-4 border-purple-500 pl-6 py-4 bg-purple-950/20 rounded-r-2xl">
            <p className="text-xl text-slate-300 italic">
              "The city can't all be about the Centre… all those bits around the edges get the least service. Until that changes, people have no option but to use cars – and if you don't have a car then you're a bit scuppered, really."
            </p>
            <cite className="text-slate-500 text-sm mt-2 block">— Town hall participant</cite>
          </blockquote>
        </section>

        {/* What Communities Want */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">What Communities Told Us</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-2xl p-6 border border-purple-800/30">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💷</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Affordability</h3>
              <p className="text-slate-400 text-sm">Fares consume up to 2.69% of income in disadvantaged wards. Residents face impossible choices between transport and essentials.</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/40 to-slate-900/40 rounded-2xl p-6 border border-pink-800/30">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🕐</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Reliability</h3>
              <p className="text-slate-400 text-sm">Buses that nominally exist but don't run evenings or Sundays create "time-based transport deserts" for shift workers and carers.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-900/40 to-slate-900/40 rounded-2xl p-6 border border-amber-800/30">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Safety</h3>
              <p className="text-slate-400 text-sm">A 52-point gap in feeling safe after dark between best and worst-served areas. Poor transport forces vulnerable journeys.</p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">The Path Forward</h2>
          </div>
          
          <p className="text-slate-400 mb-8">
            Through our policy symposium with WECA, Bristol City Council, and transport operators, we refined community-generated solutions into actionable recommendations across three timeframes:
          </p>
          
          <div className="space-y-4">
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-emerald-400">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-400">Immediate: Quick Relief</h3>
                  <p className="text-slate-400 text-sm mt-1">Fare caps, emergency service restoration to worst-affected routes, improved real-time information systems.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-teal-950/30 border border-teal-900/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-400">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-teal-400">Medium-term: Pilot Projects</h3>
                  <p className="text-slate-400 text-sm mt-1">Demand-responsive transport trials, integrated ticketing pilots, community transport partnerships.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-cyan-400">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-cyan-400">Long-term: Structural Reform</h3>
                  <p className="text-slate-400 text-sm mt-1">Permanent Transport Inclusion Forum, cross-department planning integration, equity-focused service standards.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-900/60 via-slate-900/60 to-amber-900/40 rounded-3xl p-8 md:p-12 border border-purple-700/30 text-center">
            <h2 className="text-3xl font-black mb-4">This Research Belongs to Bristol</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Better transport isn't just about transport. It's about safer, healthier, more connected communities. The evidence is clear. The solutions exist. What's needed now is action.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors">
                Read the Full Report
              </a>
              <a href="#" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors">
                Contact the Team
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>
            <strong className="text-slate-400">Bristol Transport Project</strong> • University of Bristol
          </p>
          <p className="mt-2">
            Funded by UKRI Research England through the Enhancing Research Culture Fund
          </p>
          <p className="mt-4">
            Project Lead: Ruth Badru • Contributors: Yue Yin, Satadru Mukherjee, Dorothea Mueller, Melisa Williams Higgins, Emilia Melville, Clara Rayner
          </p>
        </footer>
      </article>
    </div>
  );
}
