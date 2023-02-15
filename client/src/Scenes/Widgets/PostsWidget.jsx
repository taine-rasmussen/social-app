import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sePosts } from 'State';
import PostWidget from './PostWidget';

const PostsWidget = ({ useId, isProfile = false }) => {

  const dispatch = useDispatch();
  const posts = useSlector((state) => state.posts)
  const token = useSlector((state) => state.token)

  const getPosts = async () => {
    const response = await fetch('https://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`https://localhost:3001/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };



  return (
    <div>

    </div>
  )
}

export default PostsWidget
