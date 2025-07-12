# StackIt Backend API

A production-ready Node.js/Express backend for the StackIt Q&A forum application.

## Features

- 🔐 JWT Authentication with role-based access
- 🛡️ Security middleware (Helmet, Rate Limiting, CORS, Input Sanitization)
- ✅ Request validation with Joi
- 📝 CRUD operations for Questions and Answers
- 👍 Voting system for Questions and Answers
- 👥 User management with admin roles
- 🗄️ MongoDB with Mongoose ODM
- 📊 Comprehensive error handling
- 🔍 Request logging with Morgan

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, Rate Limiting, CORS, Input Sanitization
- **Validation**: Joi
- **Logging**: Morgan

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stackit
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions` - Create question (protected)
- `PUT /api/questions/:id` - Update question (protected)
- `DELETE /api/questions/:id` - Delete question (protected)
- `POST /api/questions/:id/vote` - Vote on question (protected)

### Answers
- `POST /api/answers` - Create answer (protected)
- `PUT /api/answers/:id` - Update answer (protected)
- `DELETE /api/answers/:id` - Delete answer (protected)
- `POST /api/answers/:id/vote` - Vote on answer (protected)

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/questions` - Get all questions for admin
- `DELETE /api/admin/questions/:id` - Delete question as admin

## Security Features

### Rate Limiting
- General API: 100 requests per 15 minutes per IP
- Authentication: 5 requests per 15 minutes per IP

### Input Validation
- All request bodies are validated using Joi schemas
- MongoDB injection protection with express-mongo-sanitize
- Request size limits (10MB)

### CORS Configuration
- Configured for development and production origins
- Credentials support for authentication

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stackit
JWT_SECRET=your-very-long-and-secure-jwt-secret-key
FRONTEND_URL=https://your-frontend-domain.com
ADMIN_URL=https://your-admin-domain.com
```

### Security Checklist
- [ ] Change JWT_SECRET to a strong, unique value
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure MongoDB with authentication
- [ ] Set up proper logging
- [ ] Use environment-specific configurations
- [ ] Set up monitoring and error tracking

### Deployment Options
- **Heroku**: Use Procfile and environment variables
- **Vercel**: Configure as Node.js API
- **AWS**: Use EC2, ECS, or Lambda
- **DigitalOcean**: Use App Platform or Droplets

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Project Structure
```
backend/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── app.js          # Express app configuration
├── server.js       # Server entry point
└── package.json    # Dependencies and scripts
```

## Error Handling

The API uses a global error handler that:
- Catches all unhandled errors
- Returns consistent error responses
- Logs errors for debugging
- Handles common MongoDB errors
- Provides stack traces in development only

## Contributing

1. Follow the existing code style
2. Add validation for new endpoints
3. Include error handling
4. Test your changes
5. Update documentation

## License

MIT License - see LICENSE file for details 