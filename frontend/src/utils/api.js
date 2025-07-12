const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Handle body serialization
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(errorText, response.status);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message, 0);
  }
}

// Auth API methods
export const authAPI = {
  register: (userData) => apiFetch('/auth/register', {
    method: 'POST',
    body: userData
  }),
  
  login: (credentials) => apiFetch('/auth/login', {
    method: 'POST',
    body: credentials
  }),
  
  me: () => apiFetch('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Questions API methods
export const questionsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/questions${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiFetch(`/questions/${id}`),
  
  create: (questionData) => apiFetch('/questions', {
    method: 'POST',
    body: questionData
  }),
  
  update: (id, questionData) => apiFetch(`/questions/${id}`, {
    method: 'PUT',
    body: questionData
  }),
  
  delete: (id) => apiFetch(`/questions/${id}`, {
    method: 'DELETE'
  }),
  
  vote: (id, voteType) => apiFetch(`/questions/${id}/vote`, {
    method: 'POST',
    body: { voteType }
  })
};

// Answers API methods
export const answersAPI = {
  create: (questionId, answerData) => apiFetch('/answers', {
    method: 'POST',
    body: { ...answerData, questionId }
  }),
  
  update: (id, answerData) => apiFetch(`/answers/${id}`, {
    method: 'PUT',
    body: answerData
  }),
  
  delete: (id) => apiFetch(`/answers/${id}`, {
    method: 'DELETE'
  }),
  
  vote: (id, voteType) => apiFetch(`/answers/${id}/vote`, {
    method: 'POST',
    body: { voteType }
  })
};

// Admin API methods
export const adminAPI = {
  getUsers: () => apiFetch('/admin/users'),
  
  updateUser: (id, userData) => apiFetch(`/admin/users/${id}`, {
    method: 'PUT',
    body: userData
  }),
  
  deleteUser: (id) => apiFetch(`/admin/users/${id}`, {
    method: 'DELETE'
  }),
  
  getStats: () => apiFetch('/admin/stats'),
  
  getQuestions: () => apiFetch('/admin/questions'),
  
  deleteQuestion: (id) => apiFetch(`/admin/questions/${id}`, {
    method: 'DELETE'
  })
}; 