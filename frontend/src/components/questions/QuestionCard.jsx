import { Link } from 'react-router-dom'
import { 
  MessageSquare, 
  Eye, 
  ThumbsUp, 
  Clock, 
  User,
  CheckCircle,
  Award,
  TrendingUp,
  Tag
} from 'lucide-react'

const QuestionCard = ({ question, onTagClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="card-hover group">
      <div className="flex gap-6">
        {/* Enhanced Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[80px]">
          <div className="vote-button group-hover:scale-110 transition-transform duration-300">
            <ThumbsUp className="h-6 w-6 mb-1" />
            <span className="text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors duration-300">
              {formatNumber(question.votes)}
            </span>
          </div>
          
          {question.isAnswered && (
            <div className="flex flex-col items-center p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
              <span className="text-xs font-semibold text-green-700">Solved</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Question Title */}
          <Link 
            to={`/question/${question.id}`}
            className="block group-hover:scale-[1.01] transition-transform duration-300"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {question.title}
            </h3>
          </Link>

          {/* Question Content Preview */}
          <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
            {question.content}
          </p>

          {/* Enhanced Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="tag tag-hover"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>

          {/* Enhanced Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={question.author.avatar}
                  alt={question.author.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                {question.author.reputation > 1000 && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                    <Award className="h-3 w-3 text-yellow-800" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors duration-300">
                  {question.author.name}
                </span>
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>{formatNumber(question.author.reputation)} rep</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-1 group-hover:text-blue-600 transition-colors duration-300">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{question.answers} answers</span>
              </div>
              <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                <Eye className="h-4 w-4" />
                <span className="font-medium">{formatNumber(question.views)} views</span>
              </div>
              <div className="flex items-center space-x-1 group-hover:text-green-600 transition-colors duration-300">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatDate(question.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

export default QuestionCard 