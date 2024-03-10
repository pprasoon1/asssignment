import React from "react";
import { Card, Flex, Input, Typography, Form, Spin, Button, Alert } from "antd";

import registerImage from '../assets/register.png';
import useSignup from '../hooks/useSignup';
import 'tailwindcss/tailwind.css';

const Register = ({ onRegisterSuccess }) => {
  const { loading, error, registerUser } = useSignup();
 

  const handleRegister = async (values) => {
    const success = await registerUser(values);
    if (success) {
      onRegisterSuccess(); // Call the onRegisterSuccess function
      // Redirect to dashboard
    }
  };


  return (
    <Card className="form-container p-8 max-w-md mx-auto bg-white shadow-md rounded-md">
      <Flex gap='large' align="center" className="lg:flex-row md:flex-col">
        <Flex vertical flex={1} className="text-center lg:text-left">
          <Typography.Title level={3} strong className="text-3xl font-bold mb-4">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="text-gray-600 mb-6">
            Join us now!
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your full name",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email'
                }
              ]}
            >
              <Input size="large" placeholder="Enter your Email" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Re-enter Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Re-enter your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Re-enter your password" className="w-full" />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert mt-4"
              />
            )}

            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                size="large"
                className="btn w-full"
              >
                {loading ? <Spin /> : 'Create Account'}
              </Button>
            </Form.Item>

          </Form>
        </Flex>

        <Flex flex={1} className="lg:mt-0 md:mt-8">
          <img src={registerImage} className="auth-image object-cover w-full h-full" alt="Register" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
