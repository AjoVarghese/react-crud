const userSchema = require('../schema/userSchema')

exports.editProfilePost = async(req, res) => {
    console.log('edit profile req body',req.body);

    userSchema.updateOne({_id:req.body.userId},
        {
            $set : {
                Name : req.body.Name,
                Email : req.body.Email,
                Mobile : req.body.Mobile
            },
            
        },
        
        ).then((data) => {
            console.log(data);
            userSchema.findOne({_id : req.body.userId}).then((result) => {
                
                const editedData = {
                    id : result._id,
                    Name : result.Name,
                    Email : result.Email,
                    Mobile : result.Mobile
                }
                console.log(editedData);
                res.status(200).json(editedData)
            }).catch((err) => {
                console.log('edit pr err',err);
                res.status(400).json(err)
            })
            
        })
}

exports.imageUploadPost = async(req,res) => {
  console.log(req.body);
  userSchema.updateOne({_id : req.body.Id},
    {
        $set : {
            ProfileImage : req.body.Image
        }
    }
    ).then(() => {
        userSchema.findOne({_id : req.body.Id}).then((result) => {
            console.log('image result',result);
            let profileData = {
                id : result._id,
                Name : result.Name,
                Email : result.Email,
                ProfileImage : result.ProfileImage
            }
            res.status(200).json(profileData)
        })
    })
    .catch((err) => {
        console.log('err in image upload',err);
        res.status(400).json('Error in updating')
    })
}