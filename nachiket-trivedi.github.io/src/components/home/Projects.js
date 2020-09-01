import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import userData from "../../config/userData";
import styles from "../../styles/Styles.module.css";

const Projects = () => {
  let { gitHubLink, gitHubQuerry } = userData;
  let githubId, repos, projectDesc, projectDates;
  if (localStorage.getItem("isChanged") == "true") {
    if (
      localStorage.getItem("userData") != null &&
      JSON.parse(localStorage.getItem("userData"))["repos"] != null
    ) {
      repos = JSON.parse(localStorage.getItem("userData"))["repos"];
      projectDates = JSON.parse(localStorage.getItem("userData"))[
        "projectDates"
      ];
      projectDesc = JSON.parse(localStorage.getItem("userData"))["projectDesc"];
      githubId = JSON.parse(localStorage.getItem("userData"))["githubId"];
    } else {
      repos = [];
      projectDates = {};
      projectDesc = {};
    }
  } else {
    ({ githubId, repos, projectDesc, projectDates } = userData);
  }
  const [projectsArray, setProjectsArray] = useState([]);

  useEffect(() => {
    //console.log("project", repos, projectDates, projectDesc);
    axios
      .get(gitHubLink + githubId + gitHubQuerry)
      .then((response) => {
        console.log("proj resp", response.data);
        let gitRepos = [];
        for (let i in response.data) {
          let repoObj = response.data[i];
          console.log("repoObj name", repoObj["name"]);
          if (repos.includes(repoObj["name"])) gitRepos.push(repoObj);
        }
        let onlyNameArr = [];
        for (let i in gitRepos) {
          onlyNameArr.push(gitRepos[i]["name"]);
        }
        console.log("onlyNameArr", onlyNameArr);

        for (let i in repos) {
          if (!onlyNameArr.includes(repos[i])) {
            let dummyobj = {
              name: repos[i],
              svn_url: "#",
              stargazers_count: "0",
            };
            gitRepos.push(dummyobj);
          }
        }
        setProjectsArray(gitRepos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="projects" className={[styles.projectsPage].join(",")}>
      <div className="container container-fluid p-5">
        <h1 className="display-4 pb-5">Projects</h1>
        <div className="row">
          {projectsArray.map((project) => (
            <ProjectCard
              projectData={project}
              projectDesc={projectDesc}
              projectDates={projectDates}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
