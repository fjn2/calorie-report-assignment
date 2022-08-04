import { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { meSvc } from '../service/login.service'
import { useNavigate } from 'react-router-dom'


export const StoreContext = createContext({})

export const ApplicationContext = ({ children }) => {
  const [user, setUser] = useState({})
  const navigation = useNavigate()
  
  useEffect(() => {
    meSvc().then(user => {
      setUser(user)
    }).catch(() => {
      navigation('/login')
    })
  }, [navigation])

  const logout = () => {
    localStorage.removeItem('auth_token')
    navigation('/login')
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        logout
      }}
    >
      {user ? (
        children
      ) : (
        'Loading...'
      )}
    </StoreContext.Provider>
  )
}

ApplicationContext.propTypes = {
  children: PropTypes.node.isRequired,
}

const useApplication = () => useContext(StoreContext)

export default useApplication
