const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots')
const bookingsRouter = require('./bookings')
const reviewImageRouter = require('./review-images')
const reviewsRouter = require('./reviews')
const spotImageRouter = require('./spot-images')
const { restoreUser } = require('../../utils/auth.js');


// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingsRouter);
router.use('/review-images', reviewImageRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImageRouter);


// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });


// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET restore user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );




module.exports = router;
