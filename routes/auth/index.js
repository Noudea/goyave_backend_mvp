import express from 'express'
import User from '../../models/user.js'
import passwordHasherService from '../../services/passwordHasherService.js'
import Session from '../../models/session.js'
import jwtService from '../../services/jwtService.js'

const router = express.Router()

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const hashedpassword  = passwordHasherService.hashPassword(password);
  const user = new User({ email, password : hashedpassword });
  // Save the user to the database and return a response
  user.save((err) => {
    if (err) {
      console.log(err)
      res.status(400).send({ message: 'Error saving user to database' });
    } else {
      res.status(200).send({ message: 'User registered successfully' });
    }
  });
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isValidPassword = passwordHasherService.validatePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const accessToken = jwtService.createAccessToken(user._id);
  const refreshToken = jwtService.createRefreshToken(user._id);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  const session = new Session({
    userId: user._id,
    accessToken,
    refreshToken,
    expiresAt
  });
  await session.save();
  return res.status(200).json({
    accessToken,
    refreshToken,
    expiresAt
  });
});
router.post('/token/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const session = await Session.findOne({ refreshToken });
  if (!session) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const isValidRefreshToken = jwtService.verifyRefreshToken(refreshToken);
  if (!isValidRefreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const userId = session.userId;
  const accessToken = jwtService.createAccessToken(userId);
  session.accessToken = accessToken;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  session.expiresAt = expiresAt;
  await session.save();
  return res.json({
    accessToken,
    expiresAt
  });
});



export default router