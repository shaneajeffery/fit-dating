import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DietaryInterestSchema = new Schema({
  name: {
    type: String,
  },
});

const DietaryInterest = mongoose.model(
  'dietary_interest',
  DietaryInterestSchema
);

export default DietaryInterest;
