import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import Tag from "./Tag";

function SearchBar() {
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
      <div className="inputContainer flex" onClick={handledropdown}>
        <input
          className=""
          placeholder="Search palettes. 최대 3개의 태그 검색이 가능합니다"
          value={tags}
          readonly
        />
        {/* <input placeholder="Search palettes" onKeyUp="showTags()" /> */}
        <div className="searchIcon icon" icon="search"></div>
        <a className="clear" onClick={() => handleClear()}>
          ✕
        </a>
      </div>
      {showDropdown ? (
        <div className="filterWindow dropdown hidden card ">
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
    </>
  );
}

export default SearchBar;
