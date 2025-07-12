import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Tag,
  AlertTriangle,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Bell,
  Shield
} from 'lucide-react';

// Import pages
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import UsersPage from './pages/Users/UsersPage';
import QuestionsPage from './pages/Questions/QuestionsPage';
import AnswersPage from './pages/Answers/AnswersPage';
import TagsPage from './pages/Tags/TagsPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';

const navLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Questions', icon: MessageSquare, path: '/questions' },
  { name: 'Answers', icon: BarChart3, path: '/answers' },
  { name: 'Tags', icon: Tag, path: '/tags' },
  { name: 'Reports', icon: AlertTriangle, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

function AdminApp() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 bg-white/90 backdrop-blur-md border-r border-slate-200 shadow-xl ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col min-h-screen`}>
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-gradient">Admin</span>}
          </div>
          <button
            className="p-2 rounded-lg hover:bg-slate-100 transition-all"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 px-2">
          {navLinks.map(({ name, icon: Icon, path }) => (
            <a
              key={name}
              href={path}
              className="flex items-center w-full px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 space-x-4 hover:bg-blue-50 hover:text-blue-700 text-slate-700"
            >
              <Icon className="h-6 w-6" />
              {sidebarOpen && <span>{name}</span>}
            </a>
          ))}
        </nav>
        
        <div className="px-2 pb-6 mt-auto">
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 space-x-4 hover:bg-red-50 hover:text-red-700 text-slate-700"
          >
            <LogOut className="h-6 w-6" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gradient">StackIt Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-slate-600 font-medium">{user?.name || 'Admin'}</span>
              <img
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"}
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
            </div>
          </div>
        </header>
        
        <section className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 min-h-[60vh]">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/answers" element={<AnswersPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AdminApp />
      </Router>
    </AuthProvider>
  );
}

export default App;
