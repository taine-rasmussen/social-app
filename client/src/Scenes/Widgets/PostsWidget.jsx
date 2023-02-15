import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sePosts } from 'State';
import PostWidget from './PostWidget';

const PostsWidget = ({ useId, isProfile = false }) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)
  const token = useSleector((state) => state.token)

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
            description={description}
            picturePath={picturePath}
            location={location}
            comments={comments}
            postUserId={userId}
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
