import jwt from "jsonwebtoken"

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next(); // proceed to the protected route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authmiddleware;
