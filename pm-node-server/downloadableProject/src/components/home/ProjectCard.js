import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import styles from "../../styles/Styles.module.css";
import classes from "../../styles/Styles.module.css";

const ProjectCard = (props) => {
  const [updated_at, setUpdatedAt] = useState("0 mints");
  const { name, svn_url, stargazers_count } = props.projectData;

  useEffect(() => {
    if (props.projectData.pushed_at == null) {
      return setUpdatedAt("");
    } else {
      const date = new Date(props.projectData.pushed_at);
      const nowdate = new Date();
      const diff = nowdate.getTime() - date.getTime();
      const hours = Math.trunc(diff / 1000 / 60 / 60);

      if (hours < 24) {
        return setUpdatedAt(`${hours.toString()} hours ago`);
      } else {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return setUpdatedAt(`on ${day} ${monthNames[monthIndex]} ${year}`);
      }
    }
  }, [props.projectData.pushed_at]);

  return (
    <div className="col-md-6">
      <div>
        <div className={styles.projectCard}>
          <div className="card-body">
            <div className={styles.projectHeader}>
              <h6>{name} </h6>
              <h6 className={styles.projDate}>{props.projectDates[name]}</h6>
            </div>
            <hr />
            <div className={styles.projectDevParent}>
              <ul>
                <li>
                  {" "}
                  <div className={styles.projDesc}>
                    {props.projectDesc[name] != null
                      ? props.projectDesc[name][0]
                      : null}
                  </div>
                </li>
                <li>
                  {" "}
                  <div className={styles.projDesc}>
                    {props.projectDesc[name] != null
                      ? props.projectDesc[name][1]
                      : null}
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.cloneAndRepoBtnDiv}>
              <Button
                href={`${svn_url}/archive/master.zip`}
                className={styles.cloneBtn}
              >
                <i className="fab fa-github" /> Clone Project
              </Button>
              <Button
                href={svn_url}
                target=" _blank"
                variant="success"
                className={styles.cloneBtn}
              >
                <i className="fab fa-github" /> View Repo
              </Button>
            </div>
            <hr />
            <p className="card-text">
              <span className="text-dark card-link mr-4">
                <i className="fab fa-github" /> Stars{" "}
                <span className="badge badge-dark">{stargazers_count}</span>
              </span>
              <small className="text-muted">
                {updated_at == "" ? "" : "Updated " + updated_at}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
