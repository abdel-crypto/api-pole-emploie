const Answer = require('../models/answer')
const Question = require('../models/question')


exports.getAnswer =  (req, res) => {
    Answer.findOne({_id: req.params.id})
      .then(answer => res.status(200).json(answer))
      .catch(error => res.status(404).json({error}));
}

exports.getAllAnswers = (req, res, next) => {
    Answer.find()
      .then(answers => res.status(200).json(answers))
      .catch(error => res.status(404).json({error}));
}

exports.addAnswer = (req, res) => {
    const answer = new Answer({
        ...req.body
    })
    answer.save().then(() => {
        Question.findOne({_id: answer.question}, (err, question) => {
            question.answers.push(answer)
            question.save()
        })
      res.status(200).json({message: 'New Answer saved !'})})
        .catch(error => res.status(404).json({error}));
  }

exports.updateAnswer = (req, res) => {
  const answer = new Question({
      _id: req.params.id,
      ...req.body
  });
  Answer.updateOne({_id: req.params.id}, answer).then(
      () => {
          res.status(200).json({
              message: 'Answer updated successfully!'
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

exports.deleteAnswer = (req, res) => {
    Answer.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Answer deleted !'
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