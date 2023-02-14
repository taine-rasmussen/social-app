import UserWidget from "Scenes/Widgets/UserWidget";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import NavBar from 'Scenes/NavBar'

const HomePage = () => {

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <UserWidget userId={_id} picturePath={picturePath} />
    </Box>
  )
}

export default HomePage
