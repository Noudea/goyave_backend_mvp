import jwt from 'jsonwebtoken'


const jwtService = {
  createAccessToken: (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },
  createRefreshToken: (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  },
  verifyAccessToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
  verifyRefreshToken: (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }
};

export default jwtService;
