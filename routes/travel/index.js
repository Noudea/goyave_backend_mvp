import express from 'express'
import Travel from '../../models/travel.js'


const router = express.Router()

router.post('/', async (req, res, next) => {
  console.log(req.user)
  try {
    const travel = new Travel({
      name: req.body.name,
      description: req.body.description,
      leader: req.user,
      participants: req.user
    });
    const result = await travel.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Get all travels
router.get('/', async (req, res, next) => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (error) {
    next(error);
  }
});

// Get a specific travel by ID
router.get('/:id', async (req, res, next) => {
  try {
    const travel = await Travel.findById(req.params.id);
    if (travel) {
      res.json(travel);
    } else {
      res.status(404).send('Travel not found');
    }
  } catch (error) {
    next(error);
  }
});

// Update a specific travel by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedTravel) {
      res.json(updatedTravel);
    } else {
      res.status(404).send('Travel not found');
    }
  } catch (error) {
    next(error);
  }
});

// Delete a specific travel by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Travel.findByIdAndDelete(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('Travel not found');
    }
  } catch (error) {
    next(error);
  }
});

export default router