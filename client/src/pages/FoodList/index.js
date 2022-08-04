import MenuActionBar from "../../components/MenuActionBar"
import useApplication from "../../hook/useApplication"
import useFoodList from "../../hook/useFoodList"
import { PAGES, PAGES_ROLE } from "../../Routes"
import FoodListComponent from './FoodList.component'

const FoodList = () => {
  const { user } = useApplication()
  const { items, filters, setFilters, deleteFood, createFood } = useFoodList()
  
  const onItemAdd = (data) => {
    createFood(data)
  }

  const onItemRemove = (item) => {
    deleteFood(item.id)
  }

  const onFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const basePath = PAGES_ROLE[user.role][PAGES.FOOD_LIST]

  return (
    <>
      <MenuActionBar />
      <FoodListComponent
        items={items}
        filters={filters}
        onFilterChange={onFilterChange}
        onItemRemove={onItemRemove}
        onItemAdd={onItemAdd}
        basePath={basePath}
        user={user}
      />
    </>
  )
}

export default FoodList
