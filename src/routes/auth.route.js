const express = require('express');

const router = express.Router();

const { generateToken } = require('../config/auth');

router.get('/generate-token', (req, res) => {
    const user = { id: 1, role: 'admin' };
    const token = generateToken(user);
    res.json({ token });
});

module.exports = router;
