const Subject = require('../models/subject')

exports.getSubject =  (req, res) => {
  Subject.findOne({_id: req.params.id}).populate('courses', '-subject -__v')
      .then(subject => res.status(200).json(subject))
      .catch(error => res.status(404).json({error}));
}

exports.getAllSubject = (req, res, next) => {
  Subject.find().populate('courses', '-subject -__v')
      .then(subjects => res.status(200).json(subjects))
      .catch(error => res.status(404).json({error}));
}

exports.addSubject = (req, res) => {
  const subject = new Subject({
      ...req.body
  })
  subject.save().then(() => res.status(200).json({message: 'New subject saved !'}))
      .catch(error => res.status(404).json({error}));
}

exports.updateSubject = (req, res) => {
  const subject = new Subject({
      _id: req.params.id,
      ...req.body
  });
  Subject.updateOne({_id: req.params.id}, subject).then(
      () => {
          res.status(200).json({
              message: 'Subject updated successfully!'
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

exports.deleteSubject = (req, res) => {
  Subject.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Subject deleted !'
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