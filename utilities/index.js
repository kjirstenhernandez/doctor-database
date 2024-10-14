const utilities = {};
// Global Error-handling Middleware
utilities.errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

utilities.isAuthenticated = (req, res, next) => {
  console.log('SessionID: ', req.sessionID);
  console.log('Session: ', req.session);
  if (req.user || req.isAuthenticated()) {
    console.log('Authenticated, ', req.user);
    return next();
  }
  res.redirect('/auth/login');
};

utilities.isUser = (req, res, next) => {
  console.log(req.user);
  if (req.user && (req.user.status === 'admin' || req.user.status === 'user')) {
    return next(); // User is an admin, proceed to the next middleware/route
  }
  res.status(403).json('Please login before viewing this page.');
};

utilities.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.status === 'admin') {
    return next(); // User is an admin, proceed to the next middleware/route
  }
  res.status(403).json('Access Denied: Admins only.');
};

module.exports = utilities;
