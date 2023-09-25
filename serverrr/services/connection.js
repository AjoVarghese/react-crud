const mongoose = require("mongoose");
require("dotenv").config()

// const uri = process.env.ATLAS_URI
// module.exports = connectDb= async() => {
//     mongoose.connect(uri).then(() => {
//         console.log('Connected to database');
//     }).catch((err) => {
//         console.log('Error in db connection',err);
//     })
// }

// module.exports = {
//     MongoDBConnection: async () => {
//         try {
//             await mongooseLib.connect('mongodb://127.0.0.1:27017/test');
//             console.log("database connect")
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// exports.connectDb = mongoose.connect('mongodb://127.0.0.1:27017/users-management').then(() => {
//         console.log('COnnected');
//        }).catch((err) => {
//         console.log('Err',err);
//        })

// exports.connectDb = () => {
//         mongoose.connect(process.env.DATABASE_URL,
//                 {
//                         userNewUrlParser : true
//                 }
//                 )
//                 .then((e) => console.log('Cnnected to DB')
//                 .catch((err) => console.log('err in connecteion',err))
//                 )
// }
