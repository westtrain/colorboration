import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function MiniPalette({ palette }) {
  const navigate = useNavigate();
  const { color0, color1, color2, color3 } = palette;

  const handleClickPalette = () => {
    navigate(`/palettepage/${palette.id}`);
  };
  return (
    <>
      {/* Body*/}
      <div
        className="palette"
        onClick={() => {
          handleClickPalette();
        }}
      >
        <div className="place c3" style={{ background: color3 }}>
          <div className="place c2" style={{ background: color2 }}>
            <div className="place c1" style={{ background: color1 }}>
              <div className="place c0" style={{ background: color0 }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MiniPalette;
