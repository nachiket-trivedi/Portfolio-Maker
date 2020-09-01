import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import userData from "../../config/userData";

const Landing = (props) => {
  let firstName, lastName, headline, icons;
  ({ icons } = userData);
  if (localStorage.getItem("isChanged") == "true") {
    firstName =
      JSON.parse(localStorage.getItem("userData"))["firstName"] == null ||
      JSON.parse(localStorage.getItem("userData"))["firstName"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["firstName"];
    lastName =
      JSON.parse(localStorage.getItem("userData"))["lastName"] == null ||
      JSON.parse(localStorage.getItem("userData"))["lastName"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["lastName"];
    headline =
      JSON.parse(localStorage.getItem("userData"))["headline"] == null ||
      JSON.parse(localStorage.getItem("userData"))["headline"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["headline"];

    let githubId =
      JSON.parse(localStorage.getItem("userData"))["githubId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["githubId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["githubId"];
    let facebookId =
      JSON.parse(localStorage.getItem("userData"))["facebookId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["facebookId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["facebookId"];
    let instagramId =
      JSON.parse(localStorage.getItem("userData"))["instagramId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["instagramId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["instagramId"];
    let linkedinId =
      JSON.parse(localStorage.getItem("userData"))["linkedinId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["linkedinId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["linkedinId"];
    let twitterId =
      JSON.parse(localStorage.getItem("userData"))["twitterId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["twitterId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["twitterId"];
    let mediumId =
      JSON.parse(localStorage.getItem("userData"))["mediumId"] == null ||
      JSON.parse(localStorage.getItem("userData"))["mediumId"] == ""
        ? ""
        : JSON.parse(localStorage.getItem("userData"))["mediumId"];
    icons[0]["handle"] = githubId;
    icons[1]["handle"] = facebookId;
    icons[2]["handle"] = instagramId;
    icons[3]["handle"] = linkedinId;
    icons[4]["handle"] = twitterId;
    icons[5]["handle"] = mediumId;
  } else ({ firstName, lastName, headline, icons } = userData);

  const [hoverstatus, setHoverstatus] = useState(
    new Array(icons.length).fill("socialicons")
  );

  const toggleHover = (data) => {
    const newhoverStatus = [...hoverstatus];

    if (data.event === "enter") {
      newhoverStatus[data.icon.id] = "socialiconshover";
      return setHoverstatus(newhoverStatus);
    } else if (data.event === "leave") {
      newhoverStatus[data.icon.id] = "socialicons";
      return setHoverstatus(newhoverStatus);
    }
  };

  return (
    <div>
      <div
        id="home"
        className="title jumbotron jumbotron-fluid bg-transparent bgstyle text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
      >
        <div id="stars"></div>
        <div className="container container-fluid text-center ">
          <h1 className="display-1">
            {(firstName == null ? "" : firstName) +
              " " +
              (lastName == undefined ? "" : lastName)}
          </h1>
          <Typist className="lead" cursor={{ show: false }}>
            {" "}
            {headline}
          </Typist>
          <div className="p-5">
            {icons.map((icon) =>
              icon["handle"] != null && icon["handle"] != "" ? (
                <a
                  key={icon.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={icon.url + "" + icon.handle}
                  aria-label={`My ${icon.image.split("-")[1]}`}
                >
                  <i
                    className={`fab ${icon.image}  fa-3x ${
                      hoverstatus[icon.id]
                    }`}
                    onMouseOver={() => toggleHover({ icon, event: "enter" })}
                    onMouseOut={() => toggleHover({ icon, event: "leave" })}
                  />
                </a>
              ) : null
            )}
          </div>
          {/* <a
            className="btn btn-outline-light btn-lg"
            href="#aboutme"
            role="button"
            aria-label="Learn more about me"
          >
            More about me
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
