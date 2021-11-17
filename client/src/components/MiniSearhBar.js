import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import Tag from "./Tag";

function MiniSearchBar() {
  const arr = Array.from({ length: 20 }, () => 0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tags, setTags] = useState([]);
  const color = "#FFE652";

  const handledropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClear = () => {
    setTags([]);
  };

  const addTags = (tagColor) => {
    if (!tags.includes(tagColor)) {
      setTags([...tags, tagColor]);
    }
  };

  return (
    <>
      {showDropdown ? (
        <div className="createpaletteSearch ">
          <div className="color section">
            <div className="title">Colors</div>
            <div className="line"></div>
            <div className="colorsTag">
              {arr.map((v, i) => {
                return (
                  <div>
                    <Tag color={color} addTags={addTags} key={i} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="collection section">
            <div className="title">Collections</div>
            <div className="line"></div>
            <div className="colorsTag">
              {arr.map((v, i) => {
                return (
                  <div>
                    <Tag addTags={addTags} key={i} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="related section hide">
            <div className="title">Related</div>
          </div>
        </div>
      ) : null}
      <div className="addinput" onClick={handledropdown}>
        <input className="" placeholder="Search Tags" value={tags} readonly />
        {/* <input placeholder="Search palettes" onKeyUp="showTags()" /> */}
        <div className="searchIcon icon" icon="search"></div>
        <a className="minisearchclear" onClick={() => handleClear()}>
          ✕
        </a>
      </div>
    </>
  );
}

export default MiniSearchBar;
