import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { ActivitySchema } from './activity';

const UserProfileSchema = new Schema({
  userId: {
    type: String,
  },
  questionAboutMe: {
    type: String,
  },
  questionFavoriteActivity: {
    type: String,
  },
  questionFavoriteTimeToTrain: {
    type: String,
  },
  questionGetAlong: {
    type: String,
  },
  questionFitnessAchievements: {
    type: String,
  },
  questionSuppBrands: {
    type: String,
  },
  questionExerciseGoals: {
    type: String,
  },
  activities: {
    type: [ActivitySchema],
  },
  haveKids: {
    type: Boolean,
  },
  wantKids: {
    type: Boolean,
  },
  dogs: {
    type: Boolean,
  },
  cats: {
    type: Boolean,
  },
  religion: {
    type: String,
  },
  politics: {
    type: String,
  },
});

const UserProfile = mongoose.model('user_profile', UserProfileSchema);

export default UserProfile;
