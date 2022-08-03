import { useNavigate } from "react-router-dom"
import useApplication from "../../hook/useApplication"
import useLogin from "../../hook/useLogin"
import LoginComponent from './Login.component'

const Login = () => {
  const { login } = useLogin()
  const { setUser } = useApplication()
  const navigate = useNavigate()

  const onLogin = (data) => {
    login(data).then((user) => {
      setUser(user)
      navigate('/')
    })
  }

  return (
    <LoginComponent
      onLogin={onLogin}
    />
  )
}

export default Login