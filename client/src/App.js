import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { CcssBaseLine, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ProfilePage from 'Scenes/ProfilePage';
import { useSelector } from 'react-redux';
import LoginPage from 'Scenes/LoginPage';
import { themeSettings } from './theme';
import HomePage from 'Scenes/HomePage';
import { useMemo } from 'react';

function App() {

  const mode = useSelector(state => state.mode)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
