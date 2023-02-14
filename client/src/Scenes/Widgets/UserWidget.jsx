import { Box, Typography, Divider, useTheme } from '@mui/material';
import WidgetWrapper from 'Components/WidgetWrapper';
import FlexBetween from 'Components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import UserImage from 'Components/UserImage';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  FaxRounded
} from '@mui/icons-material';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useDispatch((state) => state.token);
  
  const { paletter } = useTheme();
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(
    () => {
      getUser();
    }, [])

  return (
    <div>
      
    </div>
  )
};

export default UserWidget
