const { PrismaClient } = require('@prisma/client')
const mockData = require('./_mockData.json')
const prisma = new PrismaClient()

const PrismaService = function() {
  this.cleanDb = async () => {
    await prisma.foodEntry.deleteMany()
    await prisma.user.deleteMany()
  }

  this.insertTestingData = async () => {
    await prisma.user.createMany({
      data: mockData.users
    })
  }

  return this
}

PrismaService.getInstance = () => {
  return prisma
}

module.exports = PrismaService