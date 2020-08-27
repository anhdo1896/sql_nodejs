var User = require("./../models/User");
var md5 = require("md5");
module.exports.login = function (req, res) {
  res.render("auth/login", { title: "Login", data: { err: "" } });
};
module.exports.register = function (req, res, next) {
  res.render("auth/register", { title: "Register", data: { err: "" } });
};
module.exports.registerCreate = function (req, res) {
  var user = req.body;

  var pass = md5(user.passwd);
  const users = {
    username: user.username,
    password: pass,
  };

  User.create(users)
    .then((result) => {
      console.log(result);
      res.redirect("/user/listUser");
    })
    .catch((err) => {
      res.render("auth/register", {
        title: "Register",
        data: { err },
      });
    });
};
module.exports.loginPost = function (req, res, next) {
  var user = req.body;
  res.cookie("userId", user.username);
  res.redirect("/");
};
