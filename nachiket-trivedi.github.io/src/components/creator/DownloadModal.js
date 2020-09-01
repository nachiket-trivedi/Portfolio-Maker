import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import styles from "../../styles/Styles.module.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";

const DownloadModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const generateZip = (userSiteFiles) => {
    let zip = new JSZip();

    zip.file("/myportfolio/public/index.html", userSiteFiles["indexhtml"]);
    zip.file(
      "/myportfolio/public/manifest.json",
      userSiteFiles["manifestjson"]
    );
    zip.file("/myportfolio/public/robots.txt", userSiteFiles["robotstxt"]);
    zip.file("/myportfolio/.gitignore", userSiteFiles["gitignore"]);
    zip.file("/myportfolio/package.json", userSiteFiles["packagejson"]);
    zip.file("/myportfolio/deploy.js", userSiteFiles["deploy"]);
    zip.file("/myportfolio/masterscript.sh", userSiteFiles["masterscript"]);

    zip.file("/myportfolio/src/App.css", userSiteFiles["AppCss"]);
    zip.file("/myportfolio/src/App.js", userSiteFiles["AppJs"]);
    zip.file("/myportfolio/src/index.js", userSiteFiles["indexJs"]);
    zip.file(
      "/myportfolio/src/serviceWorker.js",
      userSiteFiles["serviceWorker"]
    );

    zip.file(
      "/myportfolio/src/styles/Styles.module.css",
      userSiteFiles["Styles"]
    );

    zip.file("/myportfolio/src/pages/Home.js", userSiteFiles["Home"]);

    zip.file("/myportfolio/src/config/userData.js", userSiteFiles["userData"]);

    zip.file(
      "/myportfolio/src/components/surround/Footer.js",
      userSiteFiles["Footer"]
    );
    zip.file(
      "/myportfolio/src/components/surround/Navbar.js",
      userSiteFiles["Navbar"]
    );
    zip.file(
      "/myportfolio/src/components/home/Education.js",
      userSiteFiles["Education"]
    );
    zip.file(
      "/myportfolio/src/components/home/Experience.js",
      userSiteFiles["Experience"]
    );
    zip.file(
      "/myportfolio/src/components/home/Landing.js",
      userSiteFiles["Landing"]
    );
    zip.file("/myportfolio/src/components/home/Me.js", userSiteFiles["Me"]);
    zip.file(
      "/myportfolio/src/components/home/ProjectCard.js",
      userSiteFiles["ProjectCard"]
    );
    zip.file(
      "/myportfolio/src/components/home/Projects.js",
      userSiteFiles["Projects"]
    );
    zip.file(
      "/myportfolio/src/components/home/Skills.js",
      userSiteFiles["Skills"]
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      //console.log("content", content);
      saveAs(content, "myportfolio.zip");
    });
  };
  const downloadSite = () => {
    localStorage.setItem("isFinal", true);
    let saveObj = JSON.parse(localStorage.getItem("userData"));
    let data = { userData: saveObj };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .post("https://aqueous-ravine-85309.herokuapp.com/handleUserData", data)
      .then((response) => {
        //console.log("response.data", response.data);
        let userSiteFiles = response.data;
        generateZip(userSiteFiles);
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <a className="nav-link lead" onClick={() => handleShow()}>
            <b>{"Download"}</b>
          </a>
        </li>
      </ul>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.createModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Yay! You're almost there</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.downloadModalBody}>
            <h5>Just 3 small steps left:</h5>
            <br />
            <ol>
              <li>Click Download and extract the downloaded zip.</li>
              <li>
                Go to your GitHub, create a repository titled{" "}
                <span className={styles.downloadModalGitUrl}>
                  {"<your-github-handle>"}.github.io{" "}
                </span>
                and leave it as it is.
              </li>
              <li>
                Open the extracted directory in the terminal and execute the
                command:
                <br />
                <span className={styles.downloadModalGitUrl}>
                  sh masterscript.sh
                </span>
              </li>
            </ol>
            <div>
              Voila! You're done :D Just wait for about 10 minutes and your
              personal portfolio will be hosted on your GitHub pages.
            </div>
            <div className={styles.downloadModalFooter}>
              <Button
                className={styles.downloadModalFooterBtn}
                variant="success"
                onClick={() => downloadSite()}
              >
                Download
              </Button>
              <div className={styles.downloadModalNote}>
                Note: The application does not and will not store any user
                information in it's server. In case of any queries or
                suggestions, feel free to reach out to me at
                nachiket5197@gmail.com. Always happy to help :)
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DownloadModal;
