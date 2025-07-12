import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Flag, CheckCircle, Clock } from 'lucide-react';
import { adminAPI } from '../../utils/api';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getQuestions();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (err) {
      setQuestions([]);
      setFilteredQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let filtered = [...questions];
    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.author?.username || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(q => q.status === statusFilter);
    }
    setFilteredQuestions(filtered);
  }, [questions, searchQuery, statusFilter]);

  const handleDeleteQuestion = async (id) => {
    await adminAPI.deleteQuestion(id);
    fetchQuestions();
  };

  const handleFlagQuestion = async (id) => {
    // Implement flag API if available, else just re-fetch
    fetchQuestions();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Question Management</h2>
          <p className="text-slate-600">Moderate and manage questions</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Question</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Author</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Stats</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Tags</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="table-row border-b border-slate-100">
                  <td className="py-4 px-4">
                    <p className="font-medium text-slate-900">{question.title}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600">{question.author?.username}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {question.status === 'active' ? 'Active' : 'Flagged'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-slate-600">{question.votes} votes</p>
                      <p className="text-slate-600">{question.answers} answers</p>
                      <p className="text-slate-600">{question.views} views</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {question.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600">{question.createdAt}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleFlagQuestion(question.id)}
                        className={`p-2 rounded-lg ${
                          question.flagged 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Flag className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
};

export default QuestionsPage; 