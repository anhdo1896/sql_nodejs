var user_md = require("./../models/dataUser");
var md5 = require("md5");
module.exports.createUser = function (req, res, next) {
  var user = req.body;
  var err = [];

  console.log(user);

  if (user.username.length == 0) {
    err.push("Username is required");
    res.render("auth/register", { title: "Register", data: { err: err } });
  }
  if (user.email.length == 0) {
    if (user.username.length != 0) {
      err.push("Email is required");
      res.render("auth/register", {
        title: "Register",
        data: { err: "Email is required", username: user.username },
      });
    } else {
      err.push("Email is required");
      res.render("auth/register", {
        title: "Register",
        data: { err: "Email is required", username: user.username },
      });
    }
  }

  if (user.passwd.length == 0) {
    if (user.username.length != 0 || user.email.length != 0) {
      err.push("Pass is required");
      res.render("auth/register", {
        title: "Register",
        data: {
          err: "Pass is required",
          username: user.username,
          email: user.email,
        },
      });
    } else {
      err.push("Pass is required");
      res.render("auth/register", {
        title: "Register",
        data: { err: "Pass is required" },
      });
    }
  }

  if (user.passwd != user.repasswd) {
    if (user.username.length != 0 || user.email.length != 0) {
      err.push("Password not match");
      res.render("auth/register", {
        title: "Register",
        data: {
          err: "Password not match ",
          username: user.username,
          email: user.email,
        },
      });
    }
  }
  if (user.passwd.length <= 6) {
    if (user.username.length != 0 || user.email.length != 0) {
      err.push("Password minimum is 6 character");
      res.render("auth/register", {
        title: "Register",
        data: {
          err: "Password minimum is 6 character",
          username: user.username,
          email: user.email,
        },
      });
    }
  }
  if (user_md.getUser(user.username)) {
    var al = user_md.getUser(user.username);
    al.then(function (users) {
      var us = users[0];

      if (us !== undefined) {
        err.push("User is exsist");
        res.render("auth/register", {
          title: "Register",
          data: { err: "User is exsist" },
        });
      }
      if (err.length) {
        return;
      } else {
        next();
      }
    });
  }
};

module.exports.loginPost = function (req, res, next) {
  var params = req.body;
  var err = [];
  var dl = user_md.getUser(params.username);
  console.log(params);

  if (params.username.length == 0) {
    var passwd = params.passwd;
    err.push("User is required");
    res.render("auth/login", {
      title: "Login",
      data: { err: "User is required", passwd: passwd },
    });
  }

  if (params.passwd.length == 0) {
    if (params.username.length != 0) {
      err.push("Password is required");
      res.render("auth/login", {
        title: "Login",
        data: { err: "Password is required", username: params.username },
      });
    }
  }

  if (dl) {
    dl.then(function (users) {
      var us = users[0];

      if (us == undefined) {
        err.push("User is not exsist");
        res.render("auth/login", {
          title: "Login",
          data: { err: "User is not exsist" },
        });
      } else {
        var pass = md5(params.passwd);
        // console.log(pass);
        if (pass != us.password) {
          if (params.username.length != 0) {
            err.push("Pass is wrong");
            res.render("auth/login", {
              title: "Login",
              data: { err: "Pass is wrong", username: params.username },
            });
          }

          //res.render('login', { title: "Login", data: { err: "Pass is wrong" },ten: req.session.nameUser ,img:req.session.img  });
        }
      }

      if (err.length) {
        return;
      } else {
        next();
      }
    });
  }
};
