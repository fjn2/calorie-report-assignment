import { EditOutlined } from '@ant-design/icons'
import { Card, Layout, List, DatePicker, Button, Popconfirm, Empty, Tooltip, Form } from 'antd'
import {
  DeleteOutlined,
  WarningFilled,
  TagsFilled,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { Content } = Layout
const { RangePicker } = DatePicker

const FoodCardDescription = ({
  calories,
  price,
  whenFoodWasTaken
}) => {
  return (
    <List size="small">
      <List.Item>
        Calories: <b>{calories.toLocaleString()} cal</b>
      </List.Item>
      <List.Item>
        Price: <b>$ {price.toFixed(2).toLocaleString()}</b>
      </List.Item>
      <List.Item>
        Taken on: <b>{new Date(whenFoodWasTaken).toLocaleString()}</b>
      </List.Item>
    </List> 
  )
}

const FoodDetailComponent = ({
  items = [],
  filters,
  onFilterChange,
  onItemRemove,
  basePath
}) => {
  const onDateChange = (data) => {
    if (!data) {
      onCleanFilters()
      return
    }
    const [dateFrom, dateTo] = data
    onFilterChange({
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString()
    })
  }

  const onCleanFilters = () => {
    onFilterChange({})
  }

  return (
    <Layout style={{height:"100vh", overflowY: 'scroll'}}>
      <Content>
        <div className="filter-section" style={{margin: '16px'}}>
          <Form.Item label="Date filter">
            <RangePicker showTime onChange={onDateChange} />
          </Form.Item>
        </div>
        <div className="filter-section">
            {
              filters.dateFrom && (
                <Form.Item label="You are filtering by Date" colon={false}>
                  <Button type="link" onClick={onCleanFilters}>Clean Filters</Button>
                </Form.Item>
              )
            }
          </div>
        <div className="card-list">
          {items.map((item) => (
            <Card
              style={{
                width: 300,
              }}
              actions={[
                <Popconfirm
                  title="Are you sure to delete this entry?"
                  onConfirm={() => onItemRemove(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />,
                </Popconfirm>,
                <Link to={`${basePath}/${item.id}`}>
                  <EditOutlined key="edit" />,
                </Link>
              ]}
              key={item.id}
            >
              <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    transform: 'translate3d(50%, -16px, 0)',
                    fontSize: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 100,
                  }} >
                  {item.hasCalorieWarning  && (
                    <Tooltip
                      title={`You are exeded by ${item.totalCaloriesExceded} calories.`}
                    >
                      <WarningFilled style={{
                        color: '#b8b84b',
                      }}  />
                    </Tooltip>
                  )}
                  {item.hasReachSpendingLimit  && (
                    <Tooltip
                      title={`You have expended ${item.totalSpendedInPeriod} in this month.`}
                    >
                      <TagsFilled style={{
                        color: '#32bd39',
                      }}  />
                    </Tooltip>
                  )}
              </div>
              <Meta
                title={item.name}
                description={
                  <FoodCardDescription
                    calories={item.calories}
                    whenFoodWasTaken={item.whenFoodWasTaken}
                    price={item.price}
                  />}
              />
            </Card>
          ))}
          {items.length === 0 && (
            <Empty />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default FoodDetailComponent;