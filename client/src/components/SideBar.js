import React from "react";
import MiniPalette from "./MiniPalette";
import "../styles/App.css";

function SideBar() {
  const arr = Array.from({ length: 8 }, () => 0);
  return (
    <>
      <div className="sidebar right">
        <h1>History</h1>
        <div className="history">
          <div className="flex"></div>
          <div className="likesList">
            {arr.map((v) => {
              return (
                <div className="item">
                  <MiniPalette />
                </div>
              );
            })}
          </div>
        </div>
        <div className="line"></div>
      </div>
    </>
  );
}

export default SideBar;

{
  /* Side Bar*/
}
<div className="right">
  <div className="likes">
    <div className="flex">
      <a href="#" className="title">
        Collection
      </a>
    </div>
    <div className="likesList">
      <div className="palette"></div>
    </div>
  </div>
</div>;
