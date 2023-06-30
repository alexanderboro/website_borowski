
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  console.log(`Unauthorized access attempt at ${req.originalUrl}`);
  res.redirect('/login.html');
}

  
  export default isAuthenticated;
