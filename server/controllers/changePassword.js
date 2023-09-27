const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");

exports.forgotPasswordPost = async (req, res) => {
  let email = req.body.Email;

  userSchema.findOne({ Email: email }).then((data) => {
    if (data) {
      res.status(200).json("EMail is registered");
    } else {
      res.status(400).json("Not a valid Email");
    }
  });
};

exports.changePasswordPost = async (req, res) => {
  let currentPassword = req.body.CurrentPassword;
  let userId = req.query.id;
  let newPassword = await bcrypt.hash(req.body.NewPassword, 10);

  userSchema
    .findOne({ _id: userId })
    .then((data) => {
      if (data) {
        bcrypt.compare(currentPassword, data.Password, (err, response) => {
          if (response) {
            userSchema
              .updateOne(
                { _id: userId },
                {
                  $set: {
                    Password: newPassword,
                  },
                }
              )
              .then((result) => {
                userSchema.findOne({ _id: userId }).then((data) => {
                  res.status(200).json("Password updated successfully");
                });
              })
              .catch((err) => {
                res.status(400).json("err in pass uodate");
              });
          } else {
            res.status(400).json("Current Password is wrong");
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json("err in fetching user");
    });
};
