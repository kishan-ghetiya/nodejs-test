exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Handling specific errors
  if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: err.details });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate entry detected' });
  }

  res.status(status).json({ error: message });
};
