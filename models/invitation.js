import mongoose from 'mongoose'

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
    required: true
  }
}, {
  timestamps: true
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;