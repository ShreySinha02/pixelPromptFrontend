import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUp from './pages/SignUp.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import PrivateRoute from './authentication/PrivateRoute.tsx';
import ImagePromptPage from './pages/ImagePromptPage.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route  element={<App/>}>
              <Route index element={<LandingPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/image' element={<PrivateRoute><ImagePromptPage/></PrivateRoute>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  </AuthProvider>
  </StrictMode>,
)
