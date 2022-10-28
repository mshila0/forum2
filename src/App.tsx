import React, {useState} from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes, useNavigate
} from 'react-router-dom';
import './App.css';
import LoginForm, {FormData} from "./components/LoginForm";
import HomePage from "./components/views/HomePage";
import TaskPage from "./components/views/TaskPage";
import RegistrationForm from "./components/RegistrationForm";
import Layout from "./components/views/Layout";

function App() {
  const navigate = useNavigate()
  const onLoginSubmit = (data: FormData) => {
    //const result = await fetch()
    navigate("/")
  };

  const onRegistrartionSubmit = (data: FormData) => {
    navigate("/login")
  };

  return <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>} />
        <Route path='/login' element={<LoginForm onSubmit={onLoginSubmit}/>} />
        <Route path='/registration' element={<RegistrationForm onSubmit={onRegistrartionSubmit}/>} />
        <Route path='/task/:id' element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
</>;
}

export default App;
