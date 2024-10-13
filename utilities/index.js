const utilities = {};

// Global Error-handling Middleware
utilities.errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

utilities.isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json('Please login to view this page.');
  }
  next();
};

module.exports = utilities;
