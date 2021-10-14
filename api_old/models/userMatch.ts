import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserMatchSchema = new Schema({
  toUserId: {
    type: String,
  },
  fromUserId: {
    type: String,
  },
  liked: {
    type: Boolean,
  },
  favorite: {
    type: Boolean,
  },
  dislike: {
    type: Boolean,
  },
});

const UserMatch = mongoose.model('user_match', UserMatchSchema);

export default UserMatch;
