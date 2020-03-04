const Registration = require('../models/registration')
const User = require('../models/user')
const Course = require('../models/course')

exports.getAllRegistrations = (req, res, next) => {
  Registration.find().populate('user').populate('course')
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json({error}));
}

exports.getRegistration = (req, res) => {
  Registration.findOne({_id: req.params.id}).populate('user').populate('course')
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({error}));
}

exports.addRegistration = (req, res) => {
  const registration = new Registration({
      ...req.body
  })
  registration.save().then(() => {
    User.findOne({_id: registration.user}, (err, user) => {
      user.registrations.push(registration)
      user.save()

      Course.findOne({_id: registration.course}, (err, course) => {
        course.registrations.push(registration)
        course.save()
    })
    res.status(200).json({message: 'New course created !'})})
      .catch(error => res.status(404).json({error}))})}


exports.updateRegistrationCourse = (req, res) => {
  const course = new Course({
    _id: req.params.id,
    active: req.body.active,
    completed: req.body.completed
  })
  Course.updateOne({_id: req.params.id}, course).then(
    () => {
        res.status(200).json({
            message: 'Course updated successfully!'
        });
    }
).catch(
    (error) => {
        res.status(404).json({
            error: error
        });
    }
)}
