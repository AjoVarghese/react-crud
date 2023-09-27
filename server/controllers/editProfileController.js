const userSchema = require("../schema/userSchema");

exports.editProfilePost = async (req, res) => {
  userSchema
    .updateOne(
      { _id: req.body.userId },
      {
        $set: {
          Name: req.body.Name,
          Email: req.body.Email,
          Mobile: req.body.Mobile,
        },
      }
    )
    .then((data) => {
      userSchema
        .findOne({ _id: req.body.userId })
        .then((result) => {
          const editedData = {
            id: result._id,
            Name: result.Name,
            Email: result.Email,
            Mobile: result.Mobile,
          };
          res.status(200).json(editedData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
};

exports.imageUploadPost = async (req, res) => {
  userSchema
    .updateOne(
      { _id: req.body.Id },
      {
        $set: {
          ProfileImage: req.body.Image,
        },
      }
    )
    .then(() => {
      userSchema.findOne({ _id: req.body.Id }).then((result) => {
        let profileData = {
          id: result._id,
          Name: result.Name,
          Email: result.Email,
          ProfileImage: result.ProfileImage,
        };
        res.status(200).json(profileData);
      });
    })
    .catch((err) => {
      res.status(400).json("Error in updating");
    });
};
