const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const database = require('../models');

//  Protecting Routes
module.exports = catchAsync(async (req, res, next) => {
  let userId =  req.headers.userId || req.body.userId;
const currentUser = await database.users.findOne({
            where: {
               id: userId,
            },
         });
  if (!currentUser) {
    console.log("Invalid user, access denied ");
    return next(
      new AppError('Invalid user, access denied ', 401)
    );
  }
  console.log("Access granted ", currentUser);

  let newUser;
  req.user = currentUser;
  req.body.userId = userId;
  next();
});
