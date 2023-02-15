import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from 'Components/WidgetWrapper';
import FlexBetween from 'Components/FlexBetween'
import UserImage from 'Components/UserImage';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import { setPosts } from 'State'
import {
  AttachFileOutlined,
  MoreHorizOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
  EditOutlined,
  MicOutlined,
  FaxRounded,
} from '@mui/icons-material'
import { Box, Divder, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from '@mui/material';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-max:1000px)')
  
  const { palette } = useTheme();
  const mediumMain = paletter.neutral.mediumMain
  const medium = paletter.neutral.medium




  return (
    <div>
      
    </div>
  )
}

export default MyPostWidget
