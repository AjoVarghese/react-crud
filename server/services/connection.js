const mongoose = require("mongoose");
require("dotenv").config()

const uri = process.env.DATABASE_URL


   
    mongoose.connect(uri)
            .then((e) => console.log('Cnnected to DB'))
            .catch((err) => console.log('err in connecteion',err))
