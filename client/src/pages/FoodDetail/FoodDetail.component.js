import { Layout, DatePicker, Form, Button, Input, InputNumber, Typography, Card } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USER_TYPE } from '../../utils';
import SelectUser from './components/SelectUser';

const { Content } = Layout
const { Title } = Typography

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const FoodDetailComponent = ({
  foodDetail = {},
  user,
  onSave,
  foodListPath
}) => {
  const { name, price, whenFoodWasTaken, calories, userId } = foodDetail
  const [form] = Form.useForm()
  const onFinish = (values) => {
    values.name = values.foodName
    delete values.foodName
    onSave(values)
  }

  useEffect(() => {
    form.setFieldsValue({
      foodName: name,
      price,
      whenFoodWasTaken,
      calories,
      userId
    })
  },[form, name, price, whenFoodWasTaken, calories, userId])

  return (
    <Layout style={{height:"100vh"}}>
      <Content>
        <div style={{ margin: '16px' }}>
          <Title level={3}>Food Entry Detail</Title>
        </div>
        <Card style={{margin: '16px'}}>
          <Form
            form={form}
            name="food-detail-form"
            onFinish={onFinish}
            style={{maxWidth: '500px', margin: '16px auto'}}
            labelAlign="left"
          >
            <Form.Item
              name="foodName"
              label="Name"
              tooltip="What have you eaten? (ie Hamburder with fries)"
              rules={[{ required: true, message: 'Please input the name of the food!' }]}
              {...formItemLayout}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="calories"
              label="Calories"
              tooltip="How many calories does it have? (ie 5000)"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99999,
                },
                { required: true, message: 'Please input the amount of calories!' }
              ]}
              {...formItemLayout}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              tooltip="How much did it cost?"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99999,
                },
                { required: true, message: 'Please input the price!' }
              ]}
              {...formItemLayout}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="whenFoodWasTaken"
              label="Date"
              tooltip="When was the food taken?"
              rules={[{ required: true, message: 'Please input when did you take it!' }]}
              {...formItemLayout}
            >
              <DatePicker showTime />
            </Form.Item>
            { user.role === USER_TYPE.ADMIN && (
              <Form.Item
                name="userId"
                label="User"
                rules={[{ required: true, message: 'Please enter who has taken it!' }]}
                {...formItemLayout}
              >
                <SelectUser />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ ...formItemLayout }} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Link to={foodListPath} style={{ marginLeft: '4px' }}>
                <Button>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default FoodDetailComponent;