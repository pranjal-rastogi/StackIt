import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questionsAPI } from '../../utils/api'
import { 
  ArrowLeft, 
  Tag, 
  AlertCircle, 
  CheckCircle,
  X
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleTagInput = (e) => {
    setTagInput(e.target.value)
  }

  const addTag = (e) => {
    e.preventDefault()
    const tag = tagInput.trim().toLowerCase()
    
    if (!tag) return
    
    if (formData.tags.length >= 5) {
      setError('You can only add up to 5 tags')
      return
    }
    
    if (formData.tags.includes(tag)) {
      setError('This tag already exists')
      return
    }
    
    if (tag.length < 2) {
      setError('Tags must be at least 2 characters long')
      return
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }))
    setTagInput('')
    setError('')
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.title.trim()) {
      setError('Please enter a title for your question')
      setLoading(false)
      return
    }

    if (!formData.content.trim()) {
      setError('Please enter the content of your question')
      setLoading(false)
      return
    }

    if (formData.tags.length === 0) {
      setError('Please add at least one tag')
      setLoading(false)
      return
    }

    try {
      // Call the real backend API
      await questionsAPI.create({
        title: formData.title,
        description: formData.content,
        tags: formData.tags
      })
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to post question. Please try again.');
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          Authentication Required
        </h2>
        <p className="text-secondary-600 mb-6">
          You need to be logged in to ask a question.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Ask a Question
            </h1>
            <p className="text-secondary-600">
              Share your knowledge and help others learn
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="card mb-6 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800">
              Question posted successfully! Redirecting to home page...
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="What's your question? Be specific."
              maxLength={300}
            />
            <p className="mt-1 text-xs text-secondary-500">
              {formData.title.length}/300 characters
            </p>
          </div>

          {/* Content Field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-secondary-700 mb-2">
              Details *
            </label>
            <textarea
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="input-field resize-none"
              placeholder="Provide all the information someone would need to answer your question. You can use markdown formatting."
            />
            <div className="mt-2 flex items-center justify-between text-xs text-secondary-500">
              <span>Use markdown for formatting</span>
              <span>{formData.content.length} characters</span>
            </div>
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Tags *
            </label>
            <div className="space-y-3">
              {/* Tag Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(e); } }}
                    className="input-field pl-10"
                    placeholder="Add a tag (e.g., react, javascript, nodejs)"
                    maxLength={20}
                  />
                </div>
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-secondary whitespace-nowrap"
                >
                  Add Tag
                </button>
              </div>

              {/* Tags Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-secondary-500">
                Add up to 5 tags to help others find your question. Tags should be relevant and specific.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-secondary-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting...
                </div>
              ) : (
                'Post Question'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="card mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">Writing a good question</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Be specific and provide context</li>
          <li>• Include code examples if relevant</li>
          <li>• Explain what you've already tried</li>
          <li>• Use clear and descriptive language</li>
          <li>• Add relevant tags to help others find your question</li>
        </ul>
      </div>
    </div>
  )
}

export default AskQuestion 