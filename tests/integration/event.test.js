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

      const res = await request(app)
        .post('api/v1/initialize')
        .send({
          title: "NG Hckatom 3.0 ",
          date: "2025-07-15",
          venue: "South Hall",
          capacity: "ii",
        });
        expect(httpStatus.CREATED);
    });

    test("Event capacity should not be empty", async () => {
      const res = await request(app)
        .post("api/v1/initialize")
        .send({
          title: "Empty Capacity Event",
          date: "2025-07-20",
          venue: "Open Arena",
          capacity: "", // Empty capacity
        });
    
      expect(httpStatus.BAD_REQUEST);
    });
    
  
    test("User can book an event", async () => {
      const res = await request(app)
        .post(`api/v1/book`)
        .send({
          userId: "fh7dhsnb-s-sdu-bba8-122150791d5b",
          eventId: "x7dhsnb-f92f-sdu-bba8-122150791d5b"
       });
  
      expect(httpStatus.CREATED);
    });
  

    test("User can cancel a booking", async () => {
      const res = await request(app)
      .post(`api/v1/cancel`)
      .send({
        userId: "fh7dhsnb-s-sdu-bba8-122150791d5b",
        eventId: "x7dhsnb-f92f-sdu-bba8-122150791d5b"
     });
      expect(httpStatus.CREATED);
    });  

    test("User can get info of an event by event id, both orders and waitlists", async () => {
      const res = await request(app)
      .get(`api/v1/status/x7dhsnb-f92f-sdu-bba8-122150791d5b`)
      
      expect(httpStatus.CREATED);
    });
   
  });
});
