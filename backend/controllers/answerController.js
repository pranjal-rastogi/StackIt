const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.createAnswer = async (req, res) => {
  try {
    const { content, questionId } = req.body;
    const answer = await Answer.create({
      content,
      author: req.user._id,
      question: questionId
    });
    await Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    answer.content = req.body.content || answer.content;
    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Question.findByIdAndUpdate(answer.question, { $pull: { answers: answer._id } });
    await answer.deleteOne();
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body;
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    // Check if user already voted
    const existingVote = answer.votes.find(
      vote => vote.user.toString() === req.user._id.toString()
    );

    if (existingVote) {
      // Remove existing vote if same type, or change vote type
      if (existingVote.voteType === voteType) {
        answer.votes = answer.votes.filter(
          vote => vote.user.toString() !== req.user._id.toString()
        );
      } else {
        existingVote.voteType = voteType;
      }
    } else {
      // Add new vote
      answer.votes.push({
        user: req.user._id,
        voteType
      });
    }

    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 