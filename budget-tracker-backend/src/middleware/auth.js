import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    
    const tokenArray = req.headers.authorization?.split(" ");
    const token = tokenArray && tokenArray[1];
    
    if (!token) return res.status(401).json({ message: 'Access denied. Missing token.' });

    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id; 
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or expired.' });
  }
};

export default authMiddleware;
