import React, { useState, useEffect } from "react";
import axios from "axios";
import userData from "../../config/userData";
import styles from "../../styles/Styles.module.css";

const Me = () => {
  let {
    instaLink,
    instaQuerry,
    description1,
    description2,
    instagramId,
  } = userData;
  let desc1, desc2;
  let myDescription = [];

  instaLink = "https://www.instagram.com/";
  instaQuerry = "/?__a=1";
  if (localStorage.getItem("isChanged") == "true") {
    desc1 = JSON.parse(localStorage.getItem("userData"))["description1"];
    desc2 = JSON.parse(localStorage.getItem("userData"))["description2"];
    myDescription =
      (desc1 == "" || desc1 == null) && (desc2 == "" || desc2 == null)
        ? myDescription
        : [desc1, desc2];
    instagramId =
      JSON.parse(localStorage.getItem("userData"))["instagramId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["instagramId"] == ""
        ? instagramId
        : JSON.parse(localStorage.getItem("userData"))["instagramId"];
  } else {
    myDescription =
      (description1 == "" || description1 == null) &&
      (description2 == "" || description1 == null)
        ? myDescription
        : [description1, description2];
  }
  const [instaProfilePic, setInstaProfilePic] = useState("");
  const [showInsta, setShowInsta] = useState(true);

  useEffect(() => {
    if (showInsta) {
      handleRequest();
    } else {
      setInstaProfilePic(
        "https://lh3.googleusercontent.com/proxy/rHjhatFG9wFQciNqzUG19Wc7NoBb4RidNURhduWyvs5euim-Uc6unJD0qeQI9qSDAwbSwB_ZEl70E9eBiW9Ee2A"
      );
    }
  }, [showInsta, instagramId]);

  const handleRequest = (e) => {
    axios
      .get(instaLink + instagramId + instaQuerry)
      .then((response) => {
        //console.log("response.data", response.data);
        return setInstaProfilePic(
          response.data.graphql.user.profile_pic_url_hd
        );
      })
      .catch((error) => {
        setShowInsta(false);
        return console.error(error.message);
      });
  };

  return (
    <div id="aboutme" className={styles.aboutBg}>
      <div className="container container-fluid p-5">
        <div className="row">
          {showInsta && (
            <div className="col-5 d-none d-lg-block align-self-center">
              <img
                className={styles.meImg}
                src={instaProfilePic}
                alt="profilepicture"
              />
            </div>
          )}
          <div className={`col-lg-${showInsta ? "7" : "12"}`}>
            <h1 className="display-4 mb-5 text-center"> Me</h1>
            <div className={styles.beginQuote}>
              <h1 className={styles.quotes}>⅂</h1>
            </div>
            <div className={styles.fullDescDiv1}>{myDescription[0]}</div>
            <br />
            <div className={styles.fullDescDiv1}>{myDescription[1]}</div>
            <div className={styles.endQuote}>
              <h1 className={styles.quotes}>⅃</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
