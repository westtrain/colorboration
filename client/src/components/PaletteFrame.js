import React from "react";
import "../styles/App.css";
import Palette from "./Palette";
import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

function PaletteFrame() {
  const [page, setpage] = useState(12);

  const onScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      setpage(page + 12);
    }
  };

  document.addEventListener("scroll", onScroll);

  const arr = Array.from({ length: page }, () => 0);
  return (
    <>
      {/* Body*/}
      <div className="middle">
        <div className="feed global">
          {arr.map((v, i) => {
            return (
              <div className="item">
                <Palette key={i} />
                <div className="flex">
                  <div className="action flex">
                    <LikeButton />
                  </div>
                  <span className="date">2days</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PaletteFrame;
