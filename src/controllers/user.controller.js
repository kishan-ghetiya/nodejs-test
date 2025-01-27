const User = require('../models/user.model');
const redisClient = require('../config/redis');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    // Invalidate cache after user creation
    await redisClient.del('users');
    res.status(201).json(user);
  }
  catch (err) {    
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const cachedUsers = await redisClient.get('users');
    if (cachedUsers) {
      return res.json(JSON.parse(cachedUsers));
    }
    const users = await User.findAll();
    await redisClient.set('users', JSON.stringify(users), 'EX', 3600); // Cache for 1 hour
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check cache for user
    const cachedUser = await redisClient.get(`user:${id}`);
    if (cachedUser) {
      return res.json(JSON.parse(cachedUser));
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cache the user
    await redisClient.set(`user:${id}`, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await User.update(id, { name, email, password: hashedPassword, role });

    // Invalidate cache for users and this specific user
    await redisClient.del('users');
    await redisClient.del(`user:${id}`);

    res.json({ id, name, email, role });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.destroy(id);

    // Invalidate cache for users and this specific user
    await redisClient.del('users');
    await redisClient.del(`user:${id}`);

    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
};
