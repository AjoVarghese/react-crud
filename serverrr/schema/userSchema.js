const mongoose = require('mongoose')



const addressSchema = new mongoose.Schema({
  // id : {type: String, required: true},
  Street: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country : {type: String, required: true},
  Pincode: { type: String, required: true }
});


const userSchema = new mongoose.Schema({
    Name : {type : String , required : true},
    Email : {type : String , required : true},
    Mobile : {type : String, required : true},
    Password : {type : String,required : false},
    ProfileImage : {type : String ,
               default : "https://d36g7qg6pk2cm7.cloudfront.net/assets/profile-f17aa1dfbd0cb562142f1dcb10bb7ad33e1ac8417ad29a1cdab7dfbfbbfe2f15.png",
        required : true
    },
    Address: {
type : [
  {
    Street : {
      type : String
    },
    City : {
      type : String
    },
    State : {
      type :String
    },
    Country : {
      type : String
    },
    Pincode : {
      type : String
    }
  }
 
]
    }
},{
    timestamps: true,
  }
)

const model = mongoose.model("customer",userSchema)

module.exports = model