import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Footer from "./components/surround/Footer";
import Navbar from "./components/surround/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [isChanged, setIsChanged] = useState(false);

  return (
    <>
      <Navbar isChanged={isChanged} setIsChanged={setIsChanged} />
      <Home isChanged={isChanged} setIsChanged={setIsChanged} />
      <Footer />
    </>
  );
};

export default App;
