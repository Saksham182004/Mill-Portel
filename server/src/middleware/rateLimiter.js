const rateLimit = require("express-rate-limit")


const limiter = rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max:10,
    message:"Too many attempts ,Try again later"
});


module.exports = limiter
