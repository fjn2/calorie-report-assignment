import { EditOutlined } from '@ant-design/icons'
import { Avatar, Card, Layout, List, DatePicker, Typography, Button, Popconfirm, Empty } from 'antd'
import {
  DeleteOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { Content } = Layout
const { RangePicker } = DatePicker
const { Text } = Typography

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
  onItemEdit,
  onItemAdd,
}) => {
  const onDateChange = (data) => {
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
    <Layout style={{height:"100vh"}}>
      <Content>
        <div className="filter-section">
          <RangePicker showTime onChange={onDateChange} />
        </div>
        <Link to="/new">
          <Button>Add Food</Button>
        </Link>
        <div className="filter-section">
            {
              filters.dateFrom && (
                <>
                  <Text>You are filtering from {filters.dateFrom.toLocaleString()} to {filters.dateTo}</Text>
                  <Button type="link" onClick={onCleanFilters}>Clean Filters</Button>
                </>
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
                <Link to={`/${item.id}`}>
                  <EditOutlined key="edit" />,
                </Link>
              ]}
              key={item.id}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
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