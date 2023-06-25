// authMiddleware.js 
const authMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Checking if user has the necessary authorization 
    if (req.user.role !== 'author') {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    // User is authenticated and has the necessary authorization
    next();
  };
  
  export default authMiddleware;