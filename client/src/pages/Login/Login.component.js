import { Button, Card, Col, Form, Input, Layout, Row } from 'antd';
import React from 'react';

const { Content } = Layout


const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = ({ onLogin }) => {
  
  const onFinish = (values) => {
    onLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{height:"100vh"}}>
      <Content>
        <Row  type="flex" justify="space-around" align="middle" style={{ height:"100%" }}>
          <Col>
            <h3>Login into the Toptal Food Reporting assigment.</h3>
            <Card>
              <Form
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  email: 'federico@federico.com',
                  password: '12345'
                }}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  style={{ textAlign: 'right' }}
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;