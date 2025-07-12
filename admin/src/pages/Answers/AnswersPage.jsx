import { useState, useEffect } from 'react';
import { Search, Eye, Edit, Trash2, Flag, ThumbsUp } from 'lucide-react';

const AnswersPage = () => {
  const [answers, setAnswers] = useState([]);
  const [filteredAnswers, setFilteredAnswers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockAnswers = [
      {
        id: 1,
        content: "You should use JWT tokens stored in httpOnly cookies for better security...",
        author: "Sarah Chen",
        question: "How to implement authentication in React with JWT?",
        votes: 15,
        status: "active",
        createdAt: "2024-01-15"
      },
      {
        id: 2,
        content: "Create a centralized error handling middleware...",
        author: "Mike Johnson",
        question: "Best practices for API error handling in Node.js",
        votes: 8,
        status: "flagged",
        createdAt: "2024-01-14"
      }
    ];
    setAnswers(mockAnswers);
    setFilteredAnswers(mockAnswers);
  }, []);

  useEffect(() => {
    let filtered = [...answers];
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredAnswers(filtered);
  }, [answers, searchQuery]);

  const handleDeleteAnswer = (id) => {
    setAnswers(answers.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Answer Management</h2>
        <p className="text-slate-600">Moderate and manage answers</p>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Answer</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Author</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Question</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Votes</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnswers.map((answer) => (
                <tr key={answer.id} className="table-row border-b border-slate-100">
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-900 max-w-xs truncate">{answer.content}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600">{answer.author}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600 max-w-xs truncate">{answer.question}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{answer.votes}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      answer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {answer.status === 'active' ? 'Active' : 'Flagged'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600">{answer.createdAt}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Flag className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAnswer(answer.id)}
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

export default AnswersPage; 