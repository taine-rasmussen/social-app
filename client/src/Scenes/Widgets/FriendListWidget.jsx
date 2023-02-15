import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from 'Components/WidgetWrapper';
import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'Components/Friend';
import { setFriends } from 'State';
import { useEffect } from 'react';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends)
  const token = useSelector((state) => state.token)

  const getFriends = async () => {
    const response = await fetch(`
      http://localhost:3001/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(
    () => {
      getFriends();
    }, [])

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Friend list
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        gap='1.5rem'
      >
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
};

export default FriendListWidget

