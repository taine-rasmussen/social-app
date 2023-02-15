import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { setFriends } from 'State';
import {
  Box,
  IconButton,
  Typograpghy,
  Typography,
  useTheme
} from '@mui/material';
import {
  PersonAddOutlined,
  PersonRemovedOutlined
} from '@mui/icons-material';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { friends } = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(`https://localhost:3001/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

    const data = await response.json();
    dispatch(setFriends({ friends: data }))
  }



  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // Nav from friend to friend profile gross temp fix
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variamt='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: primaryLight,
                cursor: 'pointer'
              }
            }}
          >
            {name}
          </Typography>
          <Typography
            color={medium}
            fontSize='0.75rem'
          >
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemovedOutlined sx={{ color: primaryLight }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryLight }} />
        )}
      </IconButton>
    </FlexBetween >
  )
}

export default Friend
