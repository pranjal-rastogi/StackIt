const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const { validate, authSchemas } = require('../middleware/validationMiddleware');

router.post('/register', validate(authSchemas.register), register);
router.post('/login', validate(authSchemas.login), login);
router.get('/me', auth, me);

module.exports = router; 