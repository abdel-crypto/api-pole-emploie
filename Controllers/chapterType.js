const Chapter = require('../models/chapter')
const ChapterType = require('../models/chapterType')

exports.addChapterType = (req, res) => {
  const chapterType = new ChapterType({
      ...req.body
  })
  chapterType.save().then(() => {res.status(200).json({message: 'New chapter type created !'})})
      .catch(error => res.status(404).json({error}));
}

exports.getChapterType =  (req, res) => {
    ChapterType.findOne({_id: req.params.id})
      .then(chapterType => res.status(200).json(chapterType))
      .catch(error => res.status(404).json({error}));
}

exports.getAllChapterType = (req, res, next) => {
    ChapterType.find()
      .then(chapterTypes => res.status(200).json(chapterTypes))
      .catch(error => res.status(404).json({error}));
}

exports.updateChapterType = (req, res) => {
  const chapterType = new ChapterType({
    _id: req.params.id,
    ...req.body
  })
  ChapterType.updateOne({_id: req.params.id}, chapterType).then(
    () => {
        res.status(200).json({
            message: 'Chapter type updated successfully!'
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

exports.deleteChapterType = (req, res) => {
  ChapterType.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Chapter type deleted !'
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