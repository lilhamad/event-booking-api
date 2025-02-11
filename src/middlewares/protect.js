const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const database = require('../models');
const middleware = require('express-mongo-sanitize');
const { use } = require('passport');

//  Protecting Routes
module.exports = catchAsync(async (req, res, next) => {
  let userId =  req.headers.userId || req.body.userId;
  if(userId!= undefined || userId!= null){
    const currentUser = await database.users.findOne({
      where: {
        id: userId,
      },
    });
    
    if (!currentUser) {
      console.log("Invalid user, access denied ");
      //comment out the next line to activate the middleware
      
      next();
      // return next(
      //   new AppError('Invalid user, access denied ', 401)
      // );
    }
    let newUser;
    req.user = currentUser;
    req.body.userId = userId;
  }
  
  next();
});
