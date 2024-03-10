import React, { useState } from 'react';
import { Typography, Form, Input, Button } from 'antd';
import axios from 'axios'; // Assuming you use axios for making HTTP requests

const { Title } = Typography;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      setError('');

      // Check if new password matches confirm new password
      if (newPassword !== confirmNewPassword) {
        setError('New password and confirm new password do not match');
        return;
      }

      // Make API call to change password
      const response = await axios.post('/api/change-password', {
        oldPassword,
        newPassword,
      });

      if (response.data.status === 'success') {
        // Password changed successfully
        // You can show a success message or perform any other actions
        console.log('Password changed successfully');
      }
    } catch (error) {
      // Handle error
      setError('Failed to change password');
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3}>Change Password</Title>
      <Form layout="vertical" onFinish={handleChangePassword}>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: 'Please enter your old password' }]}
        >
          <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please enter a new password' }]}
        >
          <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[{ required: true, message: 'Please confirm your new password' }]}
        >
          <Input.Password value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
