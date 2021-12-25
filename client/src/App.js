import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
