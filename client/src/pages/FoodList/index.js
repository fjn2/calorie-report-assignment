import MenuActionBar from "../../components/MenuActionBar"
import useApplication from "../../hook/useApplication"
import useFoodList from "../../hook/useFoodList"
import { PAGES, PAGES_ROLE } from "../../Routes"
import FoodListComponent from './FoodList.component'

const FoodList = () => {
  const { user } = useApplication()
  const {
    createFood,
    deleteFood,
    filters,
    getNextPage,
    hasMore,
    items,
    meta,
    setFilters,
  } = useFoodList()
  
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
        basePath={basePath}
        filters={filters}
        hasMore={hasMore}
        items={items}
        meta={meta}
        onFilterChange={onFilterChange}
        onGetNextPage={getNextPage}
        onItemAdd={onItemAdd}
        onItemRemove={onItemRemove}
        user={user}
      />
    </>
  )
}

export default FoodList
