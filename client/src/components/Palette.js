import React from "react";
import "../styles/App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import { getPalette } from "../components/PaletteFrame";

function Palette({ palette, isPaletttePage }) {
  const navigate = useNavigate();
  const { color0, color1, color2, color3 } = palette;

  const handleClickPalette = () => {
    navigate(`/palettepage/${palette.id}`);
    const localHistory = localStorage.getItem("history");
    if (localHistory) {
      const historyArr = JSON.parse(localHistory);
      historyArr.push(palette);
      localStorage.setItem("history", JSON.stringify(historyArr));
    } else {
      localStorage.setItem("history", JSON.stringify([palette]));
    }
    console.log("++++++", JSON.parse(localHistory));
  };

  return (
    <>
      {/* Body*/}
      <div
        className="palette"
        onClick={() => {
          if (!isPaletttePage) handleClickPalette();
        }}
      >
        <div className="place c3" style={{ background: color3 }}>
          <CopyToClipboard text={color3.slice(1)}>
            <span>{color3}</span>
          </CopyToClipboard>
        </div>
        <div className="place c2" style={{ background: color2 }}>
          <CopyToClipboard text={color2.slice(1)}>
            <span>{color2}</span>
          </CopyToClipboard>
        </div>
        <div className="place c1" style={{ background: color1 }}>
          <CopyToClipboard text={color1.slice(1)}>
            <span>{color1}</span>
          </CopyToClipboard>
        </div>
        <div className="place c0" style={{ background: color0 }}>
          <CopyToClipboard text={color0.slice(1)}>
            <span>{color0}</span>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
}

export default Palette;
