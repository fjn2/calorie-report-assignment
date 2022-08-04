import { Col, Layout, Row, Typography } from "antd"
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
            <Row>
              <Col span={6}>Email:</Col><Col flex={1}><b>{user.email}</b></Col>
            </Row>
            <Row>
              <Col span={6}>Name:</Col><Col flex={1}><b>{user.name}</b></Col>
            </Row>
            <Row>
              <Col span={6}>Role:</Col><Col flex={1}><b>{user.role}</b></Col>
            </Row>
            <Row>
              <Col span={6}>Calories Limit (Day):</Col><Col flex={1}><b>{user.calorieWarningThreshold} cal</b></Col>
            </Row>
            <Row>
              <Col span={6}>Spend Limit (Month):</Col><Col flex={1}><b>$ 1000</b></Col>
            </Row>
          </div>
          
        </Content>
      </Layout>
    </>
  )
}

export default Profile