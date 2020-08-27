var User = require("../models/user");

module.exports.listUser = function (req, res, next) {
  User.findAll()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => console.log(err));
};
