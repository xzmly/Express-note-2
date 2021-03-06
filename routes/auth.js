var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-jirengu').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

// passport.use(new JirenguStrategy({
//   clientID: '7c66a265d5476655fcdb24adcc23133445d166565fc43ef89ee1cc3d0c6cf40b',
//   tokenURL: 'http://user.jirengu.com/oauth/token',
//   clientSecret: 'afc796e5fa1b8e4448c0324c9e97b52719c4b87edbdde3aa375c4f8141be8ddb',
//   callbackURL: "http://note.ruoyu.site/auth/jirengu/callback"},
//   function(accessToken, refreshToken, profile, done) {
//     done(null, profile)
//  }));

passport.use(new GitHubStrategy({
    clientID: '2bc089a3de881bd85d92',
    clientSecret: '77595c04a17fe7c54853d3ef26179de6fdad1f2f',
    callbackURL: "http://cwhh.ltd:3799/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));



router.get('/github',passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

router.get('/logout',function(req,res){
  req.session.destory()
  res.redirect('/')
})
//passport.authenticate('jirengu');

module.exports = router;