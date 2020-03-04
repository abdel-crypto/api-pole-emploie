const User = require('../models/user')
const express = require('express');
const jwt = require('jsonwebtoken')

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
    let user = new User(req.body)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  }

  exports.userLogIn = (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token:token,id:payload})
        }
      }
    })
  }