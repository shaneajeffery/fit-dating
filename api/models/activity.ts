import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ActivitySchema = new Schema({
  name: {
    type: String,
  },
});

const Activity = mongoose.model('activity', ActivitySchema);

export default Activity;
