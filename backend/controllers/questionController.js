const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('author', 'username email').sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username email')
      .populate({
        path: 'answers',
        populate: { path: 'author', select: 'username email' }
      });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = await Question.create({
      title,
      description,
      tags,
      author: req.user._id
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (question.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { title, description, tags } = req.body;
    question.title = title || question.title;
    question.description = description || question.description;
    question.tags = tags || question.tags;
    question.updatedAt = Date.now();
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (question.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.voteQuestion = async (req, res) => {
  try {
    const { voteType } = req.body;
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    // Check if user already voted
    const existingVote = question.votes.find(
      vote => vote.user.toString() === req.user._id.toString()
    );

    if (existingVote) {
      // Remove existing vote if same type, or change vote type
      if (existingVote.voteType === voteType) {
        question.votes = question.votes.filter(
          vote => vote.user.toString() !== req.user._id.toString()
        );
      } else {
        existingVote.voteType = voteType;
      }
    } else {
      // Add new vote
      question.votes.push({
        user: req.user._id,
        voteType
      });
    }

    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 