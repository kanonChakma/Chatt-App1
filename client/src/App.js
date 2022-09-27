import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Chat from './pages/Chat';
import Home from './pages/Home';

export default function App() {
  
  return (
    <div>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
    </Routes>
  </div>
  );
}
