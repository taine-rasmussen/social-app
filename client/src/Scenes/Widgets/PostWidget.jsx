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


  return (
    <div>

    </div>
  )
}

export default PostWidget
