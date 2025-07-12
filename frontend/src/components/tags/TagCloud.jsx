import { Tag, TrendingUp, Hash } from 'lucide-react'

const TagCloud = ({ onTagClick, selectedTag }) => {
  // Mock data - replace with actual API call
  const popularTags = [
    { name: 'react', count: 1250, color: 'from-blue-500 to-cyan-500' },
    { name: 'javascript', count: 980, color: 'from-yellow-500 to-orange-500' },
    { name: 'nodejs', count: 750, color: 'from-green-500 to-emerald-500' },
    { name: 'python', count: 680, color: 'from-blue-600 to-indigo-600' },
    { name: 'typescript', count: 520, color: 'from-blue-700 to-purple-700' },
    { name: 'postgresql', count: 420, color: 'from-blue-400 to-indigo-400' },
    { name: 'docker', count: 380, color: 'from-blue-600 to-cyan-600' },
    { name: 'aws', count: 320, color: 'from-orange-500 to-red-500' },
    { name: 'git', count: 280, color: 'from-orange-600 to-red-600' },
    { name: 'mongodb', count: 250, color: 'from-green-600 to-emerald-600' },
    { name: 'vue', count: 220, color: 'from-green-500 to-teal-500' },
    { name: 'angular', count: 180, color: 'from-red-500 to-pink-500' }
  ]

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="floating-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Tag className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Popular Tags</h3>
          <p className="text-sm text-slate-500">Most used tags this week</p>
        </div>
      </div>

      <div className="space-y-3">
        {popularTags.map((tag, index) => (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] ${
              selectedTag === tag.name
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg ring-2 ring-blue-500/30'
                : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Background decoration */}
            <div className={`absolute inset-0 bg-gradient-to-r ${tag.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedTag === tag.name 
                    ? 'bg-white/20' 
                    : 'bg-gradient-to-r from-slate-200 to-slate-300 group-hover:from-slate-300 group-hover:to-slate-400'
                }`}>
                  <Hash className={`h-4 w-4 ${
                    selectedTag === tag.name ? 'text-white' : 'text-slate-600'
                  }`} />
                </div>
                <div className="text-left">
                  <div className={`font-semibold text-sm ${
                    selectedTag === tag.name ? 'text-white' : 'text-slate-800'
                  }`}>
                    {tag.name}
                  </div>
                  <div className={`text-xs ${
                    selectedTag === tag.name ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {formatNumber(tag.count)} questions
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center space-x-1 ${
                selectedTag === tag.name ? 'text-white/80' : 'text-slate-400'
              }`}>
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">
                  {Math.floor(Math.random() * 50) + 10}%
                </span>
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* View All Tags Button */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group">
          <div className="flex items-center justify-center space-x-2">
            <span>View All Tags</span>
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xs font-bold">→</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default TagCloud 