import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/App.css";
import Tag from "./Tag";

function SearchBar() {
  const arr = Array.from({ length: 20 }, () => 0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tagsId, setTagsId] = useState([]); //tag 아이디 저장
  const [tagsName, setTagsName] = useState([]); //tag name 저장
  const color = "#FFE652";
  const state = useSelector((state) => state.usersReducer);

  const handledropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClear = () => {
    setTagsId([]);
    setTagsName([]);
  };

  const addTags = (tag) => {
    if (!tagsId.includes(tag.id)) {
      setTagsId([...tagsId, tag.id]);
      setTagsName([...tagsName, tag.name]);
    }
  };

  const getTags = () => {};

  useEffect(() => {}, []);

  return (
    <>
      <div className="inputContainer flex" onClick={handledropdown}>
        <input
          className=""
          placeholder="Search palettes."
          value={tagsName}
          readonly
        />
        {/* <input placeholder="Search palettes" onKeyUp="showTags()" /> */}
        <div className="searchIcon icon" icon="search"></div>
        <a className="clear" onClick={() => handleClear()}>
          ✕
        </a>
        <a className="searchStart">Search</a>
      </div>
      {showDropdown ? (
        <div className="filterWindow dropdown hidden card ">
          <div className="color section">
            <div className="title">Colors</div>
            <div className="line"></div>
            <div className="colorsTag">
              {state.tags.map((tag, i) => {
                if (tag.isColorTag) {
                  return (
                    <div>
                      <Tag tag={tag} addTags={addTags} key={i} />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="collection section">
            <div className="title">Collections</div>
            <div className="line"></div>
            <div className="colorsTag">
              {state.tags.map((tag, i) => {
                if (!tag.isColorTag) {
                  return (
                    <div>
                      <Tag tag={tag} addTags={addTags} key={i} />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchBar;
