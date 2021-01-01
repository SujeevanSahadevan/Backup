const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys =require('../config/keys');



const User = mongoose.model('users');



passport.serializeUser((user,done)=>{
done(null,user.id); //user.Id is ObjectId in mongo db

}); //2. THE COOKIE ATTACHED USER GETS PULLED OUT FROM THE BROWSER


passport.deserializeUser((id,done)=>{
User.findById(id)
.then(user=>{
    done(null,user);
});  //3. REMOVE THE COOKIE AND RECOGNIZE THE USER,THE ID IS NOT GOOGLE ID BUT ID IN DB
});




passport.use(new GoogleStrategy(
    {
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    }, 
    
    (accessToken,refreshToken,profile,done)=>
    
    {
        User.findOne({googleId:profile.id}).then((existingUser)=>{
            if(existingUser){
                done(null,existingUser);

            }else{
                
                new User({googleId:profile.id}) //new model instance
                .save()
                .then(user=>done(null,user)); //this (user) is sent as a promise to serialize
            }
        }) // 4. DESERIALIZED USER THEN SAVED TO THE DATABASE

        //   console.log('accessToken',accessToken);
        //   console.log('refreshTokn',refreshToken);
        //   console.log('profile',profile);
    }
    )
); //new google strategy instance