import { DatePicker, Layout, Table, Tabs } from "antd"
import MenuActionBar from "../../components/MenuActionBar"
import useReporting from "../../hook/useReporting"

const { Content } = Layout

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
console.log(foodEntryWeekComparisonReport)
  return (
    <>
      <MenuActionBar />
      <Layout style={{ height: '100vh' }}>
        <Content>
          2022-08-15
          Base date: 
          <DatePicker onChange={onFilterChange} />
          <Tabs>
            <Tabs.TabPane tab="Food Week Comparison" key="1">
              Number of added entries in the last 7 days vs. added entries the week before that.
                <Table  
                  columns={foodWeekComparisonColumns}
                  dataSource={foodEntryWeekComparisonReport}
                  pagination={false}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Calories Per User" key="2">
              The average number of calories added per user for the last 7 days
              <Table  
                columns={avgNumberOfCaloriesPerUserColumns}
                dataSource={avgNumberOfCaloriesPerUserReport}
                pagination={false}
              />
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    </>
  )
}

export default Reporting