const utilities = {};

/* ------------------------------------
            Authentication            
 ------------------------------------*/

utilities.errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ------------------------------------
            Authentication            
 ------------------------------------*/

//General Authentication
utilities.isAuthenticated = (req, res, next) => {
  console.log('SessionID: ', req.sessionID);
  console.log('Session: ', req.session);
  if (req.user || req.isAuthenticated()) {
    console.log('Authenticated, ', req.user);
    return next();
  }
  res.redirect('/auth/login');
};

// Checking that user has user credentials to view
utilities.isUser = (req, res, next) => {
  console.log(req.user);
  if (req.user && (req.user.status === 'admin' || req.user.status === 'user')) {
    return next();
  }
  res.status(403).json('Please login before viewing this page.');
};

// Checking that user has admin credentials to view
utilities.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.status === 'admin') {
    return next(); //
  }
  res.status(403).json('Access Denied: Admins only.');
};

module.exports = utilities;
