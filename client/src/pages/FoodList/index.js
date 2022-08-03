import useFoodList from "../../hook/useFoodList"
import FoodListComponent from './FoodList.component'

const FoodList = () => {
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

  return (
    <FoodListComponent
      items={items}
      filters={filters}
      onFilterChange={onFilterChange}
      onItemRemove={onItemRemove}
      onItemAdd={onItemAdd}
    />
  )
}

export default FoodList
