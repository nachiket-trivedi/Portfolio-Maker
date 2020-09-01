import React, { useState, useEffect } from "react";
import userData from "../../config/userData";
import { Button, Card, Badge } from "react-bootstrap";
import styles from "../../styles/Styles.module.css";
import ReactCardFlip from "react-card-flip";

const Skills = () => {
  let skills = [];
  if (localStorage.getItem("isChanged") == "true") {
    skills =
      JSON.parse(localStorage.getItem("userData"))["skills"] == null ||
      JSON.parse(localStorage.getItem("userData"))["skills"] == ""
        ? skills
        : JSON.parse(localStorage.getItem("userData"))["skills"].split(",");
  } else {
    ({ skills } = userData);
  }
  const [skillsDisplay, setSkillsDisplay] = useState([]);

  useEffect(() => {
    setSkillsDisplay(
      skills.map((skill) => {
        return <Badge className={styles.eachSkill}>{skill}</Badge>;
      })
    );
  }, []);
  return (
    <div id="skills" className={[styles.skillPage].join(",")}>
      <div className="container container-fluid p-5">
        <h1 className="display-4 pb-5">Skills</h1>

        <div className={styles.skillsDisplayDiv}>{skillsDisplay}</div>
      </div>
    </div>
  );
};

export default Skills;
