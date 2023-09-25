const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

exports.loginPost = async(req,res) => {
  try {
    let { Email, Password } = req.body;

    let details = {
      Email,
      Password,
    };

    userSchema.findOne({Email:details.Email}).then((data) => {
        if(data) {
            bcrypt.compare(details.Password,data.Password, (err, response) => {
                if(response) {
                    let {id,Name, Email,Mobile,ProfileImage} = data

                    let result = {
                        id,
                        Name,
                        Email,
                        Mobile,
                        ProfileImage,
                        token:generateToken(id)
                    }
                    res.status(200).json(result)
                } else {
                    res.status(400).json('Incorrect Password')
                }
            })
        } else {
            res.status(400).json('Email not registered')
        }
    })
  } catch (error) {
    
  }
}