# 📌 Problem Statement  
**StackIt – Minimal Q&A Forum Platform**

---

# 👥 Team Details

**Team Leader:**  
Pranjal Rastogi  
Email: pranjalrastogi9829@gmail.com

**Team Member 1:**  
Pulkit Tank  
Email: tank.pulkit@gmail.com

**Team Member 2:**  
Mohit Raj Purohit  
Email: mohitrajpurohit7575@gmail.com

A modern, full-stack Q&A forum application built with React, Node.js, and MongoDB. Features include user authentication, question/answer management, voting system, and an admin panel.

## 🏗️ Architecture

```
StackIt/
├── frontend/          # React + Vite + Tailwind CSS (User Interface)
├── admin/            # React + Vite + Tailwind CSS (Admin Panel)
└── backend/          # Node.js + Express + MongoDB (API Server)
```

## 🚀 Features

### User Features
- 🔐 User authentication (register/login)
- 📝 Ask and answer questions
- 🏷️ Tag-based question organization
- 👍 Vote on questions and answers
- 👤 User profiles
- 🌙 Dark/Light theme toggle
- 📱 Responsive design

### Admin Features
- 👥 User management
- 📊 Dashboard with statistics
- ❓ Question moderation
- 🗑️ Content deletion
- 📈 Analytics overview

### Technical Features
- 🔒 JWT authentication
- 🛡️ Security middleware (Helmet, Rate Limiting, CORS)
- ✅ Input validation
- 📝 Comprehensive error handling
- 🗄️ MongoDB with Mongoose
- ⚡ Fast development with Vite

## 🛠️ Tech Stack

### Frontend & Admin
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Joi** - Validation
- **Helmet** - Security headers
- **Rate Limiting** - API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd StackIt
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:5000/api" > .env

npm run dev
```

### 4. Admin Setup
```bash
cd admin
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:5000/api" > .env

npm run dev
```

### 5. Create Admin User
```bash
cd backend
node -e "
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@stackit.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
"
```

## 🌐 Access Points

After setup, access the applications at:
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:5000

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/stackit
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Frontend/Admin (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StackIt
```

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Deploy to your preferred platform

### Frontend/Admin Deployment
1. Build the applications: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production API URL

### Deployment Options
- **Vercel**: Great for frontend and serverless functions
- **Netlify**: Excellent for static sites
- **Heroku**: Good for full-stack applications
- **AWS**: EC2, ECS, or Lambda
- **DigitalOcean**: App Platform or Droplets

## 📁 Project Structure

```
StackIt/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── admin/
│   ├── src/
│   │   ├── components/    # Admin-specific components
│   │   ├── pages/        # Admin pages
│   │   ├── contexts/     # Admin contexts
│   │   └── utils/        # Admin utilities
│   └── package.json
└── backend/
    ├── controllers/      # Route handlers
    ├── middleware/       # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    ├── app.js           # Express app
    ├── server.js        # Server entry
    └── package.json
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Joi schemas for all inputs
- **CORS Protection**: Configured origins
- **Helmet**: Security headers
- **MongoDB Sanitization**: Prevents NoSQL injection
- **Password Hashing**: bcrypt for secure storage

## 🧪 Testing

```bash
# Backend tests (to be implemented)
cd backend
npm test

# Frontend tests (to be implemented)
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each folder
- Review the API documentation in `backend/README.md`

## 🔄 Updates & Maintenance

- Keep dependencies updated
- Monitor security advisories
- Regular database backups
- Performance monitoring
- Error tracking and logging

---

**Built with ❤️ using modern web technologies** 
