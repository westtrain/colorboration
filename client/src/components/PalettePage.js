import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import Tag from "./Tag";
import Palette from "./Palette";
import LikeButton from "./LikeButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function PalettePage({ paltte, handleLike }) {
  const arr = Array.from({ length: 5 }, () => 0);
  const [palette, setPaltte] = useState({
    // 최초 렌더링과 getPalette()에러로 팔레트 데이터가 없을 때 default
    id: 0,
    color0: "#FFFFFF",
    color1: "#FFFFFF",
    color2: "#FFFFFF",
    color3: "#FFFFFF",
  });
  const { paletteid } = useParams(); //path parmas로 받은 id값

  const getPalette = () => {
    axios
      .get(`http://localhost:4000/palettes/${paletteid}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("palettepage response", response.data);
        setPaltte(response.data.data);
      })
      .catch((error) => {
        console.log("palettepage error", error.response);
      });
  };

  //getPalette();
  useEffect(() => {
    getPalette();
  }, []);

  return (
    <div className="page">
      <div className="palettePageitem">
        <Palette palette={palette} isPaletttePage={true} />
        <div className="flex">
          <div className="action flex">
            <LikeButton palette={palette} isPalettePage={true} />
            <div className="buttonlink" onClick="link">
              <FontAwesomeIcon icon={faLink} size="0.5x" spin={false} />
              <span>link</span>
            </div>
          </div>
          <span className="date">2days</span>
        </div>
        <div className="colorarr">
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div
                className="radiuscolor"
                style={{ backgroundColor: palette.color3 }}
              ></div>
            </div>
            <CopyToClipboard text={palette.color3.slice(1)}>
              <div className="hexcode">{palette.color3}</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div
                className="radiuscolor"
                style={{ backgroundColor: palette.color2 }}
              ></div>
            </div>
            <CopyToClipboard text={palette.color2.slice(1)}>
              <div className="hexcode">{palette.color2}</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div
                className="radiuscolor"
                style={{ backgroundColor: palette.color1 }}
              ></div>
            </div>
            <CopyToClipboard text={palette.color1.slice(1)}>
              <div className="hexcode">{palette.color1}</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div
                className="radiuscolor"
                style={{ backgroundColor: palette.color0 }}
              ></div>
            </div>
            <CopyToClipboard text={palette.color0.slice(1)}>
              <div className="hexcode">{palette.color0}</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
        </div>
        <div className="tagcollection">
          {arr.map((v) => {
            return (
              <div>
                <Tag />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PalettePage;
