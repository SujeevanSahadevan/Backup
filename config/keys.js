//keys.js figure out what set pf credentials to return


if(process.env.NODE_ENV==='production'){

    module.exports =require('./prod');
//we are in production-return the prod set of keys
}else{

 module.exports =  require('./dev');
//we are in dev-return the dev keys
}


// module.exports={
//     googleClientID: '908144624576-mdlvjtsv0vnrlr1ebd12flq4m04b25k3.apps.googleusercontent.com',
//     googleClientSecret:'i8kbYYl_F7ljfXYcPIUkVrJr',
//     mongoURI: 'mongodb+srv://sujeevan:1234@emaily.grpws.mongodb.net/emaily?retryWrites=true&w=majority',
//     cookieKey:'mycookiekey'
// };