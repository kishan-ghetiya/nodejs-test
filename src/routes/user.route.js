const express = require('express');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');
const validate = require('../middlewares/validate');
const userValidation = require('../utils/validation');

const router = express.Router();

router.post('/users/create', authMiddleware, authorizeRole('admin'), validate(userValidation.create), createUser);
router.get('/users/get', authMiddleware, getUsers);
router.get('/users/get/:id', authMiddleware, getUser);
router.patch('/users/update/:id', authMiddleware, authorizeRole('admin'), validate(userValidation.update), updateUser);
router.delete('/users/delete/:id', authMiddleware, authorizeRole('admin'), deleteUser);

module.exports = router;
