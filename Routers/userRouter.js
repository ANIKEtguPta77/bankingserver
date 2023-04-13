const router=require('express').Router();
const { signUp,verifyOtp,login,entry,transactions }=require('../Controllers/userController')

router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/rsignup').post(entry);
router.route('/login').post(login);
router.route('/transactions').post(transactions);

module.exports=router;