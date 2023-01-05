import Session from '../models/session.js'
import jwtService from '../services/jwtService.js'
import User from '../models/user.js'

const protectRoute = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const accessToken = authorization.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const session = await Session.findOne({ accessToken });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const isValidAccessToken = jwtService.verifyAccessToken(accessToken);
  if (!isValidAccessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.userId = session.userId;
  req.user = await User.findById(session.userId);
  next();
};

export default protectRoute;