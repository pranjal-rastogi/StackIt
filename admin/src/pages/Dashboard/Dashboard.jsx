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
  Zap
} from 'lucide-react';

const Dashboard = () => {
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

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock recent activity data
    const mockActivity = [
      {
        id: 1,
        type: 'user_joined',
        message: 'New user Sarah Chen joined',
        time: '2 minutes ago',
        icon: Users,
        color: 'text-blue-600'
      },
      {
        id: 2,
        type: 'question_flagged',
        message: 'Question flagged for inappropriate content',
        time: '5 minutes ago',
        icon: AlertTriangle,
        color: 'text-red-600'
      },
      {
        id: 3,
        type: 'user_banned',
        message: 'User John Doe banned for spam',
        time: '10 minutes ago',
        icon: Users,
        color: 'text-red-600'
      },
      {
        id: 4,
        type: 'question_answered',
        message: 'Popular question got 5 new answers',
        time: '15 minutes ago',
        icon: MessageSquare,
        color: 'text-green-600'
      }
    ];
    setRecentActivity(mockActivity);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="card">
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

  const QuickAction = ({ title, description, icon: Icon, color, onClick }) => (
    <button
      onClick={onClick}
      className="card hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Monitor your StackIt platform activity</p>
      </div>

      {/* Stats Grid */}
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

      {/* Today's Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
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
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
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
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
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

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <QuickAction
              title="Review Flagged Content"
              description="Check and moderate reported posts"
              icon={AlertTriangle}
              color="text-red-600"
              onClick={() => window.location.href = '/reports'}
            />
            <QuickAction
              title="Manage Users"
              description="View, ban, or edit user accounts"
              icon={Users}
              color="text-blue-600"
              onClick={() => window.location.href = '/users'}
            />
            <QuickAction
              title="Moderate Questions"
              description="Review and manage questions"
              icon={MessageSquare}
              color="text-purple-600"
              onClick={() => window.location.href = '/questions'}
            />
            <QuickAction
              title="Site Settings"
              description="Update platform configuration"
              icon={Zap}
              color="text-yellow-600"
              onClick={() => window.location.href = '/settings'}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="card">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 