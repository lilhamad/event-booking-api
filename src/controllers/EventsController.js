const Event = require('../models/Event');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const database = require('../models');


const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {

   const users = await Event.find();

   // SEND RESPONSE
   res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
         users,
      },
   });
});

exports.createUser = catchAsync(async (req, res, next) => {
   console.log("HERE to create ", req.body);
   //console.log("database 1", database);
   console.log("database 3", database.events);
   const isEventCreated = await database.events.create(req.body);
   const isEventCreated2 = await database.Event.create(req.body);
   console.log("*******isEventCreated ", isEventCreated);
   console.log("*******isEventCreated 2 ", isEventCreated2);
   console.log("database 2", database.Event.create());

   // const newUser = await Event.create({
   //    name: req.body.name,
   //    date: new Date,
   //    venue: req.body.venue,
   //    capacity: req.body.capacity
   // });

   if (!isEventCreated)
      return res.status(400).json({
         status: 'failed',
         message: `Can't create user due to invalid details`,
      });

   res.status(200).json({
      status: 'success',
      user: newUser,
   });
});

exports.updateUser = catchAsync(async (req, res, next) => {
   // 1) Create error if user POSTs password data
   if (req.body.password || req.body.passwordConfirm) {
      return next(
         new AppError(
            'This route is not for password updates. Please use /updateMyPassword.',
            400
         )
      );
   }

   // 2) Filtered out unwanted fields names that are not allowed to be updated
   const filteredBody = filterObj(req.body, 'name', 'email');

   // 3) Update user document
   const updatedUser = await Event.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser,
      },
   });
});

exports.getUser = catchAsync(async (req, res, next) => {
   const user = await Event.findById(req.params.id);

   if (!user)
      return res.status(404).json({
         status: 'failed',
         message: `No Event found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      user,
   });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
   const deletedUser = await Event.findByIdAndDelete(req.params.id);

   if (!deletedUser)
      return res.status(404).json({
         status: 'failed',
         message: `No Event found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      user: deletedUser,
   });
});
