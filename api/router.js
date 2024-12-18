const express = require('express');
const router = express.Router();
const authenticateToken = require('./authenticateMW');

const { Register, Login, Profile } = require('./loginRegisterProfile');
const { EditProfile, DeleteProfile, List1, List2} = require('./editDeleteList');

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/profile').get(authenticateToken, Profile);
router.route('/editProfile').post(EditProfile);
router.route('/delete-profile').delete(DeleteProfile);
router.route('/list').post(List1);
router.route('/list2').post(List2);

module.exports = router;