import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Eye, 
  Clock, 
  User,
  CheckCircle,
  Share,
  Bookmark,
  Flag,
  Send,
  ArrowLeft
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { questionsAPI, answersAPI } from '../../utils/api'

const QuestionDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockQuestion = {
      id: parseInt(id),
      title: "How to implement authentication in React with JWT?",
      content: `I'm building a React application and need to implement user authentication using JWT tokens. I've been researching different approaches but I'm not sure which one is the best practice.

Here's what I'm trying to achieve:
- User login/logout functionality
- Protected routes
- Token refresh mechanism
- Secure token storage

I've seen different approaches:
1. Using localStorage
2. Using httpOnly cookies
3. Using sessionStorage

What's the recommended approach for a production React application? Are there any security considerations I should be aware of?

Here's my current implementation:

\`\`\`javascript
// Login component
const handleLogin = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};
\`\`\`

Is this approach secure enough for production?`,
      author: {
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        reputation: 1250
      },
      tags: ["react", "javascript", "authentication", "jwt"],
      votes: 15,
      views: 1250,
      createdAt: "2024-01-15T10:30:00Z",
      isAnswered: true,
      userVote: 0 // Add userVote property
    }

    const mockAnswers = [
      {
        id: 1,
        content: `Great question! For production React applications, I recommend using httpOnly cookies instead of localStorage for JWT storage. Here's why:

**Security Benefits:**
- httpOnly cookies are not accessible via JavaScript, protecting against XSS attacks
- Automatic token transmission with requests
- Better CSRF protection

**Implementation:**

\`\`\`javascript
// Backend (Node.js/Express)
app.post('/api/login', (req, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  res.json({ success: true });
});

// Frontend
const handleLogin = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important!
    body: JSON.stringify(credentials)
  });
  // Token is automatically handled by the browser
};
\`\`\`

**For protected routes, use a custom hook:**

\`\`\`javascript
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/me', {
        credentials: 'include'
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
};
\`\`\`

This approach is much more secure than localStorage and is the recommended pattern for production applications.`,
        author: {
          name: "Alex Rodriguez",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          reputation: 2100
        },
        votes: 23,
        createdAt: "2024-01-15T11:30:00Z",
        isAccepted: true,
        comments: [],
        userVote: 0 // Add userVote property
      },
      {
        id: 2,
        content: `I agree with Alex's answer about httpOnly cookies. However, if you must use localStorage (for some specific reason), here are some additional security measures:

1. **Token Expiration**: Always set short expiration times
2. **Refresh Tokens**: Implement refresh token rotation
3. **Token Validation**: Validate tokens on both client and server

\`\`\`javascript
// Token refresh example
const refreshToken = async () => {
  try {
    const response = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      const { newToken } = await response.json();
      localStorage.setItem('token', newToken);
    }
  } catch (error) {
    // Handle refresh failure - redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};
\`\`\`

But honestly, just use httpOnly cookies as Alex suggested. It's the industry standard for a reason.`,
        author: {
          name: "Emma Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
          reputation: 1650
        },
        votes: 12,
        createdAt: "2024-01-15T13:00:00Z",
        isAccepted: false,
        comments: [],
        userVote: 0 // Add userVote property
      }
    ]

    setQuestion(mockQuestion)
    setAnswers(mockAnswers)
    setLoading(false)
  }, [id])

  // --- Voting Handler ---
  const handleVote = async (type, itemId, itemType) => {
    if (!user) return;
    if (itemType === 'question') {
      setQuestion(prev => {
        if (!prev) return prev;
        let newVotes = prev.votes;
        let newUserVote = prev.userVote || 0;
        if (type === 'up') {
          if (newUserVote === 1) {
            newVotes -= 1;
            newUserVote = 0;
          } else {
            newVotes += (newUserVote === -1 ? 2 : 1);
            newUserVote = 1;
          }
        } else if (type === 'down') {
          if (newUserVote === -1) {
            newVotes += 1;
            newUserVote = 0;
          } else {
            newVotes -= (newUserVote === 1 ? 2 : 1);
            newUserVote = -1;
          }
        }
        return { ...prev, votes: newVotes, userVote: newUserVote };
      });
      try {
        await questionsAPI.vote(itemId, type);
      } catch (err) {
        // Optionally revert or show error
      }
    } else if (itemType === 'answer') {
      setAnswers(prevAnswers => prevAnswers.map(a => {
        if (a.id !== itemId) return a;
        let newVotes = a.votes;
        let newUserVote = a.userVote || 0;
        if (type === 'up') {
          if (newUserVote === 1) {
            newVotes -= 1;
            newUserVote = 0;
          } else {
            newVotes += (newUserVote === -1 ? 2 : 1);
            newUserVote = 1;
          }
        } else if (type === 'down') {
          if (newUserVote === -1) {
            newVotes += 1;
            newUserVote = 0;
          } else {
            newVotes -= (newUserVote === 1 ? 2 : 1);
            newUserVote = -1;
          }
        }
        return { ...a, votes: newVotes, userVote: newUserVote };
      }));
      try {
        await answersAPI.vote(itemId, type);
      } catch (err) {
        // Optionally revert or show error
      }
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    if (!newAnswer.trim()) return

    setSubmitting(true)
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAnswerObj = {
        id: answers.length + 1,
        content: newAnswer,
        author: {
          name: user.name,
          avatar: user.avatar,
          reputation: user.reputation
        },
        votes: 0,
        createdAt: new Date().toISOString(),
        isAccepted: false,
        comments: [],
        userVote: 0 // Add userVote property
      }
      
      setAnswers(prev => [newAnswerObj, ...prev])
      setNewAnswer('')
    } catch (error) {
      console.error('Failed to submit answer:', error)
    } finally {
      setSubmitting(false)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❓</div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          Question not found
        </h2>
        <p className="text-secondary-600 mb-6">
          The question you're looking for doesn't exist or has been removed.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
            <Share className="h-4 w-4" />
          </button>
          <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="p-2 text-secondary-600 hover:text-red-600 transition-colors duration-200">
            <Flag className="h-4 w-4" />
          </button>
          {/* Delete Button: Only show if user is author */}
          {user && question && user.name === question.author.name && (
            <button
              className="p-2 text-error-600 hover:bg-error-50 rounded-xl border border-error-200 ml-2"
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this question?')) {
                  try {
                    await questionsAPI.delete(question.id);
                    navigate('/');
                  } catch (err) {
                    alert('Failed to delete question.');
                  }
                }
              }}
              title="Delete this question"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <div className="flex gap-4">
          {/* Voting */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <button 
              onClick={() => handleVote('up', question.id, 'question')}
              className={`vote-button${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
              disabled={!user}
              title={!user ? 'Please log in to vote' : ''}
            >
              <ThumbsUp className={`h-5 w-5 ${question.userVote === 1 ? 'text-success-600' : 'text-text-tertiary'}`} />
            </button>
            <span className="text-lg font-semibold text-secondary-900">
              {question.votes}
            </span>
            <button 
              onClick={() => handleVote('down', question.id, 'question')}
              className={`vote-button${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
              disabled={!user}
              title={!user ? 'Please log in to vote' : ''}
            >
              <ThumbsDown className={`h-5 w-5 ${question.userVote === -1 ? 'text-error-600' : 'text-text-tertiary'}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-secondary-900 mb-4">
              {question.title}
            </h1>
            
            <div className="prose prose-sm max-w-none mb-6">
              <pre className="whitespace-pre-wrap text-sm text-secondary-700 bg-secondary-50 p-4 rounded-lg overflow-x-auto">
                {question.content}
              </pre>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-secondary-500 pt-4 border-t border-secondary-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{answers.length} answers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{question.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(question.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={question.author.avatar}
                    alt={question.author.name}
                    className="h-6 w-6 rounded-full border border-secondary-200"
                  />
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium text-secondary-700">
                      {question.author.name}
                    </span>
                    <span className="text-xs bg-secondary-100 px-1.5 py-0.5 rounded">
                      {question.author.reputation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        
        <div className="space-y-6">
          {answers.map((answer) => (
            <div key={answer.id} className="card">
              <div className="flex gap-4">
                {/* Voting */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <button 
                    onClick={() => user ? handleVote('up', answer.id, 'answer') : navigate('/login')}
                    className={`vote-button${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!user}
                    title={!user ? 'Please log in to vote' : ''}
                  >
                    <ThumbsUp className={`h-5 w-5 ${answer.userVote === 1 ? 'text-success-600' : 'text-text-tertiary'}`} />
                  </button>
                  <span className="text-lg font-semibold text-secondary-900">
                    {answer.votes}
                  </span>
                  <button 
                    onClick={() => user ? handleVote('down', answer.id, 'answer') : navigate('/login')}
                    className={`vote-button${!user ? ' opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!user}
                    title={!user ? 'Please log in to vote' : ''}
                  >
                    <ThumbsDown className={`h-5 w-5 ${answer.userVote === -1 ? 'text-error-600' : 'text-text-tertiary'}`} />
                  </button>
                  
                  {answer.isAccepted && (
                    <div className="mt-2 p-1 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="prose prose-sm max-w-none mb-4">
                    <pre className="whitespace-pre-wrap text-sm text-secondary-700 bg-secondary-50 p-4 rounded-lg overflow-x-auto">
                      {answer.content}
                    </pre>
                  </div>

                  {/* Comments */}
                  {answer.comments.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {answer.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2 p-2 bg-secondary-50 rounded-lg">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                            alt={comment.author}
                            className="h-6 w-6 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-secondary-700">
                                {comment.author}
                              </span>
                              <span className="text-xs text-secondary-500">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-secondary-600 mt-1">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 input-field text-sm"
                    />
                    <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-200 text-sm text-secondary-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(answer.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src={answer.author.avatar}
                        alt={answer.author.name}
                        className="h-6 w-6 rounded-full border border-secondary-200"
                      />
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span className="font-medium text-secondary-700">
                          {answer.author.name}
                        </span>
                        <span className="text-xs bg-secondary-100 px-1.5 py-0.5 rounded">
                          {answer.author.reputation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Answer */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Your Answer
        </h3>
        
        {!user ? (
          <div className="text-center py-8">
            <p className="text-secondary-600 mb-4">
              Please log in to post an answer.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={8}
              className="input-field resize-none"
              placeholder="Write your answer here. You can use markdown formatting."
              required
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-secondary-500">
                Use markdown for formatting
              </p>
              <button
                type="submit"
                disabled={submitting || !newAnswer.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  'Post Answer'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default QuestionDetail 