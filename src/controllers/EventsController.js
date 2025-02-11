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


exports.createEvent = catchAsync(async (req, res, next) => {
   const isEventCreated = await database.events.create(req.body);
   console.log("*******isEventCreated ", isEventCreated);
   
   if (!isEventCreated)
      return res.status(400).json({
      status: 'failed',
      message: `Can't create event due to invalid details`,
   });
   
   res.status(200).json({
      status: 'success',
      user: isEventCreated,
   });
});


exports.bookEvent = catchAsync(async (req, res, next) => {
   const event = await database.events.findOne({
      where: {
         id: req.body.eventId,
      },
   });
   console.log("*******isEventBooked ", event);
   
   
   if (!event){
      return res.status(400).json({
         status: 'failed',
         message: `Can't ind event with the provided id`,
      });
   }
   if(event.booked < event.capacity){
      const isOrderCreated = await database.orders.create(req.body);
      console.log("*******isOrderCreated ", isOrderCreated);
      
      let isUpdateEvent =  await database.events.update({booked: event.booked +1 }, { where: { id: event.id } });
      console.log("*******isUpdateEvent ", isUpdateEvent);
      res.status(200).json({
         status: 'success',
         data: isOrderCreated,
         message : "Your event ticket has been successfully booked ticket"
      });
   }else{
      console.log("*******YOU VE ENTERED WAITLIST " );
      const isWaitListCreated = await database.waitlists.create(req.body);
      console.log("*******isWaitListCreated ", isWaitListCreated);
      res.status(200).json({
         status: 'success',
         data: isWaitListCreated,
         message : "Event has been sold  out , but we've nowadded you to our waitlist"
      });
   }
   
});

exports.cancelEvent = catchAsync(async (req, res, next) => {

   let x = await database.sequelize.transaction(async (t) => {
      try {
         const event = await database.events.findOne({
            where: {
               id: req.body.eventId,
            },
         });
         console.log("*******isEventBooked ", event);
         if (!event){
            return res.status(400).json({
               status: 'failed',
               message: `Can't ind event with the provided id`,
            });
         }
         if(event.booked < event.capacity){
            //remove 1 from booked ticket number
            let isUpdateEvent =  await database.events.update({booked: event.booked -1 }, { where: { id: event.id } });
            console.log("*******isUpdateEvent ", isUpdateEvent);
            
            //uppdddate order to cance as we don't want todelete for record keeping
            let iscancelOrder =  await database.orders.update({status: 'canceled' }, { where: { userId: req.body.userId, eventId: req.body.eventId } });
            console.log("*******iscancelOrder ", iscancelOrder);
            res.status(200).json({
               status: 'success',
               data: iscancelOrder,
               message : "Your event ticket has been successfully canceled"
            });
         } else{
            
            
            // find the order to be canceled
            const order = await database.orders.findOne({where: { userId: req.body.userId, 
               eventId: req.body.eventId
            }}).then(function (record) {
               return record.update({status: 'canceled'});
            });
            console.log("*******order ", order);
            
            
            if (!order){
               return res.status(400).json({
                  status: 'failed',
                  message: `Can't find an ticket order with the provided id`,
               });
            }
            //find the oldest guy on the waitlist to add to new order but our booked number remain the same
            const oldestWaitlist = await database.waitlists.findOne({where: {  
               eventId: req.body.eventId},
               order: [ [ 'createdAt', 'ASC' ]]
            });
            console.log("*******oldestWaitlist ", oldestWaitlist);
            if (!oldestWaitlist){
               
               //create order for oldest waitlist guy
               const isOrderCreated = await database.orders.create({userId:oldestWaitlist.userId, eventId : oldestWaitlist.eventId});
               console.log("*******isOrderCreated ", isOrderCreated);
               
               //delete oldest guy fro waitlist
               const isWaitListDeleted = await database.waitlists.delete({ where: { id:oldestWaitlist.id } });
               console.log("*******isWaitListDeleted ", isWaitListDeleted);
            }
            res.status(200).json({
               status: 'success',
               message : "Event successfully canceled"
            });
         }
      } catch (error) {
         // Rollback the transaction if an error occurs
         await t.rollback();
         console.error('Transaction rolled back due to an error:', error);
      }
   })
   .catch((error) => {
      console.error('Transaction failed to initialize:', error);
   })
   .finally(() => {
      // Close the database connection
      sequelize.close();
   });
   
});

