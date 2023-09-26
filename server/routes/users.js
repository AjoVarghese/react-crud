var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')

// const forgotPasswordController = require('../controllers/changePassword')
const changePasswordController = require('../controllers/changePassword')

const editProfileController = require('../controllers/editProfileController')
const imageUploadController = require('../controllers/editProfileController')

const addressController = require('../controllers/addressController')


/* GET users listing. */

router.post('/register',registerController.signupPost)
router.post('/login',loginController.loginPost)


// router.post('/forgot-password',forgotPasswordController.forgotPasswordPost)
router.post('/change-password', changePasswordController.changePasswordPost)


router.post('/edit-profile', editProfileController.editProfilePost)
router.post('/image-upload',imageUploadController.imageUploadPost)

router.post('/add-address',addressController.addAddressPost)
router.get('/get-address', addressController.getAddress)
router.post('/delete-address', addressController.deleteAddress)

module.exports = router;
