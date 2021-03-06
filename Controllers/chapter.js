const Course = require('../models/course')
const Chapter = require('../models/chapter')
const ChapterType = require('../models/chapterType')

exports.addChapter = (req, res) => {
  const chapter = new Chapter({
      ...req.body
  })
  chapter.save().then(() => {
    ChapterType.findOne({_id: chapter.chapter_type}, (err, chapterType) => {
        chapterType.chapters.push(chapter)
        chapterType.save()
    })
    Course.findOne({_id: chapter.course}, (err, course) => {
      course.chapters.push(chapter)
      course.save()
    })
    res.status(200).json({message: 'New chapter created !'})})
      .catch(error => res.status(404).json({error}));
}

exports.getchapter =  (req, res) => {
  Chapter.findOne({_id: req.params.id}).populate('course', 'name _id').populate('questions', '-chapter').populate('chapter_type', 'name _id')
      .then(chapter => res.status(200).json(chapter))
      .catch(error => res.status(404).json({error}));
}

exports.getAllChapter = (req, res, next) => {
  Chapter.find().populate('course', 'name _id').populate({
    path : 'questions',
    select: '-chapter -id -__v',
    populate : {
      path : 'answers',
      select: '-state -question -__v'
    }
  }).populate('chapter_type', 'name _id')
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