const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({error}));
  }

exports.getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
}

exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'User deleted !'
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

exports.updateUser = (req, res) => {
    const user = new User({
        _id: req.params.id,
        ...req.body
    });
    User.updateOne({_id: req.params.id}, user).then(
        () => {
            res.status(200).json({
                message: 'User updated successfully!'
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

exports.validateUser = (req, res) => {
  const user = new User({
      _id: req.params.id,
      profile_validated : true,
  });
  User.updateOne({_id: req.params.id}, user).then(
      () => {
          res.status(200).json({
              message: 'User activated successfully!'
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

  exports.registerUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        let user = new User({...req.body});
        user.password = hash
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })})
  }

  exports.userLogIn = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
              if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                  userId: user._id,
                  token: jwt.sign(
                      { userId: user._id },
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '24h' }
                  )
              });
          })
          .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
  }