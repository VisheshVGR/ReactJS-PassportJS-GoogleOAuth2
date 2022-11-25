const router = require("express").Router();
const passport = require("passport");
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
var url = require('url');

const storeRedirectToInSession = (req, res, next) => {
  let redirectTo = req.get('referer')
  console.log("redirected to", redirectTo, req.get('host'))
  req.session.redirectTo = redirectTo;
  next();
};

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(req.session.redirectTo);
  // res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get("/google", storeRedirectToInSession, passport.authenticate("google", { scope: ['email', 'profile'] }));

// redirect to home page after successfully login via google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  }),
  (req, res) => {
    // logger.debug("Successful authentication");
    res.redirect(req.session.redirectTo);
  }
);
// app.get('/google/callback', passport.authenticate('google', {
//   successRedirect: '/dashboard/comment-box',
//   failureRedirect: '/dashboard/',
// }))



module.exports = router;
