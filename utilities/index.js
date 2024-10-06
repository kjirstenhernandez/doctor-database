const utilities = {};

// Global Error-handling Middleware
utilities.errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = utilities;
