import React, { useState, useEffect } from "react";
import userData from "../../config/userData";
import { Card } from "react-bootstrap";
import styles from "../../styles/Styles.module.css";

const Experience = () => {
  let { experience } = userData;
  const [expDisplay, setExpDisplay] = useState([]);

  useEffect(() => {
    //console.log("experience", experience);
    setExpDisplay(
      experience == null
        ? null
        : experience.map((item) => {
            //console.log("experience item", item);
            return (
              <>
                <Card className={styles.expMainCard}>
                  <Card.Body>
                    <div className={styles.expHeader}>
                      <div className={styles.expCompanyAndTitle}>
                        <div className={styles.expTitle}>
                          <b>{item[0]}</b>
                        </div>
                        ,&nbsp;
                        <div className={styles.expCompany}>{item[1]}</div>
                      </div>
                      <div className={styles.expDateAndPlace}>
                        <div className={styles.expDate}>{item[2]} &nbsp;</div>
                        <div>{"|"}</div>
                        <div className={styles.expPlace}> &nbsp; {item[3]}</div>
                      </div>
                    </div>
                    <hr />
                    <ul>
                      {item[4].map((deets) => {
                        return <li>{deets}</li>;
                      })}
                    </ul>
                  </Card.Body>
                </Card>
                <div className={styles.dottedLine}>
                  <div>.</div>
                  <div>.</div>
                  <div>.</div>
                </div>
              </>
            );
          })
    );
  }, []);

  return (
    <>
      <div id="experience" className={[styles.experiencePage].join(",")}>
        <div className="container container-fluid p-5">
          <h1 className="display-4 pb-5">Experience</h1>
          <div className="row">{expDisplay}</div>
        </div>
      </div>
    </>
  );
};

export default Experience;
