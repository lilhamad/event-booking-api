export default {
    up: async (queryInterface) => queryInterface.bulkInsert('orders', [
      {
        id:'mbgherr-f92f-4466-bba8-122150791d5b',
        userId: 'ernne-f92f-4466-bba8-122150791d5b',
        eventId:'sd7dhsnb-f92f-4466-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id:'herbde-f92f-4466-bba8-122150791d5b',
        userId: 'fh7dhsnb-s-sdu-bba8-122150791d5b',
        eventId:'x7dhsnb-f92f-sdu-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('orders', {[Op.or]: [{name: 'Adewale'}, {name: 'Olawale'}]});
    }
  };