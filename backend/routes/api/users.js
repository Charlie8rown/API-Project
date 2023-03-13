const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors, handleValidationError, handleValidationCreatSpot } = require('../../utils/validation');



const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("First Name is required"),
    check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Last Name is required"),
  // handleValidationCreatSpot
  // handleValidationErrors
  handleValidationError
];



// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;

  const checkEmail  = await User.findOne({
    where: { email }
  });

  const checkUsername = await User.findOne({
    where: { username }
  });

  if (checkEmail) {
    return res
      .status(403)
      .json({
        message: 'User already exists',
        statusCode: res.statusCode,
        errors: ['username: User with that email already exists']
      });
  };

  if (checkUsername) {
    return res
      .status(403)
      .json({
        message: 'User already exists',
        statusCode: res.statusCode,
        errors: ['User with that username already exists']
      });
  };

  const user = await User.signup({ firstName, lastName, email, username, password });
  const token = await setTokenCookie(res, user);
  const userRes = user.toJSON();
  userRes.token = token;
  return res.json(userRes);

});

module.exports = router;
