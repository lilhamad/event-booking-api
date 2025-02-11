export default {
    up: async (queryInterface) => queryInterface.bulkInsert('users', [
      {
        name: 'Adewale',
        id:'ernne-f92f-4466-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Olawale',
        id:'fh7dhsnb-s-sdu-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Ogbonna',
        id:'whshhf-s-sdu-bba8-122150791d5b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', {[Op.or]: [{name: 'Adewale'}, {name: 'Olawale'}]});
    }
  };