const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Plaid errors
  if (err.response && err.response.data) {
    return res.status(err.response.status || 500).json({
      error: err.response.data.error_message || 'External API error',
      details: err.response.data
    });
  }

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map(e => ({ field: e.path, message: e.message }))
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = { errorHandler };
