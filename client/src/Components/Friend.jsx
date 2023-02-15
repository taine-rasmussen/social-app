import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { setFriends } from 'State';
import {
  Box,
  IconButton,
  Typograpghy,
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
      <FlexBetween>

      </FlexBetween>
    </FlexBetween>
  )
}

export default Friend
