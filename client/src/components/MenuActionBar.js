import { Button } from "antd"
import { Link } from "react-router-dom"
import useApplication from "../hook/useApplication"
import { PAGES, PAGES_ROLE } from "../Routes"

const MenuActionBar = () => {
  const { logout, user } = useApplication()

  const onLogout = () => {
    logout()
  }

  const reportingPath = PAGES_ROLE[user.role][PAGES.REPORTING]
  const foodbasePath = PAGES_ROLE[user.role][PAGES.FOOD_LIST]
  const profilePath = PAGES_ROLE[user.role][PAGES.PROFILE]

  const isReportingScreenButtonVisible = reportingPath !== window.location.pathname
  const isFoodListButtonVisible = foodbasePath !== window.location.pathname
  const isProfileButtonVisible = profilePath !== window.location.pathname
  return (
    <div className="menu-action-bar" style={{ position: 'fixed' }}>
      <Link to={`${foodbasePath}/new`}>
        <Button type="link">Add Food</Button>
      </Link>
      {isReportingScreenButtonVisible && reportingPath && (
        <Link to={`${reportingPath}`}>
        <Button type="link">Reporting</Button>
      </Link>
      )}
      {isFoodListButtonVisible && (
        <Link to={`${foodbasePath}`}>
          <Button type="link">Food List</Button>
        </Link>
      )}
      {isProfileButtonVisible && profilePath && (
        <Link to={`${profilePath}`}>
          <Button type="link">Profile</Button>
        </Link>
      )}
      <Button onClick={onLogout} type="link">Logout</Button>
    </div>
  )
}

export default MenuActionBar