import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import { Box, Typography, Divider, useTheme, InputBase } from '@mui/material';
import WidgetWrapper from 'Components/WidgetWrapper';
import FlexBetween from 'Components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import UserImage from 'Components/UserImage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ManageAccountsOutlined,
  WorkOutlineOutlined,
  LocationOnOutlined,
  EditOutlined
} from '@mui/icons-material';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState();
  const [url, setUrl] = useState('')
  const [editSocial, setEditSocial] = useState(false);
  const [editNetwork, setEditNetwork] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const updateNetwork = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}/network`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        network: url
      }),
    });
    getUser();
    setEditNetwork(false)
    setUrl('')
  }

  const updateSocial = async () => {
    // updates db user model with new url string for the social key
    setEditSocial(false)
    setUrl('')
  }

  useEffect(
    () => {
      getUser();
    }, [friends])

  if (!user) return null

  const {
    viewedProfile,
    impressions,
    occupation,
    firstName,
    lastName,
    location,
    network
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween>
          <UserImage image={picturePath} />
          <Box p='1rem'>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer'
                }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p='1rem 0'>
        <Box
          display='flex'
          alignItems='center'
          gap='1rem'
          mb='0.5rem'
        >
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          gap='1rem'
        >
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight='500'>{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight='500'>{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p='1rem 0'>
        <Typography
          fontSize='1rem'
          color={main}
          fontWeight='500'
          mb='0.5rem'
        >
          Social Profiles
          </Typography>
        <FlexBetween gap='1rem' mb='0.5rem' height='50px'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              {editNetwork ? (
                <InputBase
                  placeholder="Enter link..."
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  sx={{
                    width: '100%',
                    backgroundColor: palette.neutral.light,
                    borderRadius: '1rem',
                    padding: '0.3rem 0.5rem',
                  }}
                />
              ) : (
                <a href={network} target='_blank'>
                  <Typography
                    color={main}
                    fontWeight='500'
                    sx={{
                      '&:hover': {
                        color: palette.primary.main
                      }
                    }}
                  >
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </a>
              )}
            </Box>
          </FlexBetween>
          {editNetwork ? (
            <DownloadDoneOutlinedIcon
              sx={{
                color: url.length > 0 ? palette.primary.main : main,
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={updateNetwork}
            />
          ) : (
            <EditOutlined
              sx={{
                color: main,
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={() => {
                if (editSocial) setEditSocial(false)
                setEditNetwork(true)
              }}
            />
          )}
        </FlexBetween>
        <FlexBetween gap='1rem' height='50px'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              {editSocial ? (
                <InputBase
                  placeholder="Enter link..."
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  sx={{
                    width: '100%',
                    backgroundColor: palette.neutral.light,
                    borderRadius: '1rem',
                    padding: '0.25rem 0.5rem'
                  }}
                />
              ) : (
                <a href={social} target='_blank'>
                  <Typography color={main} fontWeight='500'>Twitter</Typography>
                  <Typography color={medium}>Social Network</Typography>
                </a>
              )}
            </Box>
          </FlexBetween>
          {editSocial ? (
            <DownloadDoneOutlinedIcon
              sx={{
                color: url.length > 0 ? palette.primary.main : main,
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={updateSocial}
            />
          ) : (
            <EditOutlined
              sx={{
                color: main,
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={() => {
                if (editNetwork) setEditNetwork(false)
                setEditSocial(true)
              }}
            />
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper >
  )
};

export default UserWidget
