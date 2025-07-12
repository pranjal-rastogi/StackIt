import { Link } from 'react-router-dom'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  Sparkles,
  Zap,
  Shield,
  Users,
  BookOpen
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-effect border-t border-border-primary mt-16">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
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
            <p className="text-text-secondary mb-6 leading-relaxed">
              The modern Q&A platform for developers. Ask questions, share knowledge, and grow together in a supportive community.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="mailto:contact@stackit.com" 
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/ask" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Ask Question
                </Link>
              </li>
              <li>
                <Link 
                  to="/tags" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Browse Tags
                </Link>
              </li>
              <li>
                <Link 
                  to="/users" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/help" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="/feedback" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Feedback
                </a>
              </li>
              <li>
                <a 
                  href="/bug-report" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Report Bug
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/privacy" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/cookies" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="/code-of-conduct" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Code of Conduct
                </a>
              </li>
              <li>
                <a 
                  href="/licenses" 
                  className="text-text-secondary hover:text-primary-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-primary mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-text-secondary">
              <span>© {currentYear} StackIt. Made with</span>
              <Heart className="h-4 w-4 text-error-500 animate-pulse" />
              <span>for developers.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-tertiary">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 