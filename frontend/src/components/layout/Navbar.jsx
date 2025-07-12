import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ThemeToggle } from '../../contexts/ThemeContext'
import { 
  Menu, 
  X, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  Bell,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@stackit.com'

  return (
    <nav className="glass-effect sticky top-0 z-50 backdrop-blur-md border-b border-border-primary">
      <div className="container-responsive">
        <div className="flex items-center h-16">
          {/* Logo - moved to far left */}
          <Link to="/" className="flex items-center space-x-3 group mr-8">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient">StackIt</span>
              <span className="text-xs text-text-tertiary -mt-1">Developer Q&A</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <Zap className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/ask" 
              className={`nav-link ${isActive('/ask') ? 'active' : ''}`}
            >
              <Sparkles className="h-5 w-5" />
              <span>Ask Question</span>
            </Link>
            {/* Removed Tags and Users buttons */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                <Shield className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="search-container">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    3
                  </span>
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-border-primary shadow-xl rounded-2xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4">
                      <h4 className="font-semibold text-text-primary mb-3">Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-text-secondary">Your question got a new answer</p>
                            <p className="text-xs text-text-tertiary">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                          <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-text-secondary">You earned 15 reputation points</p>
                            <p className="text-xs text-text-tertiary">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* User Avatar */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 hover:bg-secondary-100 rounded-xl transition-all duration-300">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    />
                    <span className="font-medium text-text-primary">{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-48 card-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:bg-secondary-100 transition-colors duration-200"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link 
                        to="/settings" 
                        className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:bg-secondary-100 transition-colors duration-200"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:bg-secondary-100 transition-colors duration-200"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <hr className="my-2 border-border-primary" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-error-600 hover:bg-error-50 w-full transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 card-glass rounded-xl mt-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <div className="search-container">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Zap className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link 
                to="/ask" 
                className={`mobile-nav-link ${isActive('/ask') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-5 w-5" />
                <span>Ask Question</span>
              </Link>
              {/* Removed Tags and Users buttons */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`mobile-nav-link ${isActive('/admin') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Mobile User Menu */}
              {user ? (
                <>
                  <hr className="my-2 border-border-primary" />
                  <Link 
                    to="/profile" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/settings" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mobile-nav-link text-error-600 hover:bg-error-50 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2 border-border-primary" />
                  <Link 
                    to="/login" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 