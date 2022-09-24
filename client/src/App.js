import React from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Home from './pages/Home';
import SetAvatar from './pages/SetAvatar';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setavatar" element={<SetAvatar />} />
    </Routes>
  </BrowserRouter>
  );
}
