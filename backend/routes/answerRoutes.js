const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { validate, answerSchemas } = require('../middleware/validationMiddleware');
const {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  voteAnswer
} = require('../controllers/answerController');

router.post('/', auth, validate(answerSchemas.create), createAnswer);
router.put('/:id', auth, validate(answerSchemas.update), updateAnswer);
router.delete('/:id', auth, deleteAnswer);
router.post('/:id/vote', auth, voteAnswer);

module.exports = router; 