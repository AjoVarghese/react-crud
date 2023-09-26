const asynchandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const protect = asynchandler(async (req, res, next) => {
    console.log('auth protect function');
    console.log('headers',req.headers.authorization);
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        try {
            let token = req.headers.authorization.split(' ')[1]
      
            const decoded = jwt.verify(token, process.env.TOKENCODE)
            console.log('decoded',decoded);
      
            next()
          } catch (error) {
            res.status(400).json('TOKEN INVALID')
          }
         
  
       
      } catch (error) {
        console.log('err in toekn validation',error);
        res.status(400).json('TOKEN INVALID')
      }
    } else {
      res.status(401).json('TOKEN NOT FOUND')
    }
  })
  
  module.exports = { protect }