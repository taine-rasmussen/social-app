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
import {
  useMediaQuery,
  Typography,
  IconButton,
  InputBase,
  useTheme,
  Button,
  Divider,
  Box
} from '@mui/material';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-max:1000px)')

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);

    if (image) {
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
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setImage(acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width='100%'
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add image</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween
          gap='0.25rem'
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              '&:hover': { cursor: 'pointer', color: medium }
            }}
          >
            Image
          </Typography>
        </FlexBetween>
      </FlexBetween>

    </WidgetWrapper>
  )
}

export default MyPostWidget