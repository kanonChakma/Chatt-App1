import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Test from './component/Test';
import Chat from './pages/Chat';
import Home from './pages/Home';

export default function App() {
  
  return (
    <div className='App'>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/test" element={<Test />} />
    </Routes>
  </div>
  );
}
