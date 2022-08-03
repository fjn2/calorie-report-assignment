import { Layout, DatePicker, Form, Button, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { USER_TYPE } from '../../utils';
import SelectUser from './components/SelectUser';

const { Content } = Layout

const layout = {
  labelCol: {
    span: 8,
  }
};

const FoodDetailComponent = ({
  foodDetail = {},
  user,
  onSave
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
        <Form
          {...layout}
          form={form}
          name="food-detail-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="foodName"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the food!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="calories"
            label="Calories"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99999,
              },
              { required: true, message: 'Please input the amount of calories!' }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99999,
              },
              { required: true, message: 'Please input the price!' }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="whenFoodWasTaken"
            label="When was taken?"
            rules={[{ required: true, message: 'Please input when did you take it!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          { user.role === USER_TYPE.ADMIN && (
            <Form.Item
              name="userId"
              label="User"
              rules={[{ required: true, message: 'Please enter who has taken it!' }]}
            >
              <SelectUser />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default FoodDetailComponent;