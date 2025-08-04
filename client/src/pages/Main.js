import React, { useState } from 'react';
import { 
  Bell,
  Search,
  Plus,
  Menu,
  Target,
  Play,
  Pause,
  Timer
} from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Import your Sidebar component

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickTimerActive, setQuickTimerActive] = useState(false);
  const [quickTimerDuration, setQuickTimerDuration] = useState(0);

  const stats = [
    { label: 'Active Tasks', value: '24', change: '+12%', color: 'from-blue-500 to-cyan-400' },
    { label: 'Hours Today', value: '6.5', change: '+0.5h', color: 'from-green-500 to-emerald-400' },
    { label: 'Team Velocity', value: '82%', change: '+5%', color: 'from-purple-500 to-pink-400' },
    { label: 'Sprint Progress', value: '67%', change: '+23%', color: 'from-orange-500 to-red-400' }
  ];

  const recentTasks = [
    { id: 1, title: 'Implement user authentication', assignee: 'Sarah J.', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Design dashboard wireframes', assignee: 'Mike C.', status: 'Review', priority: 'Medium' },
    { id: 3, title: 'Setup MongoDB schema', assignee: 'Alex R.', status: 'Completed', priority: 'High' },
    { id: 4, title: 'Create React components', assignee: 'Lisa M.', status: 'In Progress', priority: 'Medium' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Review': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleQuickTimer = () => {
    setQuickTimerActive(!quickTimerActive);
    if (!quickTimerActive) {
      setQuickTimerDuration(0);
    }
  };

  // Quick timer effect
  React.useEffect(() => {
    let interval;
    if (quickTimerActive) {
      interval = setInterval(() => {
        setQuickTimerDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quickTimerActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        
        {/* Top Header */}
        <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/30 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h1>
                  <p className="text-slate-400 text-sm">Welcome back, let's get productive</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tasks, projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Create Button */}
                <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:border-slate-600/50 hover:shadow-xl hover:shadow-slate-900/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Quick Timer & Team Activity */}
            <div className="space-y-6">
              
              {/* Quick Timer */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">Quick Timer</h2>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-mono font-bold text-white mb-2">
                    {formatTime(quickTimerDuration)}
                  </div>
                  {quickTimerActive && (
                    <p className="text-slate-400 text-sm">Working on current task</p>
                  )}
                </div>
                
                <button
                  onClick={toggleQuickTimer}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200 ${
                    quickTimerActive 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white'
                  }`}
                >
                  {quickTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{quickTimerActive ? 'Stop Timer' : 'Start Timer'}</span>
                </button>
              </div>

              {/* Team Activity */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">Team Activity</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      SM
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">Sarah completed <span className="text-blue-400">Auth System</span></p>
                      <p className="text-slate-400 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      MC
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">Mike started timer on <span className="text-blue-400">UI Components</span></p>
                      <p className="text-slate-400 text-xs">5 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      LD
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">Lisa moved <span className="text-blue-400">Design Review</span> to Done</p>
                      <p className="text-slate-400 text-xs">12 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Recent Tasks */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Tasks</h2>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                    View all
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="group">
                      <div className="flex items-center space-x-4 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-600/50">
                        <div className={`w-1 h-12 ${getPriorityColor(task.priority)} rounded-full`}></div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium text-sm mb-1 group-hover:text-blue-300 transition-colors">
                            {task.title}
                          </h3>
                          <p className="text-slate-400 text-xs">Assigned to {task.assignee}</p>
                        </div>
                        
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;