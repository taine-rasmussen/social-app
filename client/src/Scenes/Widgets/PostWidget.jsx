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

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  return (
    <FlexBetween>

    </FlexBetween>
  )
}

export default PostWidget
