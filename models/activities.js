const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema({
    activityId: {
        type: String,
    },
    activityName: {
        type: String,
    },
});

const Activities = mongoose.model('activities', ActivitiesSchema);

module.exports = Activities;