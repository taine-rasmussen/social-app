
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "Components/FlexBetween";
import { setMode, setLogout } from "state";
import { useState } from "react";
import {
  useMediaQuery,
  IconButton,
  FormControl,
  Typography,
  InputBase,
  useTheme,
  MenuItem,
  Select,
  Box
} from "@mui/material";
import {
  Notifications,
  LightMode,
  DarkMode,
  Message,
  Search,
  Close,
  Help,
  Menu
} from "@mui/icons-material";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("min-width: 1000px")

  const theme = useTheme();
  const neutralLigt = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.neutral.primary.light
  const alt = theme.palette.neutral.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
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
              backgroundColor={neutralLigt}
              borderRadius='9px'
              gap='3rem'
              padding='0.1rem 1.5rem'
            >
              <InputBase placeholder='Search...'/>
                <IconButton>
                  <Search />
                </IconButton>
            </FlexBetween>
          )}
      </FlexBetween>
      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px'}} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px'}} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px'}} />
          <Notifications sx={{ fontSize: '25px'}} />
          <Help sx={{ fontSize: '25px'}} />
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
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton></IconButton>
      )
    }
    </FlexBetween>
  )
}

export default NavBar
