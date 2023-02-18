import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'State';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(
    () => {
      if (isProfile) {
        getUserPosts()
      } else {
        getPosts();
      }
    }, []);

  return (
    <>
      {posts.map(
        ({
          userPicturePath,
          description,
          picturePath,
          firstName,
          lastName,
          location,
          comments,
          userId,
          likes,
          _id,
        }) => (
          <PostWidget
            name={`${firstName} ${lastName}`}
            userPicturePath={userPicturePath}
            getUserPosts={getUserPosts}
            description={description}
            picturePath={picturePath}
            isProfile={isProfile}
            location={location}
            comments={comments}
            postUserId={userId}
            getPosts={getPosts}
            likes={likes}
            postId={_id}
            key={_id}
          />
        )
      )}

    </>
  )
}

export default PostsWidget
