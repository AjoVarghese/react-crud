const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");

exports.signupPost = async (req, res) => {
  try {
    let email = await userSchema.findOne({ Email: req.body.Email });

    let { Name, Email, Mobile, Password } = req.body;
    let details = {
      Name,
      Email,
      Mobile,
      Password,
    };
    if (email) {
      res.status(400).json("Email Already Exists");
    } else {
      details.Password = await bcrypt.hash(details.Password, 10);

      userSchema.create(details).then((result) => {
        const userDetails = {
          Name: result.Name,
          Email: result.Email,
          Mobile: result.Mobile,
          ProfileImage: result.ProfileImage,
        };
        res.status(200).json(userDetails);
      });
    }
  } catch (error) {}
};
