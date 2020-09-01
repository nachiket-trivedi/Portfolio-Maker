import React, { useState, useEffect } from "react";
import userData from "../../config/userData";
import styles from "../../styles/Styles.module.css";

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
      <a
        className="navbar-brand"
        href={process.env.PUBLIC_URL + "/index.html#home"}
      >
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
                  href={process.env.PUBLIC_URL + "/index.html#aboutme"}
                >
                  Me
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/index.html#experience"}
                >
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/index.html#projects"}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/index.html#education"}
                >
                  Education
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link lead"
                  href={process.env.PUBLIC_URL + "/index.html#skills"}
                >
                  Skills
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.rightHeader}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
