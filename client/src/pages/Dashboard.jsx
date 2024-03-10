import React, { useEffect, useState } from 'react';
import { Card, Typography, List, Spin, Input, Button, Form } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import ChangePassword from './ChangePassword';

const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
  const { userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  
  
  // State for new post form
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5173/api/posts?page=${page}`); // Update the URL to the correct API endpoint
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to handle new post submission
  const handleNewPostSubmit = async () => {
    try {
      // Update the API endpoint to match your actual setup
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include your authorization header if required
          // 'Authorization': `Bearer ${yourAccessToken}`,
        },
        body: JSON.stringify({
          content: newPostContent,
        }),
      });

      if (response.ok) {
        // Post created successfully, fetch the updated posts
        setNewPostContent(''); // Clear the new post content
        setPage(1);
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Profile section */}
      <div className="mt-8 mb-4 flex items-center justify-between">
        <div>
          <Title level={2} className="text-2xl">Welcome, {userData?.name}!</Title>
        </div>
        <div className="flex items-center space-x-4">
        <ChangePassword />
          <LogoutButton />
        </div>
      </div>

      {/* Form to add new posts */}
      <Form layout="vertical" className="mb-8">
        <Form.Item label="New Post">
          <TextArea
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleNewPostSubmit}>
            Add Post
          </Button>
        </Form.Item>
      </Form>

      {/* List of posts */}
      <List
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card title={post.title} style={{ width: '100%' }}>
              {post.content}
            </Card>
          </List.Item>
        )}
        loading={loading}
        loadMore={posts.length && !loading && <div className="text-center my-8"><Spin /></div>}
        grid={{ gutter: 16, column: 3 }}
        loadMoreSize={10}
        onScroll={handleLoadMore}
      />
    </div>
  );
};

export default Dashboard;
