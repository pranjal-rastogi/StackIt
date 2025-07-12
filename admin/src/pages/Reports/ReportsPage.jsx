import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye, Clock, User, MessageSquare } from 'lucide-react';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');

  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        type: 'question',
        title: 'How to hack into a system?',
        author: 'John Doe',
        reporter: 'Sarah Chen',
        reason: 'Inappropriate content',
        status: 'pending',
        createdAt: '2024-01-20',
        description: 'This question promotes illegal activities and should be removed.'
      },
      {
        id: 2,
        type: 'answer',
        title: 'Best practices for API error handling in Node.js',
        author: 'Mike Johnson',
        reporter: 'Alex Rodriguez',
        reason: 'Spam',
        status: 'resolved',
        createdAt: '2024-01-19',
        description: 'This answer contains promotional links and spam content.'
      },
      {
        id: 3,
        type: 'user',
        title: 'User: spammer123',
        author: 'spammer123',
        reporter: 'Emma Wilson',
        reason: 'Spam user',
        status: 'pending',
        createdAt: '2024-01-18',
        description: 'This user is posting spam content across multiple questions.'
      }
    ];
    setReports(mockReports);
    setFilteredReports(mockReports.filter(r => r.status === 'pending'));
  }, []);

  useEffect(() => {
    let filtered = [...reports];
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    setFilteredReports(filtered);
  }, [reports, statusFilter]);

  const handleResolveReport = (id, action) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending', icon: Clock },
      resolved: { color: 'bg-green-100 text-green-800', text: 'Resolved', icon: CheckCircle }
    };
    const Icon = config[status].icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status].color} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{config[status].text}</span>
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      question: MessageSquare,
      answer: MessageSquare,
      user: User
    };
    const Icon = icons[type];
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Content Reports</h2>
          <p className="text-slate-600">Review and moderate flagged content</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(report.type)}
                    <span className="text-sm text-slate-500 capitalize">{report.type}</span>
                    {getStatusBadge(report.status)}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">{report.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>Author: {report.author}</span>
                    <span>Reported by: {report.reporter}</span>
                    <span>Reason: {report.reason}</span>
                    <span>{report.createdAt}</span>
                  </div>
                </div>
              </div>
              {report.status === 'pending' && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleResolveReport(report.id, 'approve')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleResolveReport(report.id, 'reject')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="card text-center py-12">
          <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No reports found</h3>
          <p className="text-slate-600">All reports have been reviewed and resolved.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage; 