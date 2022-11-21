import React from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import HomePage from "./views/HomePage";
import TaskPage from "./views/TaskPage";
import Layout from "./views/Layout";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";

function App() {

  return <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>} />
        <Route path='/login' element={<LoginView/>} />
        <Route path='/registration' element={<RegistrationView/>} />
        <Route path='/task/:id' element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
</>;
}

export default App;
