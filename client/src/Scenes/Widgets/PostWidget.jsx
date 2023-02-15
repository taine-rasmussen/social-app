import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from 'Components/WidgetWrapper';
import FlexBetween from 'Components/FlexBetween';
import Friend from 'Components/Friend';
import { useState } from 'react';
import { setPost } from 'State';
import {
  Box,
  Divider,
  Typograpghy,
  Typography,
  useTheme
} from '@mui/material';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlines,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material';

// Models map structure - if user hasn't liked the id will not be present
// likes = {
//   userId1: true,
//   userId2: true,
// }

const PostWidget = (props) => {
  const {
    userPicturePath,
    description,
    picturePath,
    postUserId,
    location,
    comments,
    postId,
    likes,
    name,
  } = props;

  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  // Checks to see if id is present in likes map
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`https://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: loggedInUserId })
    })

    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          scr={`https://localhost:3001/assets/${picturePath}`}
        />
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
