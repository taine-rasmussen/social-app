import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from 'Components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setPost } from 'State';
import {
  Box,
  Divider,
  Typography,
  useTheme,
  InputBase
} from '@mui/material';

const CommentsWidget = (props) => {

  const {
    loggedInUserId,
    comments,
    getPosts,
    postId,
    token,
    name
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('')
  const { firstName, lastName } = useSelector((state) => state.user);
  const fullName = `${firstName} ${lastName}`;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

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
    <Box mt='0.5rem'>
      {comments.map((comment, i) => (
        <>
          <Box
            key={`${name}-${i}`}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%'
            }}
          >
            <Typography
              sx={{
                color: primary,
                m: '0.5rem 0',
                width: '20%',
                '&:hover': {
                  cursor: 'pointer',
                  textDecorationLine: 'underline'
                }
              }}
              onClick={() => { navigate(`/profile/${comment.id}`) }}
            >
              {`${comment.name}:`}
            </Typography>
            <Typography sx={{ color: medium, m: '0.5rem 0', width: '80%' }}>
              {comment.comment}
            </Typography>
          </Box>
          <Divider />
        </>
      ))
      }
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
    </Box >
  )
};

export default CommentsWidget
