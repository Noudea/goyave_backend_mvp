import mongoose from 'mongoose'

const travelSchema = new mongoose.Schema({
  destination: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dates: {
    type: Date,
  },
  leader:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
}, {
  timestamps: true
});

const Travel = mongoose.model('Travel', travelSchema);


export default Travel