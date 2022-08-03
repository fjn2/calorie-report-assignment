import {
  Route,
  Routes
} from "react-router-dom"
import useApplication from "./hook/useApplication"
import FoodDetail from "./pages/FoodDetail"
import FoodList from "./pages/FoodList"
import Login from "./pages/Login"
import Reporting from "./pages/Reporting"
import { USER_TYPE } from "./utils"

const RoutesComponent = () => {
  const { user } = useApplication()
  console.log('user', user)
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      {
        user.role === USER_TYPE.ADMIN && (
          <>
            <Route exact path="/reporting" element={<Reporting />} />
            <Route exact path="/food-list" element={<FoodList />} />
            <Route exact path="/food-list/:foodId" element={<FoodDetail />} />
          </>
        )
      }
      {
         user.role === USER_TYPE.USER && (
          <>
            <Route exact path="/" element={<FoodList />} />
            <Route exact path="/:foodId" element={<FoodDetail />} />
          </>
        )
      }
    </Routes>
  )
}
    
export default RoutesComponent