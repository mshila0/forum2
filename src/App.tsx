import React from 'react';
import './App.css';
import Form, {FormData} from "./components/Form";

function App() {

  const onSubmit = (data: FormData) => {
    console.log("Received data:", data);
  };

  return <><Form onSubmit={onSubmit}/></>;
}

export default App;
