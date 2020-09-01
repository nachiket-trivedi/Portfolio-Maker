import React from "react";
import Landing from "../components/home/Landing";
import Me from "../components/home/Me";
import Projects from "../components/home/Projects";
import Experience from "../components/home/Experience";
import Education from "../components/home/Education";
import Skills from "../components/home/Skills";

const Home = (props) => {
  return (
    <>
      <Landing isChanged={props.isChanged} setIsChanged={props.setIsChanged} />
      <Me isChanged={props.isChanged} setIsChanged={props.setIsChanged} />
      <Experience
        isChanged={props.isChanged}
        setIsChanged={props.setIsChanged}
      />
      <Projects isChanged={props.isChanged} setIsChanged={props.setIsChanged} />
      <Education
        isChanged={props.isChanged}
        setIsChanged={props.setIsChanged}
      />
      <Skills isChanged={props.isChanged} setIsChanged={props.setIsChanged} />
    </>
  );
};

export default Home;
