const router = require('express').Router();
const passport = require('passport');

// Auth Login
router.get('/login', (req, res) => {
    res.render('login')
});

// Auth Logout
router.get('/logout', (req, res) => {
    res.send('You are logged out')
});

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Redirect callback for Google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You have reached the Callback URI');
})

module.exports = router;