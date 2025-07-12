import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  ThumbsUp,
  Clock,
  Activity,
  Zap,
  Search,
  Filter,
  MoreVertical,
  Ban,
  UserCheck,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Shield,
  Plus,
  Tag,
  Save,
  Globe,
  Bell,
  Database,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalQuestions: 2345,
    totalAnswers: 3456,
    flaggedContent: 23,
    activeUsers: 456,
    newUsersToday: 12,
    questionsToday: 34,
    answersToday: 67
  });

  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [tags, setTags] = useState([]);
  const [reports, setReports] = useState([]);
  const [settings, setSettings] = useState({
    siteName: 'StackIt',
    siteDescription: 'A modern Q&A platform for developers',
    allowRegistration: true,
    requireEmailVerification: true,
    maxQuestionsPerDay: 5,
    maxAnswersPerDay: 10,
    enableModeration: true,
    autoFlagKeywords: ['spam', 'inappropriate', 'offensive'],
    emailNotifications: true,
    maintenanceMode: false
  });

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock users data
    const mockUsers = [
      {
        id: 1,
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        role: 'user',
        status: 'active',
        reputation: 1250,
        questions: 15,
        answers: 45,
        joinedDate: '2024-01-15',
        lastActive: '2024-01-20'
      },
      {
        id: 2,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
        role: 'user',
        status: 'banned',
        reputation: 890,
        questions: 8,
        answers: 23,
        joinedDate: '2024-01-10',
        lastActive: '2024-01-18'
      }
    ];

    // Mock questions data
    const mockQuestions = [
      {
        id: 1,
        title: "How to implement authentication in React with JWT?",
        author: "Sarah Chen",
        status: "active",
        votes: 15,
        answers: 8,
        views: 1250,
        tags: ["react", "javascript", "authentication"],
        createdAt: "2024-01-15",
        flagged: false
      },
      {
        id: 2,
        title: "Best practices for API error handling in Node.js",
        author: "Mike Johnson",
        status: "flagged",
        votes: 23,
        answers: 12,
        views: 2100,
        tags: ["nodejs", "api", "error-handling"],
        createdAt: "2024-01-14",
        flagged: true
      }
    ];

    // Mock tags data
    const mockTags = [
      {
        id: 1,
        name: 'react',
        description: 'React.js framework and ecosystem',
        color: '#61DAFB',
        questions: 234,
        followers: 1234
      },
      {
        id: 2,
        name: 'javascript',
        description: 'JavaScript programming language',
        color: '#F7DF1E',
        questions: 456,
        followers: 2345
      }
    ];

    // Mock reports data
    const mockReports = [
      {
        id: 1,
        type: 'question',
        title: 'How to hack into a system?',
        author: 'John Doe',
        reporter: 'Sarah Chen',
        reason: 'Inappropriate content',
        status: 'pending',
        createdAt: '2024-01-20',
        description: 'This question promotes illegal activities and should be removed.'
      }
    ];

    setUsers(mockUsers);
    setQuestions(mockQuestions);
    setTags(mockTags);
    setReports(mockReports);
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-white/95">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Monitor your StackIt platform activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="text-blue-600"
          change={12}
        />
        <StatCard
          title="Total Questions"
          value={stats.totalQuestions.toLocaleString()}
          icon={MessageSquare}
          color="text-purple-600"
          change={8}
        />
        <StatCard
          title="Total Answers"
          value={stats.totalAnswers.toLocaleString()}
          icon={BarChart3}
          color="text-green-600"
          change={15}
        />
        <StatCard
          title="Flagged Content"
          value={stats.flaggedContent}
          icon={AlertTriangle}
          color="text-red-600"
          change={-5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">New Users Today</p>
              <p className="text-2xl font-bold text-blue-900">{stats.newUsersToday}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Questions Today</p>
              <p className="text-2xl font-bold text-purple-900">{stats.questionsToday}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Answers Today</p>
              <p className="text-2xl font-bold text-green-900">{stats.answersToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-600">Manage user accounts and permissions</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <Mail className="h-4 w-4 mr-2" />
          Send Announcement
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">User</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Reputation</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'user' ? 'bg-blue-100 text-blue-800' : 
                      user.role === 'moderator' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'banned' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">{user.reputation}</p>
                      <p className="text-slate-500">{user.questions} Q • {user.answers} A</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Site Settings</h2>
        <p className="text-slate-600">Configure your StackIt platform</p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              rows="3"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700">Allow User Registration</label>
              <p className="text-sm text-slate-500">Allow new users to register accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({...settings, allowRegistration: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-6 border-t border-slate-200">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'questions', name: 'Questions', icon: MessageSquare },
    { id: 'tags', name: 'Tags', icon: Tag },
    { id: 'reports', name: 'Reports', icon: AlertTriangle },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/90 backdrop-blur-md border-r border-slate-200 shadow-xl flex flex-col min-h-screen">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Admin</span>
            </div>
          </div>
          
          <nav className="flex-1 space-y-2 px-2">
            {tabs.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center w-full px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 space-x-4 ${
                  activeTab === id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-blue-50 hover:text-blue-700 text-slate-700'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">StackIt Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 font-medium">Admin User</span>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
            </div>
          </header>
          
          <section className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 min-h-[60vh]">
            {renderContent()}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 