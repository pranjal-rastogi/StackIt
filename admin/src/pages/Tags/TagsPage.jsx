import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', description: '', color: '#3B82F6' });

  useEffect(() => {
    const mockTags = [
      {
        id: 1,
        name: 'react',
        description: 'React.js framework and ecosystem',
        color: '#61DAFB',
        questions: 234,
        followers: 1234
      },
      {
        id: 2,
        name: 'javascript',
        description: 'JavaScript programming language',
        color: '#F7DF1E',
        questions: 456,
        followers: 2345
      },
      {
        id: 3,
        name: 'nodejs',
        description: 'Node.js runtime environment',
        color: '#339933',
        questions: 123,
        followers: 567
      }
    ];
    setTags(mockTags);
    setFilteredTags(mockTags);
  }, []);

  useEffect(() => {
    let filtered = [...tags];
    if (searchQuery) {
      filtered = filtered.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTags(filtered);
  }, [tags, searchQuery]);

  const handleAddTag = () => {
    if (newTag.name && newTag.description) {
      const tag = {
        id: Date.now(),
        ...newTag,
        questions: 0,
        followers: 0
      };
      setTags([...tags, tag]);
      setNewTag({ name: '', description: '', color: '#3B82F6' });
      setShowAddModal(false);
    }
  };

  const handleDeleteTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tag Management</h2>
          <p className="text-slate-600">Manage and organize content tags</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <div key={tag.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: tag.color }}
                >
                  <Tag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">#{tag.name}</h3>
                  <p className="text-sm text-slate-600">{tag.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteTag(tag.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">{tag.questions} questions</span>
              <span className="text-slate-600">{tag.followers} followers</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tag Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Add New Tag</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tag Name</label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., react, javascript"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Describe what this tag is for..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                <input
                  type="color"
                  value={newTag.color}
                  onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                  className="w-full h-10 rounded-lg border-2 border-slate-200"
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddTag}
                  className="btn-primary flex-1"
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsPage; 