import express from 'express'
import Invitation from '../../models/invitation.js'
import Travel from '../../models/travel.js'
import { sendInvitationEmail } from '../../services/MailService.js'


const router = express.Router()
// Send an invitation to a user
router.post('/', async (req, res, next) => {
  try {
    const invitation = new Invitation({
      email: req.body.email,
      travel: req.body.travel
    });
    const result = await invitation.save();
    const travel = await Travel.findById(result.travel).populate('leader');
    sendInvitationEmail(req.body.email,result,travel)
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error sending invitation' });
  }
});

// Accept an invitation
router.patch('/:id/accept', async (req, res, next) => {
  console.log(req.params.id)
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (invitation) {
      invitation.status = 'accepted';
      await invitation.save();
      const travel = await Travel.findById(invitation.travel);
      if (travel) {
        travel.participants.push(req.user._id);
        const updatedTravel = await travel.save();
        res.json(updatedTravel);
      } else {
        res.status(404).send('Travel not found');
      }
    } else {
      res.status(404).send('Invitation not found');
    }
  } catch (error) {
    console.log(error)
  }
});

// Decline an invitation
router.patch('/decline/:id', async (req, res, next) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (invitation) {
      invitation.status = 'declined';
      const updatedInvitation = await invitation.save();
      res.json(updatedInvitation);
    } else {
      res.status(404).send('Invitation not found');
    }
  } catch (error) {
    next(error);
  }
});


export default router