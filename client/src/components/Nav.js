import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";
import { setShowLoginModal } from "../actions/index";
import LoginModal from "./LoginModal";

function Nav() {
  const [showRanking, setShowRanking] = useState(false);
  const state = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hadleRankingTime = () => {
    setShowRanking(!showRanking);
  };

  console.log(state.isLogin);
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
            <Link to="ranking/months">
              <div className="button small" timeframe="30">
                Month
              </div>
            </Link>
            <Link to="ranking/year">
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
        ) : null}

        <Link to="random">
          <a className="tab button" tab="random">
            <div className="icon" icon="random"></div>Random
          </a>
        </Link>
        <a
          className="tab button"
          tab="collection"
          onClick={() => {
            if (state.isLogin) {
              navigate("/userpage/like");
            } else {
              dispatch(setShowLoginModal(true));
            }
          }}
        >
          <div className="icon" icon="like"></div>Like
        </a>
        <div className="line"></div>
      </div>
    </>
  );
}

export default Nav;
