import React from "react";
import "../styles/App.css";
import Tag from "./Tag";
import Palette from "./Palette";
import LikeButton from "./LikeButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function PalettePage() {
  const arr = Array.from({ length: 5 }, () => 0);
  return (
    <div className="page">
      <div className="palettePageitem">
        {/* <div className="palette">
          <div className="place c3">
            <div className="place c2">
              <div className="place c1">
                <div className="place c0"></div>
              </div>
            </div>
          </div>
        </div> */}
        <Palette isPaletttePage={true} />
        <div className="flex">
          <div className="action flex">
            <LikeButton isPalettePage={true} />
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
              <div className="radiuscolor"></div>
            </div>
            <CopyToClipboard text={"342c36"}>
              <div className="hexcode">#342c36</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div className="radiuscolor"></div>
            </div>
            <CopyToClipboard text={"342c36"}>
              <div className="hexcode">#342c36</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div className="radiuscolor"></div>
            </div>
            <CopyToClipboard text={"342c36"}>
              <div className="hexcode">#342c36</div>
            </CopyToClipboard>
            <div className="rgbcode">RGB(52, 44,54)</div>
          </div>
          <div className="colorsection">
            <div className="radiuscolorsection">
              <div className="radiuscolor"></div>
            </div>
            <CopyToClipboard text={"C8E3D4"}>
              <div className="hexcode">#C8E3D4</div>
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
