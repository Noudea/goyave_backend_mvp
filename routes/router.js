import express from 'express'
import authroutes from './auth/index.js'
import protectRoute from '../middlewares/protectRoute.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})
router.get('/protected',protectRoute, (req, res) => {
  res.status(200).send('Hello World!')
})
router.use('/auth', authroutes)

export default router