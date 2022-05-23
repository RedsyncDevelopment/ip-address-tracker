import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/UI/404";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
