const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Activities = require('./activities');

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
        type: String
    },
    questionSuppBrands: {
        type: String
    },
    questionExerciseGoals: {
        type: String,
    },
    activities: {
        type: [Activities],
    },
    haveKids: {
        type: Boolean
    },
    wantKids: {
        type: Boolean
    },
    dogs: {
        type: Boolean
    },
    cats: {
        type: Boolean
    },
    religion: {
        type: String
    },
    politics: {
        type: String
    }
   
});

const User = mongoose.model('user', UserSchema);

module.exports = User;