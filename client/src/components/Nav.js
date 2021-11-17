import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";

function Nav() {
  const [showRanking, setShowRanking] = useState(false);
  const history = useNavigate();
  const hadleRankingTime = () => {
    setShowRanking(!showRanking);
  };
  return (
    <>
      {/* Nav*/}
      <div className="left">
        <Link to="/">
          <a className="tab button" tab="new">
            <div className="icon" icon="new"></div>New
          </a>
        </Link>
        {/* <Link to="ranking"> */}
        <a className="tab button" tab="popular" onClick={hadleRankingTime}>
          <div className="icon" icon="popular"></div>Ranking
        </a>
        {/* </Link> */}
        {showRanking ? (
          <div className="timeframe ">
            <Link to="ranking">
              <div className="button small" timeframe="30">
                Month
              </div>
            </Link>
            <Link to="ranking">
              <div className="button small" timeframe="365">
                Year
              </div>
            </Link>
            <Link to="ranking">
              <div className="button small" timeframe="4000">
                All time
              </div>
            </Link>
          </div>
        ) : null}

        <Link to="random">
          <a className="tab button" tab="random">
            <div className="icon" icon="random"></div>Random
          </a>
        </Link>
        <Link to="userpage">
          <a className="tab button" tab="collection">
            <div className="icon" icon="like"></div>Like
          </a>
          <div className="line"></div>
        </Link>
      </div>
    </>
  );
}

export default Nav;
