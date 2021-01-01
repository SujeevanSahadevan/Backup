const passport = require('passport');

module.exports= (app)=>{


app.get('/auth/google',passport.authenticate('google',
{scope:['profile','email']})
); // 1. BROWSER SAVES THE USER AND ATTACH A COOKIE TO THE USER WHO LOGGED IN

app.get('/auth/google/callback',passport.authenticate('google'));

app.get('/api/logout',(req,res)=>{
req.logout();
res.send(req.user);
});

app.get('/api/current_user',(req,res)=>{
res.send(req.user);
})

};
