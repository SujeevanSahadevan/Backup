// const proxy=require('http-proxy-middleware')

// module.exports=function(app){
//     app.use(proxy(['/api','/auth/google'],{target:'http://localhost:5000'}));
// }

//const proxy=require('http-proxy-middleware')
const {createProxyMiddleware}=require('http-proxy-middleware')

module.exports=function(app){
    //app.use(proxy(['/api','/auth/google'],{target:'http://localhost:5000'}));
    app.use(createProxyMiddleware('/auth/google',{target:'http://localhost:5000'}));
    app.use(createProxyMiddleware('/api/**',{target:'http://localhost:5000'}));
};