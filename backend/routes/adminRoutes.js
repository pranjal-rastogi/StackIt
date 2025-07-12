const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const {
  getUsers,
  updateUser,
  deleteUser,
  getStats,
  getQuestions,
  deleteQuestion
} = require('../controllers/adminController');

router.get('/users', auth, admin, getUsers);
router.put('/users/:id', auth, admin, updateUser);
router.delete('/users/:id', auth, admin, deleteUser);
router.get('/stats', auth, admin, getStats);
router.get('/questions', auth, admin, getQuestions);
router.delete('/questions/:id', auth, admin, deleteQuestion);

module.exports = router; 