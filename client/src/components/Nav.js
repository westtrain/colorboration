import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

function Nav() {
  return (
    <>
      {/* Nav*/}
      <div className="left">
        <Link to="/">
          <a className="tab button" tab="new" status="on">
            <div className="icon" icon="new"></div>New
          </a>
        </Link>
        <Link to="ranking">
          <a className="tab button" tab="popular">
            <div className="icon" icon="popular"></div>Ranking
          </a>
        </Link>
        <div className="timeframe ">
          <Link to="ranking">
            <div className="button small" timeframe="30" status="on">
              Month
            </div>
          </Link>
          <Link to="ranking">
            <div className="button small" timeframe="365">
              Year
            </div>
          </Link>
          <Link to="ranking/alltime">
            <div className="button small" timeframe="4000">
              All time
            </div>
          </Link>
        </div>
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
