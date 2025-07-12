import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { questionsAPI } from '../utils/api'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  Tag,
  User,
  Calendar,
  Sparkles,
  Zap,
  Award,
  BookOpen
} from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  const popularTags = [
    { name: "react", count: 1250, color: "primary" },
    { name: "javascript", count: 980, color: "warning" },
    { name: "nodejs", count: 750, color: "success" },
    { name: "python", count: 650, color: "accent" },
    { name: "css", count: 520, color: "secondary" },
    { name: "database", count: 480, color: "error" },
    { name: "aws", count: 420, color: "primary" },
    { name: "docker", count: 380, color: "success" }
  ]

  useEffect(() => {
    setLoading(true)
    // Only show dummy data, ignore API
    const dummyQuestions = [
      {
        id: 1,
        title: 'How to implement authentication in React with JWT?',
        content: 'I\'m building a React app and need to implement user authentication using JWT tokens. What\'s the best practice?',
        tags: ['react', 'jwt', 'authentication'],
        votes: 12,
        views: 320,
        answers: 3,
        isAnswered: true,
        isHot: true,
        createdAt: '2024-07-01T10:00:00Z',
        author: {
          name: 'Emma Wilson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
          reputation: 1650
        },
        userVote: 0
      },
      {
        id: 2,
        title: 'How to center a div using CSS Flexbox?',
        content: 'I\'m struggling to center a div both vertically and horizontally using Flexbox. Can someone provide a simple example?',
        tags: ['css', 'flexbox', 'frontend'],
        votes: 8,
        views: 210,
        answers: 2,
        isAnswered: false,
        isHot: false,
        createdAt: '2024-07-02T14:30:00Z',
        author: {
          name: 'Liam Smith',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liam',
          reputation: 980
        },
        userVote: 0
      },
      {
        id: 3,
        title: 'Best way to handle async/await errors in Node.js?',
        content: 'What\'s the recommended way to handle errors when using async/await in Node.js? Should I always use try/catch?',
        tags: ['nodejs', 'async', 'error-handling'],
        votes: 15,
        views: 450,
        answers: 5,
        isAnswered: true,
        isHot: true,
        createdAt: '2024-07-03T09:15:00Z',
        author: {
          name: 'Sophia Lee',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophia',
          reputation: 2100
        },
        userVote: 0
      }
    ];
    setQuestions(dummyQuestions);
    setLoading(false);
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() })
    }
  }

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getTagColor = (tagName) => {
    const tag = popularTags.find(t => t.name === tagName)
    return tag ? tag.color : 'secondary'
  }

  // --- Voting Handler ---
  const handleVote = async (questionId, voteType) => {
    if (!user) return;
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id !== questionId) return q;
      // Optimistic update
      let newVotes = q.votes;
      let newUserVote = q.userVote || 0;
      if (voteType === 'up') {
        if (newUserVote === 1) {
          newVotes -= 1;
          newUserVote = 0;
        } else {
          newVotes += (newUserVote === -1 ? 2 : 1);
          newUserVote = 1;
        }
      } else if (voteType === 'down') {
        if (newUserVote === -1) {
          newVotes += 1;
          newUserVote = 0;
        } else {
          newVotes -= (newUserVote === 1 ? 2 : 1);
          newUserVote = -1;
        }
      }
      return { ...q, votes: newVotes, userVote: newUserVote };
    }));
    try {
      await questionsAPI.vote(questionId, voteType);
    } catch (err) {
      // On error, revert
      setQuestions(prevQuestions => prevQuestions.map(q => {
        if (q.id !== questionId) return q;
        // No way to know previous state, so just reload or show error in real app
        return { ...q };
      }));
    }
  };

  // Compute filtered and sorted questions
  const filteredQuestions = questions
    .filter(q => {
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = q.title.toLowerCase().includes(query);
        const inContent = q.content.toLowerCase().includes(query);
        const inTags = q.tags.some(tag => tag.toLowerCase().includes(query));
        const inAuthor = q.author.name.toLowerCase().includes(query);
        if (!(inTitle || inContent || inTags || inAuthor)) return false;
      }
      // Filter by selected tags
      if (selectedTags.length > 0) {
        if (!selectedTags.every(tag => q.tags.includes(tag))) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'popular') {
        return b.views - a.views;
      } else if (sortBy === 'unanswered') {
        return a.answers - b.answers;
      } else if (sortBy === 'votes') {
        return b.votes - a.votes;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="container-responsive py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
          Welcome to StackIt
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          The modern Q&A platform for developers. Ask questions, share knowledge, and grow together.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="search-container flex items-center bg-white rounded-2xl border-2 border-border-primary shadow-sm px-2 py-1">
            <Search className="ml-2 h-7 w-7 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search for questions, tags, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-3 rounded-2xl focus:ring-0 focus:outline-none"
            />
            <button type="submit" className="btn-primary ml-2 h-12 px-8 rounded-2xl text-base font-semibold flex items-center justify-center">
              Search
            </button>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="card-neu text-center p-4">
            <div className="text-2xl font-bold text-primary-600 mb-2">1,234</div>
            <div className="text-sm text-text-secondary">Questions</div>
          </div>
          <div className="card-neu text-center p-4">
            <div className="text-2xl font-bold text-success-600 mb-2">5,678</div>
            <div className="text-sm text-text-secondary">Answers</div>
          </div>
          <div className="card-neu text-center p-4">
            <div className="text-2xl font-bold text-accent-600 mb-2">890</div>
            <div className="text-sm text-text-secondary">Users</div>
          </div>
          <div className="card-neu text-center p-4">
            <div className="text-2xl font-bold text-warning-600 mb-2">156</div>
            <div className="text-sm text-text-secondary">Tags</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Filters and Sort */}
          <div className="card-glass mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-text-primary">Questions</h2>
                {selectedTags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Filtered by:</span>
                    {selectedTags.map(tag => (
                      <span key={tag} className={`tag tag-${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-text-tertiary" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field py-2 px-3 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="unanswered">Unanswered</option>
                    <option value="votes">Most Voted</option>
                  </select>
                </div>
                
                {user && (
                  <Link to="/ask" className="btn-primary">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Ask Question
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="card text-center py-12 text-text-secondary">
                No questions found.
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <div key={question.id} className="card hover-lift animate-fade-in">
                  <div className="flex gap-6">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2 min-w-16">
                      <button 
                        className={`vote-button group${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!user}
                        title={!user ? 'Please log in to vote' : ''}
                        onClick={() => handleVote(question.id, 'up')}
                      >
                        <ThumbsUp className={`h-5 w-5 transition-colors duration-200 ${
                          question.userVote === 1 ? 'text-success-600' : 'text-text-tertiary group-hover:text-success-600'
                        }`} />
                      </button>
                      <span className="font-semibold text-text-primary">{question.votes}</span>
                      <button 
                        className={`vote-button group${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!user}
                        title={!user ? 'Please log in to vote' : ''}
                        onClick={() => handleVote(question.id, 'down')}
                      >
                        <ThumbsDown className={`h-5 w-5 transition-colors duration-200 ${
                          question.userVote === -1 ? 'text-error-600' : 'text-text-tertiary group-hover:text-error-600'
                        }`} />
                      </button>
                      {question.isAnswered && (
                        <div className="mt-2">
                          <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-text-primary hover:text-primary-600 transition-colors duration-200">
                          <Link to={`/question/${question.id}`}>
                            {question.title}
                          </Link>
                        </h3>
                        {question.isHot && (
                          <span className="badge badge-warning">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Hot
                          </span>
                        )}
                      </div>
                      
                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {question.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`tag tag-${getTagColor(tag)} ${
                              selectedTags.includes(tag) ? 'ring-2 ring-primary-500' : ''
                            }`}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </button>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-text-tertiary">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{question.answers} answers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{question.views} views</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <img
                            src={question.author.avatar}
                            alt={question.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="font-medium text-text-secondary">{question.author.name}</span>
                          <span className="text-xs">•</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(question.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Popular Tags */}
          <div className="card-glass">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Popular Tags
            </h3>
            <div className="space-y-2">
              {popularTags.map(tag => (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-secondary-100 ${
                    selectedTags.includes(tag.name) ? 'bg-primary-50 text-primary-700' : 'text-text-secondary'
                  }`}
                >
                  <span className="font-medium">{tag.name}</span>
                  <span className="text-xs bg-secondary-200 text-secondary-700 px-2 py-1 rounded-full">
                    {tag.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-glass">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/ask" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Ask Question</span>
              </Link>
              <Link to="/tags" className="btn-outline w-full inline-flex items-center justify-center gap-2">
                <Tag className="h-4 w-4" />
                <span>Browse Tags</span>
              </Link>
              <Link to="/users" className="btn-outline w-full inline-flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                <span>View Users</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-glass">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">New question about React hooks</p>
                  <p className="text-xs text-text-tertiary">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">Question marked as answered</p>
                  <p className="text-xs text-text-tertiary">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">New user joined the community</p>
                  <p className="text-xs text-text-tertiary">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 