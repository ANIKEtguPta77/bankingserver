const router=require('express').Router();
const { a,signUp,verifyOtp,login,entry,transactions }=require('../Controllers/userController')

router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/rsignup').post(entry);
router.route('/login').post(login);
router.route('/transactions').post(transactions);
router.route('/a').get(a);

module.exports=router;
