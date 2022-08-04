import moment from 'moment'
import { Alert, DatePicker, Form, Layout, Table, Tabs, Typography } from "antd"
import MenuActionBar from "../../components/MenuActionBar"
import useReporting from "../../hook/useReporting"

const { Content } = Layout
const { Title } = Typography

const foodWeekComparisonColumns = [
  {
    title: 'Day',
    dataIndex: 'dayOfWeek',
    key: 'dayOfWeek',
  },
  {
    title: 'Last Week',
    dataIndex: 'lastWeekCount',
    key: 'lastWeekCount',
  },
  {
    title: 'This week',
    dataIndex: 'thisWeekCount',
    key: 'thisWeekCount',
  },
  {
    title: 'Relation',
    dataIndex: 'relation',
    key: 'relation',
  }
]

const avgNumberOfCaloriesPerUserColumns = [{
  title: 'User',
  dataIndex: 'userName',
  key: 'userName',
},
{
  title: 'Avg. calories in the last 7 days',
  dataIndex: 'avgCaloriesLast7Days',
  key: 'avgCaloriesLast7Days',
}]

const Reporting = () => {
  const {
    setFilters,
    avgNumberOfCaloriesPerUserReport,
    foodEntryWeekComparisonReport,
  } = useReporting()

  const onFilterChange = (date) => {
    setFilters({ date: date.toISOString() })
  }

  return (
    <>
      <MenuActionBar />
      <Layout style={{ height: '100vh' }}>
        <Content>
          <div style={{margin: '16px'}}>
            <Title level={3}>Reporting</Title>
            <Form.Item label="Base date">
              <DatePicker onChange={onFilterChange} defaultValue={moment()} />
            </Form.Item>
            <Tabs>
              <Tabs.TabPane tab="Food Week Comparison" key="1">
                  <Alert
                    message="Number of added entries in the last 7 days vs. added entries the week before that."
                    type="info"
                    showIcon
                    closable
                  />
                
                  <Table  
                    columns={foodWeekComparisonColumns}
                    dataSource={foodEntryWeekComparisonReport}
                    pagination={false}
                  />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Calories Per User" key="2">
                <Alert
                  message="The average number of calories added per user for the last 7 days."
                  type="info"
                  showIcon
                  closable
                />
                <Table  
                  columns={avgNumberOfCaloriesPerUserColumns}
                  dataSource={avgNumberOfCaloriesPerUserReport}
                  pagination={false}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default Reporting