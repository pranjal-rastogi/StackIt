const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { validate, questionSchemas } = require('../middleware/validationMiddleware');
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion
} = require('../controllers/questionController');

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', auth, validate(questionSchemas.create), createQuestion);
router.put('/:id', auth, validate(questionSchemas.update), updateQuestion);
router.delete('/:id', auth, deleteQuestion);
router.post('/:id/vote', auth, voteQuestion);

module.exports = router; 