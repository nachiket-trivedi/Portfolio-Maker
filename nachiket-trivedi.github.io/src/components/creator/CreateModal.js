import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import styles from "../../styles/Styles.module.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";

const CreateModal = (props) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [headline, setHeadline] = useState(localStorage.getItem("headline"));
  const [linkedinId, setLinkedinId] = useState(
    localStorage.getItem("linkedinId")
  );
  const [githubId, setGithubId] = useState(localStorage.getItem("githubId"));
  const [instagramId, setInstagramId] = useState(
    localStorage.getItem("instagramId")
  );
  const [facebookId, setFacebookId] = useState(
    localStorage.getItem("facebookId")
  );
  const [twitterId, setTwitterId] = useState(localStorage.getItem("twitterId"));
  const [mediumId, setMediumId] = useState(localStorage.getItem("mediumId"));
  const [description1, setDescription1] = useState(
    localStorage.getItem("description1")
  );
  const [description2, setDescription2] = useState(
    localStorage.getItem("description2")
  );
  const [githubRepos, setGithubRepos] = useState(
    localStorage.getItem("githubRepos")
  );
  const [skills, setSkills] = useState(localStorage.getItem("skills"));
  const [expDeets, setExpDeets] = useState(
    localStorage.getItem("expDeets") == null
      ? [
          {
            Role: "",
            Company: "",
            Duration: "",
            Location: "",
            ExpDetails1: "",
            ExpDetails2: "",
            ExpDetails3: "",
          },
        ]
      : JSON.parse(localStorage.getItem("expDeets"))
  );
  const [expContentArr, setExpContentArr] = useState([
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Role</Form.Label>
          <Form.Control
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["Role"] == ""
                ? "Enter Role"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["Role"]
            }
            onChange={(e) => {
              handleExpDeets(0, "Role", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["Company"] == ""
                ? "Enter Company Name"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["Company"]
            }
            onChange={(e) => {
              handleExpDeets(0, "Company", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["Duration"] == ""
                ? "Enter Duration"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["Duration"]
            }
            onChange={(e) => {
              handleExpDeets(0, "Duration", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["Location"] == ""
                ? "Enter Location"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["Location"]
            }
            onChange={(e) => {
              handleExpDeets(0, "Location", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Work Details Line 1</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails1"] ==
                ""
                ? "Details"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails1"]
            }
            onChange={(e) => {
              handleExpDeets(0, "ExpDetails1", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Work Details Line 2</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails2"] ==
                ""
                ? "More details"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails2"]
            }
            onChange={(e) => {
              handleExpDeets(0, "ExpDetails2", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Work Details Line 3</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("expDeets") == null ||
              JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails3"] ==
                ""
                ? "Some more details (Because why not?)"
                : JSON.parse(localStorage.getItem("expDeets"))[0]["ExpDetails3"]
            }
            onChange={(e) => {
              handleExpDeets(0, "ExpDetails3", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
    </Form>,
  ]);
  const [expContentDisplay, setExpContentDisplay] = useState();
  const [expIndex, setExpIndex] = useState(0);

  const [eduDeets, setEduDeets] = useState(
    localStorage.getItem("eduDeets") == null
      ? [
          {
            Degree: "",
            Major: "",
            School: "",
            Location: "",
            StartDate: "",
            EndDate: "",
            EduDetails1: "",
            EduDetails2: "",
            EduDetails3: "",
            Courses: "",
          },
        ]
      : JSON.parse(localStorage.getItem("eduDeets"))
  );
  const [eduContentArr, setEduContentArr] = useState([
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["Degree"] == ""
                ? "Enter Degree"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["Degree"]
            }
            onChange={(e) => {
              handleEduDeets(0, "Degree", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Major</Form.Label>
          <Form.Control
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["Major"] == ""
                ? "Enter Major"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["Major"]
            }
            onChange={(e) => {
              handleEduDeets(0, "Major", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>School</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["School"] == ""
                ? "Enter School Name"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["School"]
            }
            onChange={(e) => {
              handleEduDeets(0, "School", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["Location"] == ""
                ? "Enter Location"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["Location"]
            }
            onChange={(e) => {
              handleEduDeets(0, "Location", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["StartDate"] == ""
                ? "Enter Degree Start Date"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["StartDate"]
            }
            onChange={(e) => {
              handleEduDeets(0, "StartDate", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["EndDate"] == ""
                ? "Enter Degree End Date"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["EndDate"]
            }
            onChange={(e) => {
              handleEduDeets(0, "EndDate", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Degree Details Line 1</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails1"] ==
                ""
                ? "Details"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails1"]
            }
            onChange={(e) => {
              handleEduDeets(0, "EduDetails1", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Degree Details Line 2</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails2"] ==
                ""
                ? "More details"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails2"]
            }
            onChange={(e) => {
              handleEduDeets(0, "EduDetails2", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Degree Details Line 3</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails3"] ==
                ""
                ? "Some more details (Deja vu much?)"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["EduDetails3"]
            }
            onChange={(e) => {
              handleEduDeets(0, "EduDetails3", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Courses</Form.Label>
          <TextareaAutosize
            placeholder={
              localStorage.getItem("eduDeets") == null ||
              JSON.parse(localStorage.getItem("eduDeets"))[0]["Courses"] == ""
                ? "Enter the courses you took (comma separated, for eg: Alogrithms, Computer Networks)"
                : JSON.parse(localStorage.getItem("eduDeets"))[0]["Courses"]
            }
            onChange={(e) => {
              handleEduDeets(0, "Courses", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
    </Form>,
  ]);
  const [eduContentDisplay, setEduContentDisplay] = useState();
  const [eduIndex, setEduIndex] = useState(0);

  const [projectsDeets, setProjectsDeets] = useState(
    localStorage.getItem("projectsDeets") == null
      ? [
          {
            RepoName: "",
            Dates: "",
            ProjDetails1: "",
            ProjDetails2: "",
          },
        ]
      : JSON.parse(localStorage.getItem("projectsDeets"))
  );
  const [projectsContentArr, setProjectsContentArr] = useState([
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Project Repository Name</Form.Label>
          <Form.Control
            placeholder={
              localStorage.getItem("projectsDeets") == null ||
              JSON.parse(localStorage.getItem("projectsDeets"))[0][
                "RepoName"
              ] == ""
                ? "GitHub Repo Name (Just the repo name without your GitHub handle)"
                : JSON.parse(localStorage.getItem("projectsDeets"))[0][
                    "RepoName"
                  ]
            }
            onChange={(e) => {
              handleProjectsDeets(0, "RepoName", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Dates</Form.Label>
          <Form.Control
            placeholder={
              localStorage.getItem("projectsDeets") == null ||
              JSON.parse(localStorage.getItem("projectsDeets"))[0]["Dates"] ==
                ""
                ? "Enter Dates"
                : JSON.parse(localStorage.getItem("projectsDeets"))[0]["Dates"]
            }
            onChange={(e) => {
              handleProjectsDeets(0, "Dates", e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Projects Details Line 1</Form.Label>
          <TextareaAutosize
            maxLength="150"
            placeholder={
              localStorage.getItem("projectsDeets") == null ||
              JSON.parse(localStorage.getItem("projectsDeets"))[0][
                "ProjDetails1"
              ] == ""
                ? "Project Details (150 characters limit)"
                : JSON.parse(localStorage.getItem("projectsDeets"))[0][
                    "ProjDetails1"
                  ]
            }
            onChange={(e) => {
              handleProjectsDeets(0, "ProjDetails1", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
      <Form.Row className={styles.formRow}>
        <Col>
          <Form.Label>Projects Details Line 2</Form.Label>
          <TextareaAutosize
            maxLength="150"
            placeholder={
              localStorage.getItem("projectsDeets") == null ||
              JSON.parse(localStorage.getItem("projectsDeets"))[0][
                "ProjDetails2"
              ] == ""
                ? "More details (150 characters limit)"
                : JSON.parse(localStorage.getItem("projectsDeets"))[0][
                    "ProjDetails2"
                  ]
            }
            onChange={(e) => {
              handleProjectsDeets(0, "ProjDetails2", e.target.value);
            }}
            className={styles.aboutMeText}
            minRows="1"
          ></TextareaAutosize>
        </Col>
      </Form.Row>
    </Form>,
  ]);
  const [projectsContentDisplay, setProjectsContentDisplay] = useState();
  const [projectsIndex, setProjectsIndex] = useState(0);

  const handleClose = () => {
    setShow1(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
  };
  const handleShow1 = () => {
    setShow1(true);
    setShow2(false);
    setShow3(false);
    setShow4(false);
  };
  const handleShow2 = () => {
    setShow2(true);
    setShow1(false);
    setShow3(false);
    setShow4(false);
  };
  const handleShow3 = () => {
    setShow3(true);
    setShow1(false);
    setShow2(false);
    setShow4(false);
  };
  const handleShow4 = () => {
    setShow4(true);
    setShow3(false);
    setShow1(false);
    setShow2(false);
  };
  const handleSave = () => {
    let icons = [
      {
        id: 0,
        image: "fa-github",
        url: "https://github.com/",
        handle: githubId,
        style: "socialicons",
      },
      {
        id: 1,
        image: "fa-facebook",
        url: "https://www.facebook.com/",
        handle: facebookId,
        style: "socialicons",
      },
      {
        id: 2,
        image: "fa-instagram",
        url: "https://www.instagram.com/",
        handle: instagramId,
        style: "socialicons",
      },
      {
        id: 3,
        image: "fa-linkedin",
        url: "https://www.linkedin.com/in/",
        handle: linkedinId,
        style: "socialicons",
      },
      {
        id: 4,
        image: "fa-twitter",
        url: "https://www.twitter.com/",
        handle: twitterId,
        style: "socialicons",
      },
      {
        id: 5,
        image: "fa-medium",
        url: "https://www.medium.com/",
        handle: mediumId,
        style: "socialicons",
      },
    ];
    let expDeets = JSON.parse(localStorage.getItem("expDeets"));
    let experience = [];
    for (let i in expDeets) {
      let detailArr = [
        expDeets[i]["ExpDetails1"],
        expDeets[i]["ExpDetails2"],
        expDeets[i]["ExpDetails3"],
      ];
      let pushArr = [
        expDeets[i]["Role"],
        expDeets[i]["Company"],
        expDeets[i]["Duration"],
        expDeets[i]["Location"],
        detailArr,
      ];
      if (expDeets[i]["Role"] != "") experience.push(pushArr);
    }
    let projectsDeets = JSON.parse(localStorage.getItem("projectsDeets"));
    let repos = [],
      projectDates = {},
      projectDesc = {};
    for (let i in projectsDeets) {
      if (projectsDeets[i]["RepoName"] != "") {
        repos.push(projectsDeets[i]["RepoName"]);
        let deetArr = [
          projectsDeets[i]["ProjDetails1"],
          projectsDeets[i]["ProjDetails2"],
        ];
        projectDates[projectsDeets[i]["RepoName"]] = projectsDeets[i]["Dates"];
        projectDesc[projectsDeets[i]["RepoName"]] = deetArr;
      }
    }
    let eduDeets = JSON.parse(localStorage.getItem("eduDeets"));
    let education = [];
    for (let i in eduDeets) {
      let detailArr = [
        eduDeets[i]["EduDetails1"],
        eduDeets[i]["EduDetails2"],
        eduDeets[i]["EduDetails3"],
      ];
      let pushArr = [
        eduDeets[i]["Degree"],
        eduDeets[i]["Major"],
        eduDeets[i]["School"],
        eduDeets[i]["StartDate"],
        eduDeets[i]["EndDate"],
        eduDeets[i]["Location"],
        detailArr,
        eduDeets[i]["Courses"] == null ? [] : eduDeets[i]["Courses"].split(","),
      ];
      if (eduDeets[i]["Degree"] != "") education.push(pushArr);
    }
    let saveObj = {
      firstName: firstName,
      lastName: lastName,
      headline: headline,
      linkedinId: linkedinId,
      githubId: githubId,
      instagramId: instagramId,
      facebookId: facebookId,
      twitterId: twitterId,
      mediumId: mediumId,
      description1: description1,
      description2: description2,
      githubRepos: githubRepos,
      skills: skills,
      icons: icons,
      experience: experience,
      education: education,
      repos: repos,
      projectDates: projectDates,
      projectDesc: projectDesc,
    };
    localStorage.setItem("userData", JSON.stringify(saveObj));
    setShow1(false);
    localStorage.setItem("isChanged", "true");
    props.setIsChanged(true);
    window.location.reload();
  };
  const handleRevert = () => {
    handleClose();
    localStorage.clear();
    localStorage.setItem("isChanged", "false");
    props.setIsChanged(false);
    window.location.reload();
  };

  const handleExpDeets = (i, key, val) => {
    //console.log(val);
    let arr = JSON.parse(localStorage.getItem("expDeets"));
    arr[i][key] = val;
    setExpDeets(arr);
    localStorage.setItem("expDeets", JSON.stringify(arr));
  };
  const handleEduDeets = (i, key, val) => {
    //console.log(val);
    let arr = JSON.parse(localStorage.getItem("eduDeets"));
    arr[i][key] = val;
    setEduDeets(arr);
    localStorage.setItem("eduDeets", JSON.stringify(arr));
  };
  const handleProjectsDeets = (i, key, val) => {
    //console.log(val);
    let arr = JSON.parse(localStorage.getItem("projectsDeets"));
    arr[i][key] = val;
    setProjectsDeets(arr);
    localStorage.setItem("projectsDeets", JSON.stringify(arr));
  };
  const handleExpAdd = () => {
    let expArr = expContentArr;
    // newIndex = expIndex;
    let arr =
      JSON.parse(localStorage.getItem("expDeets")) == null
        ? []
        : JSON.parse(localStorage.getItem("expDeets"));
    // if (arr[arr.length - 1]["Role"] != "") {
    arr.push({
      Role: "",
      Company: "",
      Duration: "",
      Location: "",
      ExpDetails1: "",
      ExpDetails2: "",
      ExpDetails3: "",
    });
    let newIndex = expIndex + 1;
    // }
    //console.log("arr", arr);
    //console.log("newIndex", newIndex);
    setExpDeets(arr);
    localStorage.setItem("expDeets", JSON.stringify(arr));
    setExpIndex(newIndex);
    expArr.push(
      <>
        <Form>
          <div>
            <br />
            <hr />
            <br />
          </div>
        </Form>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="">
              <Form.Label>Role</Form.Label>
              <Form.Control
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex] ==
                    null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "Role"
                  ] == ""
                    ? "Enter Role"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "Role"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "Role", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "Company"
                  ] == ""
                    ? "Enter Company Name"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "Company"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "Company", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "Duration"
                  ] == ""
                    ? "Enter Duration"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "Duration"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "Duration", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "Location"
                  ] == ""
                    ? "Enter Location"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "Location"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "Location", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Work Details Line 1</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "ExpDetails1"
                  ] == ""
                    ? "Details"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "ExpDetails1"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "ExpDetails1", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Work Details Line 2</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "ExpDetails2"
                  ] == ""
                    ? "More details"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "ExpDetails2"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "ExpDetails2", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Work Details Line 3</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("expDeets") == null ||
                  JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                    "ExpDetails3"
                  ] == ""
                    ? "Some more details (Because why not?)"
                    : JSON.parse(localStorage.getItem("expDeets"))[newIndex][
                        "ExpDetails3"
                      ]
                }
                onChange={(e) => {
                  handleExpDeets(newIndex, "ExpDetails3", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
        </Form>{" "}
      </>
    );
    setExpContentArr(expArr);
    setExpContentDisplay(
      expArr.map((item) => {
        return item;
      })
    );
  };
  const handleEduAdd = () => {
    let eduArr = eduContentArr;
    let arr =
      JSON.parse(localStorage.getItem("eduDeets")) == null
        ? []
        : JSON.parse(localStorage.getItem("eduDeets"));
    arr.push({
      Degree: "",
      Major: "",
      School: "",
      Location: "",
      StartDate: "",
      EndDate: "",
      EduDetails1: "",
      EduDetails2: "",
      EduDetails3: "",
      Courses: "",
    });
    let index = eduIndex + 1;

    //console.log("arr", arr);
    //console.log("newIndex", index);
    setEduDeets(arr);
    localStorage.setItem("eduDeets", JSON.stringify(arr));
    setEduIndex(index);
    eduArr.push(
      <>
        <Form>
          <div>
            <br />
            <hr />
            <br />
          </div>
        </Form>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "Degree"
                  ] == ""
                    ? "Enter Degree"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "Degree"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "Degree", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="">
              <Form.Label>Major</Form.Label>
              <Form.Control
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "Major"
                  ] == ""
                    ? "Enter Major"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "Major"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "Major", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="">
              <Form.Label>School</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "School"
                  ] == ""
                    ? "Enter School Name"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "School"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "School", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "Location"
                  ] == ""
                    ? "Enter Location"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "Location"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "Location", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "StartDate"
                  ] == ""
                    ? "Enter Degree Start Date"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "StartDate"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "StartDate", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "EndDate"
                  ] == ""
                    ? "Enter Degree End Date"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "EndDate"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "EndDate", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Degree Details Line 1</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "EduDetails1"
                  ] == ""
                    ? "Details"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "EduDetails1"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "EduDetails1", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Degree Details Line 2</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "EduDetails2"
                  ] == ""
                    ? "More details"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "EduDetails2"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "EduDetails2", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Degree Details Line 3</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "EduDetails3"
                  ] == ""
                    ? "Some more details (Deja vu much?)"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "EduDetails3"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "EduDetails3", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Courses</Form.Label>
              <TextareaAutosize
                placeholder={
                  localStorage.getItem("eduDeets") == null ||
                  JSON.parse(localStorage.getItem("eduDeets"))[index][
                    "Courses"
                  ] == ""
                    ? "Enter the courses you took (comma separated, for eg: Alogrithms, Computer Networks)"
                    : JSON.parse(localStorage.getItem("eduDeets"))[index][
                        "Courses"
                      ]
                }
                onChange={(e) => {
                  handleEduDeets(index, "Courses", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
        </Form>
      </>
    );
    setEduContentArr(eduArr);
    setEduContentDisplay(
      eduArr.map((item) => {
        return item;
      })
    );
  };
  const handleProjectsAdd = () => {
    let projectsArr = projectsContentArr;
    // newIndex = expIndex;
    let arr =
      JSON.parse(localStorage.getItem("projectsDeets")) == null
        ? []
        : JSON.parse(localStorage.getItem("projectsDeets"));
    // if (arr[arr.length - 1]["Role"] != "") {
    arr.push({
      RepoName: "",
      Dates: "",
      ProjDetails1: "",
      ProjDetails2: "",
    });
    let newIndex = projectsIndex + 1;
    // }
    //console.log("arr", arr);
    //console.log("newIndex", newIndex);
    setProjectsDeets(arr);
    localStorage.setItem("projectsDeets", JSON.stringify(arr));
    setProjectsIndex(newIndex);
    projectsArr.push(
      <>
        <Form>
          <div>
            <br />
            <hr />
            <br />
          </div>
        </Form>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="">
              <Form.Label>Project Repository Name</Form.Label>
              <Form.Control
                placeholder={
                  localStorage.getItem("projectsDeets") == null ||
                  JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                    "RepoName"
                  ] == ""
                    ? "GitHub Repo (Just the repo name w/o GitHub ID)"
                    : JSON.parse(localStorage.getItem("projectsDeets"))[
                        newIndex
                      ]["RepoName"]
                }
                onChange={(e) => {
                  handleProjectsDeets(newIndex, "RepoName", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="">
              <Form.Label>Dates</Form.Label>
              <Form.Control
                placeholder={
                  localStorage.getItem("projectsDeets") == null ||
                  JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                    "Dates"
                  ] == ""
                    ? "Enter Dates"
                    : JSON.parse(localStorage.getItem("projectsDeets"))[
                        newIndex
                      ]["Dates"]
                }
                onChange={(e) => {
                  handleProjectsDeets(newIndex, "Dates", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Projects Details Line 1</Form.Label>
              <TextareaAutosize
                maxLength="150"
                placeholder={
                  localStorage.getItem("projectsDeets") == null ||
                  JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                    "ProjDetails1"
                  ] == ""
                    ? "Project Details (150 characters limit)"
                    : JSON.parse(localStorage.getItem("projectsDeets"))[
                        newIndex
                      ]["ProjDetails1"]
                }
                onChange={(e) => {
                  handleProjectsDeets(newIndex, "ProjDetails1", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
          <Form.Row className={styles.formRow}>
            <Col>
              <Form.Label>Projects Details Line 2</Form.Label>
              <TextareaAutosize
                maxLength="150"
                placeholder={
                  localStorage.getItem("projectsDeets") == null ||
                  JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                    "ProjDetails2"
                  ] == ""
                    ? "More details (150 characters limit)"
                    : JSON.parse(localStorage.getItem("projectsDeets"))[
                        newIndex
                      ]["ProjDetails2"]
                }
                onChange={(e) => {
                  handleProjectsDeets(newIndex, "ProjDetails2", e.target.value);
                }}
                className={styles.aboutMeText}
                minRows="1"
              ></TextareaAutosize>
            </Col>
          </Form.Row>
        </Form>
      </>
    );
    setProjectsContentArr(projectsArr);
    setProjectsContentDisplay(
      projectsArr.map((item) => {
        return item;
      })
    );
  };
  const handleExpRemove = () => {
    let expArr = expContentArr;
    expArr.pop();
    setExpContentArr(expArr);
    setExpContentDisplay(
      expArr.map((item) => {
        return item;
      })
    );
  };
  const handleEduRemove = () => {
    let eduArr = eduContentArr;
    eduArr.pop();
    setEduContentArr(eduArr);
    setEduContentDisplay(
      eduArr.map((item) => {
        return item;
      })
    );
  };
  const handleProjectsRemove = () => {
    let projectsArr = projectsContentArr;
    projectsArr.pop();
    setProjectsContentArr(projectsArr);
    setProjectsContentDisplay(
      projectsArr.map((item) => {
        return item;
      })
    );
  };
  useEffect(() => {
    if (localStorage.getItem("expDeets") == null) {
      localStorage.setItem("expDeets", JSON.stringify(expDeets));
    }
    //console.log(expContentArr.length);
    let expTempArr = expContentArr.map((item) => {
      let index = expContentArr.indexOf(item);
      return (
        <>
          <div>
            {index != 0 ? (
              <>
                <br />
                <hr />
                <br />
              </>
            ) : null}
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "Role"
                    ] == ""
                      ? "Enter Role"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "Role"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "Role", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "Company"
                    ] == ""
                      ? "Enter Company Name"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "Company"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "Company", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "Duration"
                    ] == ""
                      ? "Enter Duration"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "Duration"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "Duration", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "Location"
                    ] == ""
                      ? "Enter Location"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "Location"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "Location", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Work Details Line 1</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "ExpDetails1"
                    ] == ""
                      ? "Details"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "ExpDetails1"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "ExpDetails1", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Work Details Line 2</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "ExpDetails2"
                    ] == ""
                      ? "More details"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "ExpDetails2"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "ExpDetails2", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Work Details Line 3</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("expDeets") == null ||
                    JSON.parse(localStorage.getItem("expDeets"))[index][
                      "ExpDetails3"
                    ] == ""
                      ? "Some more details (Because why not?)"
                      : JSON.parse(localStorage.getItem("expDeets"))[index][
                          "ExpDetails3"
                        ]
                  }
                  onChange={(e) => {
                    handleExpDeets(index, "ExpDetails3", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
          </Form>
        </>
      );
    });
    setExpContentArr(expTempArr);
    setExpContentDisplay(
      expTempArr.map((item) => {
        return item;
      })
    );
  }, [show2]);
  useEffect(() => {
    if (localStorage.getItem("projectsDeets") == null) {
      localStorage.setItem("projectsDeets", JSON.stringify(projectsDeets));
    }
    //console.log(projectsContentArr.length);
    let projectsTempArr = projectsContentArr.map((item) => {
      let newIndex = projectsContentArr.indexOf(item);
      return (
        <>
          <div>
            {newIndex != 0 ? (
              <>
                <br />
                <hr />
                <br />
              </>
            ) : null}
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Project Repository Name</Form.Label>
                <Form.Control
                  placeholder={
                    localStorage.getItem("projectsDeets") == null ||
                    JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                      "RepoName"
                    ] == ""
                      ? "GitHub Repo (Just the repo name w/o GitHub ID)"
                      : JSON.parse(localStorage.getItem("projectsDeets"))[
                          newIndex
                        ]["RepoName"]
                  }
                  onChange={(e) => {
                    handleProjectsDeets(newIndex, "RepoName", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Dates</Form.Label>
                <Form.Control
                  placeholder={
                    localStorage.getItem("projectsDeets") == null ||
                    JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                      "Dates"
                    ] == ""
                      ? "Enter Dates"
                      : JSON.parse(localStorage.getItem("projectsDeets"))[
                          newIndex
                        ]["Dates"]
                  }
                  onChange={(e) => {
                    handleProjectsDeets(newIndex, "Dates", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Projects Details Line 1</Form.Label>
                <TextareaAutosize
                  maxLength="150"
                  placeholder={
                    localStorage.getItem("projectsDeets") == null ||
                    JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                      "ProjDetails1"
                    ] == ""
                      ? "Project Details (150 characters limit)"
                      : JSON.parse(localStorage.getItem("projectsDeets"))[
                          newIndex
                        ]["ProjDetails1"]
                  }
                  onChange={(e) => {
                    handleProjectsDeets(
                      newIndex,
                      "ProjDetails1",
                      e.target.value
                    );
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Projects Details Line 2</Form.Label>
                <TextareaAutosize
                  maxLength="150"
                  placeholder={
                    localStorage.getItem("projectsDeets") == null ||
                    JSON.parse(localStorage.getItem("projectsDeets"))[newIndex][
                      "ProjDetails2"
                    ] == ""
                      ? "More details (150 characters limit)"
                      : JSON.parse(localStorage.getItem("projectsDeets"))[
                          newIndex
                        ]["ProjDetails2"]
                  }
                  onChange={(e) => {
                    handleProjectsDeets(
                      newIndex,
                      "ProjDetails2",
                      e.target.value
                    );
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
          </Form>
        </>
      );
    });
    setProjectsContentArr(projectsTempArr);
    setProjectsContentDisplay(
      projectsTempArr.map((item) => {
        return item;
      })
    );
  }, [show3]);
  useEffect(() => {
    if (localStorage.getItem("eduDeets") == null) {
      localStorage.setItem("eduDeets", JSON.stringify(eduDeets));
    }
    //console.log(eduContentArr.length);
    let eduTempArr = eduContentArr.map((item) => {
      let index = eduContentArr.indexOf(item);
      return (
        <>
          <div>
            {index != 0 ? (
              <>
                <br />
                <hr />
                <br />
              </>
            ) : null}
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "Degree"
                    ] == ""
                      ? "Enter Degree"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "Degree"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "Degree", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "Major"
                    ] == ""
                      ? "Enter Major"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "Major"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "Major", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>School</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "School"
                    ] == ""
                      ? "Enter School Name"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "School"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "School", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "Location"
                    ] == ""
                      ? "Enter Location"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "Location"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "Location", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "StartDate"
                    ] == ""
                      ? "Enter Degree Start Date"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "StartDate"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "StartDate", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "EndDate"
                    ] == ""
                      ? "Enter Degree End Date"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "EndDate"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "EndDate", e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Degree Details Line 1</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "EduDetails1"
                    ] == ""
                      ? "Details"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "EduDetails1"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "EduDetails1", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Degree Details Line 2</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "EduDetails2"
                    ] == ""
                      ? "More details"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "EduDetails2"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "EduDetails2", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Degree Details Line 3</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "EduDetails3"
                    ] == ""
                      ? "Some more details (Deja vu much?)"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "EduDetails3"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "EduDetails3", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Courses</Form.Label>
                <TextareaAutosize
                  placeholder={
                    localStorage.getItem("eduDeets") == null ||
                    JSON.parse(localStorage.getItem("eduDeets"))[index][
                      "Courses"
                    ] == ""
                      ? "Enter the courses you took (comma separated, for eg: Alogrithms, Computer Networks)"
                      : JSON.parse(localStorage.getItem("eduDeets"))[index][
                          "Courses"
                        ]
                  }
                  onChange={(e) => {
                    handleEduDeets(index, "Courses", e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
          </Form>
        </>
      );
    });
    setEduContentArr(eduTempArr);
    setEduContentDisplay(
      eduTempArr.map((item) => {
        return item;
      })
    );
  }, [show4]);

  return (
    <>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <a className="nav-link lead" onClick={handleShow1}>
            <b>{"Create"}</b>
          </a>
        </li>
      </ul>
      <Modal
        show={show1}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.createModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Let's Create!
            <span className={styles.smallsubtitleCreatePage}>
              (For best results, fill out all the information)
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={firstName}
                  placeholder={
                    localStorage.getItem("firstName") == null ||
                    localStorage.getItem("firstName") == ""
                      ? "First Name"
                      : localStorage.getItem("firstName")
                  }
                  onChange={(e) => {
                    localStorage.setItem("firstName", e.target.value);
                    setFirstName(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={lastName}
                  placeholder={
                    localStorage.getItem("lastName") == null ||
                    localStorage.getItem("lastName") == ""
                      ? "Last Name"
                      : localStorage.getItem("lastName")
                  }
                  onChange={(e) => {
                    localStorage.setItem("lastName", e.target.value);
                    setLastName(e.target.value);
                  }}
                />
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Headline</Form.Label>

                <Form.Control
                  className={styles.textBoxStyle}
                  value={headline}
                  placeholder={
                    localStorage.getItem("headline") == null ||
                    localStorage.getItem("headline") == ""
                      ? "(A short and sweet headline goes a long mile :))"
                      : localStorage.getItem("headline")
                  }
                  onChange={(e) => {
                    localStorage.setItem("headline", e.target.value);
                    setHeadline(e.target.value);
                  }}
                />
              </Col>
            </Form.Row>
          </Form>
          <Form>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>LinkedIn ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={linkedinId}
                  placeholder={
                    localStorage.getItem("linkedinId") == null ||
                    localStorage.getItem("linkedinId") == ""
                      ? "For eg: nachiket-trivedi"
                      : localStorage.getItem("linkedinId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("linkedinId", e.target.value);
                    setLinkedinId(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>GitHub ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={githubId}
                  placeholder={
                    localStorage.getItem("githubId") == null ||
                    localStorage.getItem("githubId") == ""
                      ? "For eg: nachiket-trivedi"
                      : localStorage.getItem("githubId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("githubId", e.target.value);
                    setGithubId(e.target.value);
                  }}
                />
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Instagram ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={instagramId}
                  placeholder={
                    localStorage.getItem("instagramId") == null ||
                    localStorage.getItem("instagramId") == ""
                      ? "(The app will use this to fetch your profile pic)"
                      : localStorage.getItem("instagramId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("instagramId", e.target.value);
                    setInstagramId(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Facebook ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={facebookId}
                  placeholder={
                    localStorage.getItem("facebookId") == null ||
                    localStorage.getItem("facebookId") == ""
                      ? "For eg: nachiketvtrivedi"
                      : localStorage.getItem("facebookId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("facebookId", e.target.value);
                    setFacebookId(e.target.value);
                  }}
                />
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Twitter ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={twitterId}
                  placeholder={
                    localStorage.getItem("twitterId") == null ||
                    localStorage.getItem("twitterId") == ""
                      ? "For eg: nachi_trivedi"
                      : localStorage.getItem("twitterId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("twitterId", e.target.value);
                    setTwitterId(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Medium ID</Form.Label>
                <Form.Control
                  className={styles.textBoxStyle}
                  value={mediumId}
                  placeholder={
                    localStorage.getItem("mediumId") == null ||
                    localStorage.getItem("mediumId") == ""
                      ? "For eg: nachiket5197"
                      : localStorage.getItem("mediumId")
                  }
                  onChange={(e) => {
                    localStorage.setItem("mediumId", e.target.value);
                    setMediumId(e.target.value);
                  }}
                />
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Description Line 1</Form.Label>
                <TextareaAutosize
                  value={description1}
                  placeholder={
                    localStorage.getItem("description1") == null ||
                    localStorage.getItem("description1") == ""
                      ? "About You (Write as much as you want :P)"
                      : localStorage.getItem("description1")
                  }
                  onChange={(e) => {
                    localStorage.setItem("description1", e.target.value);
                    setDescription1(e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Description Line 2</Form.Label>
                <TextareaAutosize
                  value={description2}
                  placeholder={
                    localStorage.getItem("description2") == null ||
                    localStorage.getItem("description2") == ""
                      ? "..And continue here (for an even spread of your fab content)"
                      : localStorage.getItem("description2")
                  }
                  onChange={(e) => {
                    localStorage.setItem("description2", e.target.value);
                    setDescription2(e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="1"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <div>
            <Button
              className={styles.footerBtn}
              variant="danger"
              onClick={handleRevert}
            >
              Revert
            </Button>
          </div>
          <div>
            <Button className={styles.footerBtn} variant="dark" disabled>
              <i class="fa fa-arrow-left"></i>
            </Button>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow2()}
            >
              <i class="fa fa-arrow-right"></i>
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="success"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.createModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expContentDisplay}
          <Form>
            <Form.Row>
              <div className={styles.addRemoveBtnGrp}>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      handleExpAdd();
                    }}
                  >
                    Add Another +
                  </Button>
                </div>
                <div>
                  {expContentArr.length > 0 ? (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        handleExpRemove();
                      }}
                    >
                      Remove -
                    </Button>
                  ) : null}
                </div>
              </div>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <div>
            <Button
              variant="danger"
              className={styles.footerBtn}
              onClick={handleRevert}
            >
              Revert
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow1()}
            >
              <i class="fa fa-arrow-left"></i>
            </Button>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow3()}
            >
              <i class="fa fa-arrow-right"></i>
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="success"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show3}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.createModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Skills And Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row className={styles.formRow}>
              <Col>
                <Form.Label>Skills</Form.Label>
                <TextareaAutosize
                  value={skills}
                  placeholder={
                    localStorage.getItem("skills") == null ||
                    localStorage.getItem("skills") == ""
                      ? "Your skills (comma separated, for eg: Java, Javascript)"
                      : localStorage.getItem("skills")
                  }
                  onChange={(e) => {
                    localStorage.setItem("skills", e.target.value);
                    setSkills(e.target.value);
                  }}
                  className={styles.aboutMeText}
                  minRows="2"
                ></TextareaAutosize>
              </Col>
            </Form.Row>
          </Form>
          <br />
          <hr />
          <br />
          {projectsContentDisplay}
          <Form>
            <Form.Row>
              <div className={styles.addRemoveBtnGrp}>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      handleProjectsAdd();
                    }}
                  >
                    Add Another +
                  </Button>
                </div>
                <div>
                  {expContentArr.length > 0 ? (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        handleProjectsRemove();
                      }}
                    >
                      Remove -
                    </Button>
                  ) : null}
                </div>
              </div>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <div>
            <Button
              className={styles.footerBtn}
              variant="danger"
              onClick={handleRevert}
            >
              Revert
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow2()}
            >
              <i class="fa fa-arrow-left"></i>
            </Button>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow4()}
            >
              <i class="fa fa-arrow-right"></i>
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="success"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show4}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.createModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eduContentDisplay}
          <Form>
            <Form.Row>
              <div className={styles.addRemoveBtnGrp}>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      handleEduAdd();
                    }}
                  >
                    Add Another +
                  </Button>
                </div>
                <div>
                  {expContentArr.length > 0 ? (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        handleEduRemove();
                      }}
                    >
                      Remove -
                    </Button>
                  ) : null}
                </div>
              </div>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <div>
            <Button
              variant="danger"
              className={styles.footerBtn}
              onClick={handleRevert}
            >
              Revert
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="dark"
              onClick={() => handleShow3()}
            >
              <i class="fa fa-arrow-left"></i>
            </Button>
            <Button className={styles.footerBtn} variant="dark" disabled>
              <i class="fa fa-arrow-right"></i>
            </Button>
          </div>
          <div>
            <Button
              className={styles.footerBtn}
              variant="success"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateModal;
