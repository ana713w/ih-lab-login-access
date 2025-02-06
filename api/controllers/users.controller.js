const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }) 
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: 'User email already taken',
            errors: { email: 'Already exists'}
          })
        );
      } else {
        return User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          avatar: req.body.avatar,
        }).then((user) => {
          res.status(201).json(user);
        });
      }
    })
     .catch((error) => next(error));
};

module.exports.profile = (req, res, next) => {
  // access current request user
  res.json(req.user);
};
