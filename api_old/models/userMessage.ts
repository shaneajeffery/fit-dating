import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserMessageSchema = new Schema({
  toUserId: {
    type: String,
  },
  fromUserId: {
    type: String,
  },
  message: {
    type: String,
  },
  read: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const UserMessage = mongoose.model('user_message', UserMessageSchema);

export default UserMessage;
