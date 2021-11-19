import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; //
import axios from "axios";
import "../styles/App.css";
import Palette from "./Palette";
import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import { getAllPalettes } from "../actions/index";

function PaletteFrame({ isRandom }) {
  const [page, setpage] = useState(12);
  const [random, setRandom] = useState(isRandom);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.usersReducer);
  const { light } = useParams(); //path parmas로 받은 id값//

  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      setpage(page + 12);
    }
  };
  document.addEventListener("scroll", onScroll);
  const allEndPoint = "http://localhost:4000/palettes/all";
  const randomEndPoint = "http://localhost:4000/palettes/random";
  const lightPalettes = [3, 8, 9, 10, 11, 13, 30, 31, 32];

  const getPalette = () => {
    let endPoint = allEndPoint;
    if (isRandom) {
      endPoint = randomEndPoint;
    }
    axios
      .get(endPoint, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response.data.data);
        const palettesData = response.data.data;
        dispatch(getAllPalettes(palettesData));
      })
      .catch((error) => {
        console.log("getPalette() error", error.response);
      });
  };
  //getPalette();
  useEffect(() => {
    getPalette();
  }, [random]);

  const arr = Array.from({ length: page }, () => 0);
  return (
    <>
      {light ? (
        <div className="middle">
          <div className="feed global">
            {state.palettes.map((palette, i) => {
              if (i <= page && lightPalettes.includes(palette.id)) {
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
      ) : (
        <div className="middle">
          <div className="feed global">
            {state.palettes.map((palette, i) => {
              if (i <= page) {
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
      )}
    </>
  );
}

export default PaletteFrame;
