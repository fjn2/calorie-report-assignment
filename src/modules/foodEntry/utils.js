const validateCreationPermison = (value, { req }) => {
  if (req.auth.role === 'USER' && value !== req.auth.userId) {
   throw new Error('You have to be ADMIN to perform this action')
  }
  return true
 }

module.exports = {
  validateCreationPermison
}