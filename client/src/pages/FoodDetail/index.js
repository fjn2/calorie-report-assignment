import { notification } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import MenuActionBar from "../../components/MenuActionBar"
import useApplication from "../../hook/useApplication"
import useFoodDetail from "../../hook/useFoodDetail"
import { PAGES, PAGES_ROLE } from "../../Routes"
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
      notification.success({
        description: 'Operation successful'
      })
      navigation(PAGES_ROLE[user.role][PAGES.FOOD_LIST])
    })
  }

  return (
    <>
      <MenuActionBar />
      <FoodDetailComponent
        foodDetail={foodDetail}
        user={user}
        onSave={onSave}
      />
    </>
  )
}

export default FoodDetail
