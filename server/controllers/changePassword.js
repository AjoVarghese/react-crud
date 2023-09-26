const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt');

exports.forgotPasswordPost = async(req,res) => {
    let email = req.body.Email

     userSchema.findOne({Email : email}).then((data) => {
         if(data) {
            res.status(200).json("EMail is registered")
         } else {
            res.status(400).json('Not a valid Email')
         }
     })
}

exports.changePasswordPost = async(req,res) => {
    console.log('called');
     let currentPassword = req.body.CurrentPassword
     let userId = req.query.id
     
     let newPassword = await bcrypt.hash(req.body.NewPassword, 10)

    //  let userDetails = await userSchema.findOne({_id : userId})
    userSchema.findOne({_id : userId}).then((data) => {
        if(data) {
            console.log('dcd',data);
            bcrypt.compare(currentPassword,data.Password,(err, response) => {
               console.log('bcryt res',response);
               if(response) {
                 
       
                  userSchema.updateOne({_id : userId},
                   {
                       $set : {
                           Password : newPassword
                       }
                   }
                   )
                   .then((result) => {
                       console.log('pas update',result);
                       userSchema.findOne({_id : userId}).then((data) => {
                           res.status(200).json("Password updated successfully")
                       })
                   })
                   .catch((err) => {
                       console.log('err in pass update',err);
                       res.status(400).json('err in pass uodate')
                   })
                   
               } else {
                   res.status(400).json('Current Password is wrong')
               }
            })
        }
    })
    .catch((err) => {
        console.log('err in fetch user',err);
        res.status(400).json('err in fetching user')
    })
//     let newPassword = req.body.NewPassword
    
//     let bcryptedPassword = await bcrypt.hash(newPassword,10)
// console.log(bcryptedPassword);
//     userSchema.updateOne({Email : req.body.Email},
//         {
//             $set : {
//                 Password:bcryptedPassword
//             }
//         }).then((response) => {
           
//             res.status(200).json(response)
//         }).catch((err) => {
            
//             res.status(400).json(err)
//         })
}