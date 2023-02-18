import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import FlexBetween from "Components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { setMode, setLogout } from "State";
import {
  IconButton,
  useTheme,
  Divider,
  Box
} from "@mui/material";
import {
  Notifications,
  LightMode,
  DarkMode,
  Message,
  Close,
  Help
} from "@mui/icons-material";

const MobileNav = (props) => {
  const {
    setIsMobileMenuToggled,
    isMobileMenuToggled
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.alt

  return (
    <Box
      sx={{
        backgroundColor: background,
        width: '90%',
        padding: '0.75rem 0',
        borderRadius: '0.5rem',
        position: 'fixed',
        zIndex: '999999'
      }}
    >
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <IconButton
          onClick={() => { setIsMobileMenuToggled(!isMobileMenuToggled) }}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <FlexBetween
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        gap='0.5rem'
        padding='0.5rem'
      >

        {theme.palette.mode === 'dark' ? (
          <DarkMode sx={{ fontSize: '25px' }} onClick={() => dispatch(setMode())} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: '25px' }} onClick={() => dispatch(setMode())} />
        )}
        <Message sx={{ fontSize: '25px' }} />
        <Notifications sx={{ fontSize: '25px' }} />
        <Help sx={{ fontSize: '25px' }} />
        <LogoutIcon
          sx={{ fontSize: '25px' }}
          onClick={() => {
            dispatch(setLogout())
            navigate('/')
          }}
        />
      </FlexBetween>
    </Box>
  )
}

export default MobileNav
