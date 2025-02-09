const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
//const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../src/models');
const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

//setupTestDB();

describe('Event Booking Endpoints', () => {
  describe('POST /v1/initialize', () => {
    let newEvent;

    beforeEach(() => {
      newEvent = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post('/v1/initialize')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({
          title: "NG Hckatom 3.0 ",
          date: "2025-07-15",
          venue: "South Hall",
          capacity: 2,
        });
        expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: false,
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: newUser.role, isEmailVerified: false });
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
  
    test("User can book an event", async () => {
      const res = await request(app)
        .post(`/book/${eventId}`)
  
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Booking successful");
    });
  
    test("Event cannot be overbooked", async () => {
      // Book event twice to reach capacity
      await request(app)
        .post(`/api/events/${eventId}/book`)
        .set("Authorization", `Bearer ${userToken}`);
  
      // Third attempt should fail
      const res = await request(app)
        .post(`/api/events/${eventId}/book`)
        .set("Authorization", `Bearer ${userToken}`);
  
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Event is fully booked");
    });
  
    test("User can cancel a booking", async () => {
      const booking = await Booking.findOne({ user: userToken });
      const res = await request(app)
        .delete(`/cancel/${booking._id}`)
        .set("Authorization", `Bearer ${userToken}`);
  
      expect(res.statusCode).toBe(204);
    });
   
  });
});
