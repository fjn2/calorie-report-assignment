import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { Card, Layout, List, DatePicker, Button, Popconfirm, Empty, Tooltip, Form, Typography } from 'antd'
import {
  DeleteOutlined,
  WarningFilled,
  TagsFilled,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { USER_TYPE } from '../../utils'

const { Meta } = Card
const { Content } = Layout
const { RangePicker } = DatePicker
const { Title } = Typography

const getRangePickerValue = (filters) => {
  if (filters && filters.dateFrom) {
    return [moment(filters.dateFrom), moment(filters.dateTo)]
  } else {
    return [null, null]
  }
}

const FoodCardDescription = ({
  calories,
  price,
  whenFoodWasTaken,
  username
}) => {
  return (
    <List size="small">
      {username && (
        <List.Item>
          User: <b>{username}</b>
        </List.Item>  
      )}
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
  basePath,
  filters,
  items = [],
  onFilterChange,
  onGetNextPage,
  onItemRemove,
  user,
  hasMore
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
        <div style={{ margin: '16px' }}>
          <Title level={3}>Food List</Title>
        </div>
        <Card style={{margin: '16px'}}>
          <Form.Item label="Date filter">
            <RangePicker showTime onChange={onDateChange} value={getRangePickerValue(filters)} />
          </Form.Item>
        </Card>
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
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
                <Link to={`${basePath}/${item.id}`}>
                  <EditOutlined key="edit" />
                </Link>
              ]}
              key={item.id}
            >
              <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '32px',
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    transform: 'translate3d(50%, -16px, 0)',
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
                      title={`You have expended $ ${item.totalSpendedInPeriod} in this month.`}
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
                    username={user.role === USER_TYPE.ADMIN ? item.user.name : null}
                  />}
              />
            </Card>
          ))}
          {items.length === 0 && (
            <Empty />
          )}
          <div style={{width: '100%', textAlign: 'center'}}>
            {items.length > 0 && hasMore && (
              <Button onClick={onGetNextPage}>Get more items</Button>
            )}
          </div>
          
        </div>
       
      </Content>
    </Layout>
  );
};

export default FoodDetailComponent;