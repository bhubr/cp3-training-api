const handleSQLError = (err, res) => res.status(500).json({
  error: err.message,
  errorDetails: err.sql
});

const handleNotFound = (message, res) => res.status(404).json({
  error: message
});

module.exports = {
  handleSQLError,
  handleNotFound
};
