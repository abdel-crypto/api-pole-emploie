const Course = require('../models/course')
const Chapter = require('../models/chapter')

exports.addChapter = (req, res) => {
  const chapter = new Chapter({
      ...req.body
  })
  chapter.save().then(() => {
    Course.findOne({_id: chapter.course}, (err, course) => {
      course.chapters.push(chapter)
      course.save()
    })
    res.status(200).json({message: 'New chapter created !'})})
      .catch(error => res.status(404).json({error}));
}

exports.getchapter =  (req, res) => {
  Chapter.findOne({_id: req.params.id}).populate('course', 'name _id')
      .then(chapter => res.status(200).json(chapter))
      .catch(error => res.status(404).json({error}));
}

exports.getAllChapter = (req, res, next) => {
  Chapter.find().populate('course', 'name _id')
      .then(chapters => res.status(200).json(chapters))
      .catch(error => res.status(404).json({error}));
}

exports.updateChapter = (req, res) => {
  const chapter = new Chapter({
    _id: req.params.id,
    ...req.body
  })
  Chapter.updateOne({_id: req.params.id}, chapter).then(
    () => {
        res.status(200).json({
            message: 'Chapter updated successfully!'
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

exports.deleteChapter = (req, res) => {
  Chapter.deleteOne({_id: req.params.id}).then(
      () => {
          res.status(200).json({
              message: 'Chapter deleted !'
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