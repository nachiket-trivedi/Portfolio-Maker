import React, { useState, useEffect } from "react";
import userData from "../../config/userData";
import { Button, Card, Badge } from "react-bootstrap";
import styles from "../../styles/Styles.module.css";
import ReactCardFlip from "react-card-flip";

const Education = () => {
  let { education } = userData;
  const [eduDisplay, setEduDisplay] = useState([]);
  const [isFlippedObj, setIsFlippedObj] = useState({});
  const [isChanged, setIsChanged] = useState();

  const handleClick = (e, i) => {
    e.preventDefault();
    let tempObj = isFlippedObj;
    tempObj[i] = !tempObj[i];
    setIsFlippedObj(tempObj);
    setIsChanged(JSON.stringify(tempObj));
  };

  useEffect(() => {
    let tempObj = {};
    for (let i in education) {
      tempObj[i] = false;
    }
    setIsFlippedObj(tempObj);
  }, []); //to set original flip state

  useEffect(() => {
    //console.log("education", education);
    setEduDisplay(
      education == null
        ? null
        : education.map((item) => {
            //console.log("education item", item);
            return (
              <div className={styles.eduCardDivBothSides}>
                <ReactCardFlip
                  isFlipped={isFlippedObj[education.indexOf(item)]}
                  flipDirection="horizontal"
                  flipSpeedBackToFront="0.3"
                  flipSpeedFrontToBack="0.3"
                  infinite="true"
                >
                  <div>
                    <Card>
                      <Card.Body className={styles.eduCardMain}>
                        <Card.Text>
                          <div className={styles.eduHeader}>
                            <div className={styles.eduHeaderLeft}>
                              <div className={styles.eduDegree}>
                                <b>
                                  {item[0]}, {item[1]}
                                </b>
                              </div>
                              <div className={styles.eduClg}>{item[2]}</div>
                            </div>
                            <div className={styles.eduHeaderRight}>
                              <div>
                                {item[3]} - {item[4]}
                              </div>
                              <div> {item[5]}</div>
                            </div>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <ul className={styles.eduDeets}>
                            {item[6].map((deets) => {
                              return <li>{deets}</li>;
                            })}
                          </ul>
                        </Card.Text>
                        <Card.Text>
                          <div className={styles.eduFooter}>
                            <Button
                              onClick={(e) =>
                                handleClick(e, education.indexOf(item))
                              }
                              className={styles.eduBtn}
                            >
                              See Courses
                            </Button>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  <div>
                    <Card className={styles.eduCardMainBack}>
                      <div className={styles.eduBackHeaderLabel}>
                        <h4>Courses</h4>
                      </div>
                      <Card.Body className={styles.eduCardMain}>
                        <Card.Text>
                          {item[7].map((course) => {
                            return (
                              <Badge className={styles.courseBadge}>
                                {course}
                              </Badge>
                            );
                          })}
                        </Card.Text>
                        <Card.Text>
                          <div className={styles.eduFooter}>
                            <Button
                              onClick={(e) => {
                                handleClick(e, education.indexOf(item));
                              }}
                              className={styles.eduBtn}
                            >
                              Back
                            </Button>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </ReactCardFlip>
              </div>
            );
          })
    );
  }, [isChanged]);

  return (
    <div id="education" className={[styles.educationPage].join(",")}>
      <div className="container container-fluid p-5">
        <h1 className="display-4 pb-5">Education</h1>
      </div>
      <div className={styles.eduCardsParentParent}>
        <div className={styles.eduCardsParent}>{eduDisplay}</div>
      </div>
    </div>
  );
};

export default Education;
