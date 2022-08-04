import { Card, Layout, List, Typography } from "antd"
import MenuActionBar from "../../components/MenuActionBar"
import useApplication from "../../hook/useApplication"

const { Content } = Layout

const { Title } = Typography

const Profile = () => {
  const {
    user
  } = useApplication()
  console.log('user', user)
  return (
    <>
      <MenuActionBar />
      <Layout style={{ height: '100vh' }}>
        <Content>
          <div style={{ margin: '16px' }}>
            <Title level={3}>Your Profile</Title>
          </div>
          <Card>
            <List size="large">
              <List.Item>
                <List.Item.Meta title="Email" />
                <div>{user.email}</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Name" />
                <div>{user.name}</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Role" />
                <div>{user.role}</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Calories Limit (Day)" />
                <div>{user.calorieWarningThreshold} cal</div>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Spend Limit (Month):" />
                <div>$ 1000</div>
              </List.Item>
            </List>
          </Card>
        </Content>
      </Layout>
    </>
  )
}

export default Profile