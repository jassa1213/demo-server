const isSeller = (req, res, next) => {

  if (req.user && req.user.role === 'seller') {
    console.log(`User Role: ${req.user.role}`); // Log the user's role
    next(); // The user is a seller, proceed to the next middleware or route handler
  } else {
    console.log(`User Role: ${req.user.role}`); // Log the user's role
    return res.status(403).json({ error: 'Permission denied. Only sellers can perform this action.' });
  }
  };
  
  module.exports = isSeller;
  