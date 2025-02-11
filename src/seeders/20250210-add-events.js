export default {
    up: async (queryInterface) => queryInterface.bulkInsert('events', [
      {
        name: 'Eko show',
        venue: "National stadium",
        capacity: 3,
        booked: 2,
        date: '2025-02-10',
        id:'sd7dhsnb-f92f-4466-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Abuja show',
        venue: 'Big hall',
        capacity: 4,
        booked: 2,
        date: '2025-02-10',
        id:'x7dhsnb-f92f-sdu-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('events', {[Op.or]: [{name: 'Adewale'}, {name: 'Olawale'}]});
    }
  };