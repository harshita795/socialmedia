import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json('You need to Login');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json('Token verification failed');
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  