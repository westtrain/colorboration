import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/App.css";
import Palette from "./Palette";
import LikeButton from "./LikeButton";
import { getRankingPalettes } from "../actions/index";

function Ranking() {
  const { period } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.usersReducer);

  const getRankingPalette = () => {
    console.log("getRankingPalette");
    axios
      .get(`http://localhost:4000/palettes/ranking/?period=${period}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response.data);
        dispatch(getRankingPalettes(response.data.data));
      })
      .catch((error) => {
        console.log("getRankingPalette() error", error.response);
      });
  };
  //getPalette();
  useEffect(() => {
    getRankingPalette();
  }, []);

  return (
    <>
      {/* Body*/}
      {state.rankingPalettes.length !== 0 ? (
        <div className="middle">
          <section className="ranking">
            <div className="rankingPalette">
              <Palette palette={state.rankingPalettes[0]} />
              <div className="flex">
                <div className="action flex">
                  <LikeButton palette={state.rankingPalettes[0]} />
                </div>
                <span className="date">2days</span>
              </div>
            </div>
            <div className="rankingPalette">
              <Palette palette={state.rankingPalettes[1]} />
              <div className="flex">
                <div className="action flex">
                  <LikeButton palette={state.rankingPalettes[1]} />
                </div>
                <span className="date">2days</span>
              </div>
            </div>
            <div className="rankingPalette">
              <Palette palette={state.rankingPalettes[2]} />
              <div className="flex">
                <div className="action flex">
                  <LikeButton palette={state.rankingPalettes[2]} />
                </div>
                <span className="date">2days</span>
              </div>
            </div>
          </section>

          <div className="feed global">
            {state.rankingPalettes.map((palette, i) => {
              if (i > 2) {
                return (
                  <div className="item">
                    <Palette key={i} palette={palette} />
                    <div className="flex">
                      <div className="action flex">
                        <LikeButton key={i} palette={palette} />
                      </div>
                      <span className="date">2days</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Ranking;
