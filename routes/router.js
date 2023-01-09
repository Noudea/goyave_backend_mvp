import express from 'express'
import authRoutes from './auth/index.js'
import travelRoutes from './travel/index.js'
import invitationRoutes from './invitation/index.js'

import protectRoute from '../middlewares/protectRoute.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})
router.get('/protected',protectRoute, (req, res) => {
  res.status(200).send('Hello World!')
})
router.use('/auth', authRoutes)
router.use('/travel', protectRoute, travelRoutes)
router.use('/invitation', protectRoute,invitationRoutes )

export default router