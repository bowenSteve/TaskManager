import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  X,
  ChevronDown,
  Zap,
  Calendar,
  Timer,
  Pause,
  Play
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerDuration, setTimerDuration] = useState(0);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', badge: null },
    { id: 'projects', icon: FolderKanban, label: 'Projects', badge: '3' },
    { id: 'team', icon: Users, label: 'Team', badge: null },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
    { id: 'calendar', icon: Calendar, label: 'Calendar', badge: '2' },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null }
  ];

  // Simulate timer functionality
  useEffect(() => {
    let interval;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (activeTimer) {
      setActiveTimer(null);
    } else {
      setActiveTimer('Authentication Bug Fix');
      setTimerDuration(0);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50 backdrop-blur-xl
        transform transition-all duration-300 ease-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-72 lg:relative lg:translate-x-0
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg tracking-tight">TaskFlow</h1>
                <p className="text-slate-400 text-xs">Project Alpha</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Timer Card */}
        {activeTimer && (
          <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">ACTIVE TIMER</span>
              </div>
              <button
                onClick={toggleTimer}
                className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-slate-700/50 transition-colors"
              >
                <Pause className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white font-medium text-sm mb-1">{activeTimer}</p>
            <p className="text-cyan-300 font-mono text-lg font-bold">{formatTime(timerDuration)}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl
                    transition-all duration-200 ease-out group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-blue-500/40 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs font-bold rounded-full
                      ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-600 text-slate-300'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="mx-4 mt-8">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3 px-4">Quick Actions</p>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm">New Task</span>
            </button>
            <button 
              onClick={toggleTimer}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors"
            >
              <Timer className="w-4 h-4" />
              <span className="text-sm">Start Timer</span>
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/30 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">John Doe</p>
              <p className="text-slate-400 text-xs truncate">Lead Developer</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;