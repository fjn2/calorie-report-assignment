import { useNavigate, useParams } from "react-router-dom"
import useApplication from "../../hook/useApplication"
import useFoodDetail from "../../hook/useFoodDetail"
import FoodDetailComponent from './FoodDetail.component'

const FoodDetail = () => {
  const params = useParams()
  const navigation = useNavigate()
  const { user } = useApplication()

  const { foodDetail, updateFood, createFood } = useFoodDetail(params.foodId)

  const onSave = (data) => {
    let action
    if (params.foodId === 'new') {
      action = createFood(data)
    } else {
      action = updateFood(data)
    }
    action.then(() => {
      navigation('/')
    })
  }

  return (
    <FoodDetailComponent
      foodDetail={foodDetail}
      user={user}
      onSave={onSave}
    />
  )
}

export default FoodDetail
