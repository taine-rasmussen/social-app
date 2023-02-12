import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scences/HomePage';
import LoginPage from 'scences/LoginPage';
import ProfilePage from 'scences/ProfilePage';


function App() {

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
