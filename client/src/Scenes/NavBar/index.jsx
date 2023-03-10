
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "Components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setMode, setLogout } from "State";
import MobileNav from './MobileNav';
import {
  useMediaQuery,
  Autocomplete,
  FormControl,
  IconButton,
  Typography,
  TextField,
  InputBase,
  useTheme,
  MenuItem,
  Select
} from "@mui/material";
import {
  Notifications,
  LightMode,
  DarkMode,
  Message,
  Help,
  Menu
} from "@mui/icons-material";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [formattedUsers, setFormattedUsers] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.neutral.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const getAll = async () => {
    const response = await fetch(`http://localhost:3001/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await response.json();
    const formattedUsers = users.map(({ firstName, lastName, _id }) => ({ name: `${firstName} ${lastName}`, _id }))
    setFormattedUsers(formattedUsers)
  };

  const userOptions = formattedUsers.map(({ name }) => (name))

  useEffect(
    () => {
      getAll();
    }, []
  );

  const naviageteFromSearch = (name) => {
    const selectedUser = formattedUsers.filter((user) => user.name === name)
    navigate(`/profile/${selectedUser[0]._id}`)
    navigate(0)
  }

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap="1.75rem" minHeight='100px'>
        <Typography
          fontWeight='bold'
          fontSize='3rem'
          color='primary'
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer'
            }
          }}
        >
          Social app
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            borderRadius='9px'
            gap='3rem'
            padding='0.25rem 0.75rem'
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userOptions}
              sx={{ width: 300 }}
              onChange={(value, newInputValue) => {
                naviageteFromSearch(newInputValue)
              }}
              renderInput={(params) => <TextField
                {...params}
                label="Search..."
                variant="standard"
                sx={{ padding: '0.35rem 0' }}
              />}
            />
          </FlexBetween>
        )}
      </FlexBetween>
      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl varient='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                "& .MuiSvgIcon-Root": {
                  pr: '0.25rem',
                  width: '3rem'
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                dispatch(setLogout())
                navigate('/')
              }}
              >Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        !isMobileMenuToggled && (
          <IconButton
            onClick={() => { setIsMobileMenuToggled(!isMobileMenuToggled) }}
          >
            <Menu />
          </IconButton>
        )
      )}
      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <MobileNav
          setIsMobileMenuToggled={setIsMobileMenuToggled}
          isMobileMenuToggled={isMobileMenuToggled}
        />
      )}
    </FlexBetween>
  )
}

export default NavBar
