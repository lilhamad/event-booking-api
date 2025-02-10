const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');

//setupTestDB();

describe('Event Booking Endpoints', () => {
  describe('POST /v1/initialize', () => {
    let newEvent,  eventId;


    beforeEach(() => {
      newEvent = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    test('should return 201 and successfully create new event if data is ok', async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post('/v1/initialize')
        .send({
          title: "NG Hckatom 3.0 ",
          date: "2025-07-15",
          venue: "South Hall",
          capacity: 2,
        });
        expect(httpStatus.CREATED);
    });

    test("Admin can create an event", async () => {
      const res = await request(app)
        .post("/initialize")
        .send({
          title: "Tech Conference",
          date: "2025-06-15",
          venue: "Main Hall",
          capacity: 2,
        });
  
      expect(res.statusCode).toBe(201);
      eventId = res.body._id;
    });

    test("Event capacity should not be empty", async () => {
      const res = await request(app)
        .post("/api/events")
        .send({
          title: "Empty Capacity Event",
          date: "2025-07-20",
          venue: "Open Arena",
          capacity: "", // Empty capacity
        });
    
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Capacity is required and must be a number");
    });
    
    test("Event capacity should be an integer", async () => {
      const res = await request(app)
        .post("/api/events")
        .send({
          title: "Invalid Capacity Event",
          date: "2025-07-20",
          venue: "Main Hall",
          capacity: "five", // Invalid non-integer capacity
        });
    
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Capacity must be a valid integer");
    });
  
    test("User can book an event", async () => {
      const res = await request(app)
        .post(`/book/${eventId}`)
  
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Booking successful");
    });
  
    test("Event cannot be overbooked", async () => {
      // Book event twice to reach capacity
      await request(app)
      .post(`/book/${eventId}`)
  
      // Third attempt should fail
      const res = await request(app)
      .post(`/book/${eventId}`)
  
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Event is fully booked");
    });
  
    test("User can cancel a booking", async () => {
      const booking = await Booking.findOne({ user: userToken });
      const res = await request(app)
        .delete(`/cancel/${booking._id}`)
  
      expect(res.statusCode).toBe(204);
    });
   
  });
});
