const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token part
  
    jwt.verify(token, 'jsonwebtokensecretkey', (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
  

      req.user = decoded;
      console.log('Decoded Token:', decoded);
  
      next();
    });
  }
module.exports = { verifyToken };
