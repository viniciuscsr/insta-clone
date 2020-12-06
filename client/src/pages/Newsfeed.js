import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import PostCard from '../shared/UIElements/PostCard';
import { useHttpClient } from '../shared/hooks/http-hook';
import axios from 'axios';

const Newsfeed = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [posts, setPosts] = useState();

  const SERVER_URL = 'http://localhost:5000';
  const { token, userId } = auth;
  console.log('userId:' + userId);
  const storageToken = localStorage.getItem('token');
  const storageUserId = localStorage.getItem('userId');
  console.log('storageToken: ' + storageToken);
  console.log('storageUserId: ' + storageUserId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post(
          SERVER_URL + '/posts/',
          { userId: storageUserId },
          { headers: { Authorization: 'Bearer ' + storageToken } }
        );
        const responseData = await res.json();
        setPosts('responseData');
        console.log('RES.DATA ' + responseData);
        console.log('POST ' + posts);
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  return (
    <div></div>
    //   className='container post-container w-75 p-3 border rounded'
    //   {...posts.map((post) => (
    //     <PostCard
    //       title={post.title}
    //       image={post.image}
    //       caption={post.caption}
    //     />
    // ))}>
    // </div>
  );
};

export default Newsfeed;
