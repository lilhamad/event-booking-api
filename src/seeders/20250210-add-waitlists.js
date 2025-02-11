export default {
    up: async (queryInterface) => queryInterface.bulkInsert('waitlists', [
      {
        id:'wbdsher-f92f-4466-bba8-jshdjhsjh',
        userId: 'whshhf-s-sdu-bba8-122150791d5b',
        eventId:'sd7dhsnb-f92f-4466-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('waitlists', {[Op.or]: [{name: 'Adewale'}, {name: 'Olawale'}]});
    }
  };