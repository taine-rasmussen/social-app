import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from 'Components/WidgetWrapper';
import FlexBetween from 'Components/FlexBetween';
import Friend from 'Components/Friend';
import { useState } from 'react';
import { setPost } from 'State';
import {
  Box,
  Divider,
  Typography,
  useTheme,
  IconButton,
  InputBase
} from '@mui/material';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

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
    getPosts,
    postId,
    likes,
    name,
  } = props;

  const [isComments, setIsComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { firstName, lastName } = useSelector((state) => state.user);

  const fullName = `${firstName} ${lastName}`;

  // Checks to see if id is present in likes map
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchComment = async () => {
    const resposne = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        comment: newComment,
        name: fullName
      })
    });
    const updatedPost = await resposne.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment('');
    getPosts();
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={primary} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: medium }} />
              )}
            </IconButton>
            <Typography>
              {likeCount}
            </Typography>
          </FlexBetween>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box
              key={`${name}-${i}`}
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Divider />
              <Typography sx={{ color: primary, m: '0.5rem 0', pl: '1rem' }}>
                {`${comment.name}:`}
              </Typography>
              <Typography sx={{ color: medium, m: '0.5rem 0', pl: '1rem' }}>
                {comment.comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween>
            <InputBase
              placeholder="Add new comment..."
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              sx={{
                width: '90%',
                backgroundColor: palette.neutral.light,
                borderRadius: '1rem',
                padding: '0.5rem 1rem',
                margin: '0.5rem 0'
              }}
            />
            <SendOutlinedIcon
              sx={{
                color: newComment.length > 0 ? primary : medium,
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={patchComment}
            />
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
