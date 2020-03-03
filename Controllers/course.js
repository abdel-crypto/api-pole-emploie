const Course = require('../models/course')
const Subject = require('../models/subject')
const express = require('express');

exports.addCourse = (req, res) => {
  const course = new Course({
      ...req.body
  })
  course.save().then(() => {
    Subject.findOne({_id: course.subject}, (err, subject) => {
      subject.courses.push(course)
      subject.save()
    })
    res.status(200).json({message: 'New course created !'})})
      .catch(error => res.status(404).json({error}));
}

exports.getCourse =  (req, res) => {
  Course.findOne({_id: req.params.id}).populate('subject', '-_id -__v -courses')
      .then(subject => res.status(200).json(subject))
      .catch(error => res.status(404).json({error}));
}

exports.getAllCourse = (req, res, next) => {
  Course.find().populate('subject', '-_id -__v -courses')
      .then(courses => res.status(200).json(courses))
      .catch(error => res.status(404).json({error}));
}

exports.updateCourse = (req, res) => {
  const course = new Course({
    _id: req.params.id,
    ...req.body
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
);
}

exports.deleteCourse = (req, res) => {
  Course.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Course deleted !'
          });
      }
  ).catch(
      (error) => {
          res.status(404).json({
              error: error
          });
      }
  );
};