import React from "react";
import "../styles/App.css";

function MiniPalette() {
  return (
    <>
      {/* Body*/}
      <div className="palette">
        <div className="place c3" style={{ background: "#9AE66E" }}>
          <div className="place c2" style={{ background: "#E59934" }}>
            <div className="place c1" style={{ background: "#753188" }}>
              <div className="place c0" style={{ background: "#2C272E" }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MiniPalette;
