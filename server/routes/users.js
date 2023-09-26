var express = require('express');
var router = express.Router();
const  { protect }  = require('../middleware/authMiddleware')


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
router.route('/change-password').post(protect,changePasswordController.changePasswordPost)


router.route('/edit-profile').post(protect,editProfileController.editProfilePost)
router.route('/image-upload').post(protect,imageUploadController.imageUploadPost)

router.route('/add-address').post(protect,addressController.addAddressPost)
router.route('/get-address').get(protect, addressController.getAddress)
router.route('/delete-address').post(protect, addressController.deleteAddress)

module.exports = router;
