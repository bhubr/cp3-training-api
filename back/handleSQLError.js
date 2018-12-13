const handleSQLError = (err, res) => res.status(500).json({
  error: err.message,
  errorDetails: err.sql
});

module.exports = handleSQLError;
