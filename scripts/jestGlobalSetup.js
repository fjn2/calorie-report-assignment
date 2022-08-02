const PrismaService = require("../src/modules/prisma/prisma.service");

module.exports = async () => {
  const prismaService = new PrismaService()
  console.log('\nCleaning DB...');
  await prismaService.cleanDb()
  console.log('\nCleaning OK');
  console.log('\nInsertData for testing...');
  await prismaService.insertTestingData()
  console.log('\nInsertData for testing OK');
};