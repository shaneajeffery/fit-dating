const express = require('express');

const router = express.Router();
const Student = require('./models/user');

// get a list of students from the database
router.get('/students', (req, res, next) => {
  Student.find({})
    .then((students) => {
      res.send(students);
    })
    .catch(next);
});

// add a new student to database
router.post('/students', (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      res.send(student);
    })
    .catch(next);
});

// update a student in the database
router.put('/students/:id', (req, res, next) => {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body).then((student) => {
    Student.findOne({ _id: req.params.id }).then((student) => {
      res.send(student);
    });
  });
});

// delete a student in the database
router.delete('/students/:id', (req, res, next) => {
  Student.findOneAndDelete({ _id: req.params.id }).then((student) => {
    res.send(student);
  });
});

module.exports = router;
