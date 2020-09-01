import React, { useState, useEffect } from "react";
import Pdf from "../../config/resume.pdf";
import userData from "../../config/userData";
import styles from "../../styles/Styles.module.css";
import CreateModal from "../creator/CreateModal";
import DownloadModal from "../creator/DownloadModal";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Navbar = (props) => {
  let { firstName } = userData;
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const istop = window.scrollY < 200;
      if (istop !== isTop) {
        setIsTop(istop);
      }
    });
  }, [isTop]);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-light ${
        isTop ? "bg-transparent" : "bg-gradient"
      } `}
    >
      <a className="navbar-brand" href={process.env.PUBLIC_URL + "/#home"}>
        Home
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <div className={styles.navbarDiv}>
          <div>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/#aboutme"}
                >
                  Me
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/#experience"}
                >
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/#projects"}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/#education"}
                >
                  Education
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/#skills"}
                >
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={Pdf}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.rightHeader}>
            <CreateModal
              isChanged={props.isChanged}
              setIsChanged={props.setIsChanged}
            ></CreateModal>
            <DownloadModal
              isChanged={props.isChanged}
              setIsChanged={props.setIsChanged}
            ></DownloadModal>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
