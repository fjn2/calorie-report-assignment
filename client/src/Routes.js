import {
  Route,
  Routes
} from "react-router-dom"
import useApplication from "./hook/useApplication"
import FoodDetail from "./pages/FoodDetail"
import FoodList from "./pages/FoodList"
import Login from "./pages/Login"
import Reporting from "./pages/Reporting"
import Profile from "./pages/Profile"

import { USER_TYPE } from "./utils"

export const PAGES = {
  LOGIN: 'login',
  FOOD_LIST: 'food_list',
  FOOD_LIST_DETAIL: 'food_list_detail',
  REPORTING: 'reporting',
  PROFILE: 'profile',
}

// Secure urls
export const PAGES_ROLE = {
  [USER_TYPE.ADMIN]: {
    [PAGES.FOOD_LIST]: '/food-list',
    [PAGES.FOOD_LIST_DETAIL]: '/food-list/:foodId',
    [PAGES.REPORTING]: '/reporting',
    [PAGES.PROFILE]: '/profile',
  },
  [USER_TYPE.USER]: {
    [PAGES.FOOD_LIST]: '/food-list',
    [PAGES.FOOD_LIST_DETAIL]: '/food-list/:foodId',
    [PAGES.PROFILE]: '/profile',
  }
}

const PAGE_COMPONENT = {
  [PAGES.LOGIN]: <Login />,
  [PAGES.FOOD_LIST]: <FoodList />,
  [PAGES.FOOD_LIST_DETAIL]: <FoodDetail />,
  [PAGES.REPORTING]: <Reporting />,
  [PAGES.PROFILE]: <Profile />,
}

const RoutesComponent = () => {
  const { user } = useApplication()

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      {Object.keys(PAGES_ROLE[user.role] || {}).map((pageKey) => (
        <Route key={pageKey} exact path={PAGES_ROLE[user.role][pageKey] || {}} element={PAGE_COMPONENT[pageKey]} />
      ))}
    </Routes>
  )
}
    
export default RoutesComponent