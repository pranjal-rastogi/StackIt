import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  MessageSquare, 
  ThumbsUp, 
  Eye,
  Settings,
  Edit,
  Save,
  X
} from 'lucide-react'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  })
  const [stats, setStats] = useState({
    questions: 12,
    answers: 45,
    votes: 234,
    views: 12500
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockActivity = [
      {
        id: 1,
        type: 'question',
        title: 'How to implement authentication in React with JWT?',
        date: '2024-01-15T10:30:00Z',
        votes: 15
      },
      {
        id: 2,
        type: 'answer',
        title: 'Best practices for API error handling in Node.js',
        date: '2024-01-14T15:45:00Z',
        votes: 8
      },
      {
        id: 3,
        type: 'question',
        title: 'Optimizing database queries in PostgreSQL',
        date: '2024-01-13T09:20:00Z',
        votes: 23
      }
    ]
    setRecentActivity(mockActivity)
  }, [])

  const handleEdit = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || ''
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    // Mock API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          Authentication Required
        </h2>
        <p className="text-secondary-600">
          Please log in to view your profile.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Profile
        </h1>
        <p className="text-secondary-600">
          Manage your account and view your activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-secondary-100"
              />
              
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field text-center font-semibold"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-1"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-outline flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                    {user.name}
                  </h2>
                  <p className="text-secondary-600 mb-4">
                    {user.bio || "No bio yet. Click edit to add one!"}
                  </p>
                  <button
                    onClick={handleEdit}
                    className="btn-outline flex items-center space-x-1 mx-auto"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-secondary-400" />
                  <span className="text-sm text-secondary-600">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-secondary-400" />
                  <span className="text-sm text-secondary-600">
                    Joined {formatDate('2024-01-01')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-secondary-400" />
                  <span className="text-sm text-secondary-600">
                    {user.reputation} reputation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {stats.questions}
              </div>
              <div className="text-sm text-secondary-600">Questions</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {stats.answers}
              </div>
              <div className="text-sm text-secondary-600">Answers</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.votes}
              </div>
              <div className="text-sm text-secondary-600">Votes</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {stats.views}
              </div>
              <div className="text-sm text-secondary-600">Views</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    {activity.type === 'question' ? (
                      <MessageSquare className="h-5 w-5 text-primary-600" />
                    ) : (
                      <ThumbsUp className="h-5 w-5 text-accent-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-secondary-500">
                      <span className="capitalize">{activity.type}</span>
                      <span>{formatDate(activity.date)}</span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{activity.votes}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Account Settings
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="font-medium text-secondary-900">Change Password</div>
                <div className="text-sm text-secondary-600">Update your account password</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="font-medium text-secondary-900">Notification Preferences</div>
                <div className="text-sm text-secondary-600">Manage your notification settings</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="font-medium text-secondary-900">Privacy Settings</div>
                <div className="text-sm text-secondary-600">Control your privacy and data</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 