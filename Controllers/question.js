const Question = require('../models/question')
const Chapter = require('../models/chapter')

exports.getQuestion =  (req, res) => {
    Question.findOne({_id: req.params.id}).populate('answers', '-question')
      .then(question => res.status(200).json(question))
      .catch(error => res.status(404).json({error}));
}

exports.getAllQuestions = (req, res, next) => {
    Question.find().populate('answers', '-question')
      .then(questions => res.status(200).json(questions))
      .catch(error => res.status(404).json({error}));
}

exports.addQuestion = (req, res) => {
  const question = new Question({
      ...req.body
  })
  question.save().then(() => {
      Chapter.findOne({_id: question.chapter}, (err, chapter) => {
          chapter.questions.push(question)
          chapter.save()
      })
    res.status(200).json({message: 'New question saved !'})})
      .catch(error => res.status(404).json({error}));
}

exports.updateQuestion = (req, res) => {
  const question = new Question({
      _id: req.params.id,
      ...req.body
  });
  Question.updateOne({_id: req.params.id}, question).then(
      () => {
          res.status(200).json({
              message: 'Question updated successfully!'
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

exports.deleteQuestion = (req, res) => {
    Question.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Question deleted !'
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