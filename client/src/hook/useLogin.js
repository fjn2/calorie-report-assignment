import { notification } from "antd"
import { loginSvc, meSvc } from "../service/login.service"
import useLocalStorage from "./useLocalStorage"

const useLogin = () => {
  const [,setAccessToken] = useLocalStorage('auth_token')
  const login = ({
    email,
    password
  }) => {
    return loginSvc({
      email,
      password
    }).then(data => {
      setAccessToken(data.auth_token)
      return meSvc()
    }).catch((e) => {
      notification.error({
        message: e.message
      })
    })
  }
  return {
    login
  }
}

export default useLogin