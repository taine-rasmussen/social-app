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
  const mediumMain = paletter.neutral.mediumMain;
  const medium = paletter.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);

    if(image){
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    };

    const response = await fetch('https://locahost:3001/posts', {
      method: 'POST',
      header: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const post = await response.json();
    dispatch(setPosts({ post }))
    setImage(null)
    setPost('')
  };


  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase 
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem'
          }}
        />
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
