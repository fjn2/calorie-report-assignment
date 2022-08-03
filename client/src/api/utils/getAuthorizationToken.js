export const getAuthorizationToken = () => {
  try {
    return `Bearer ${JSON.parse(localStorage.getItem('auth_token'))}`
  } catch {
    console.log('Error on get user')
  }
  return ''
}
