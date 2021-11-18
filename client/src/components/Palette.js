import React from "react";
import "../styles/App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";

function Palette({ palette, isPaletttePage }) {
  const navigate = useNavigate();

  const handleClickPalette = () => {
    navigate("/palettepage");
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
        <div className="place c3" style={{ background: "#87AAAA" }}>
          <CopyToClipboard text={"87AAAA"}>
            <span>#87AAAA</span>
          </CopyToClipboard>
        </div>
        <div className="place c2" style={{ background: "#C8E3D4" }}>
          <CopyToClipboard text={"C8E3D4"}>
            <span>#C8E3D4</span>
          </CopyToClipboard>
        </div>
        <div className="place c1" style={{ background: "#F6EABE" }}>
          <CopyToClipboard text={"F6EABE"}>
            <span>#F6EABE</span>
          </CopyToClipboard>
        </div>
        <div className="place c0" style={{ background: "#F6D7A7" }}>
          <CopyToClipboard text={"F6D7A7"}>
            <span>#F6D7A7</span>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
}

export default Palette;
