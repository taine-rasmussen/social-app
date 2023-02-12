
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
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { Navigate, useNavigate } from "react-router-dom";
import FlexBetween from "Components/FlexBetween";

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

  const fullName = `${user.firstName} ${user.lastName};`

  return (
    <div>
      NavBar
    </div>
  )
}

export default NavBar
