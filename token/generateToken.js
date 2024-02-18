const jwt = require('jsonwebtoken');

function generateTokenForUser(userId,role='user') {
  const token = jwt.sign({ userId,role }, 'jsonwebtokensecretkey', {
    expiresIn: '1h', 
  });
  return token;
}
function generateTokenForSeller(userId,role='seller') {
  const token = jwt.sign({ userId,role }, 'jsonwebtokensecretkey', {
    expiresIn: '1h', 
  });
  return token;
}

module.exports = { generateTokenForUser,generateTokenForSeller };