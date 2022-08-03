import { Select } from "antd"

const { default: useUserList } = require("../../../hook/useUserList")

const SelectUser = ({
  value,
  onChange
}) => {
  const { items: users } = useUserList()

  return (
    <Select onChange={onChange} value={value}>
      {
        (users || []).map((user) => (
          <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
        ))
      }
    </Select>
  )
}

export default SelectUser
