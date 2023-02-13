
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

      </FlexBetween>
    </FlexBetween>
  )
}

export default NavBar
