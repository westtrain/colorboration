import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/App.css";
import Tag from "./Tag";

function MiniSearchBar({ createState, setCreateState }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tagsId, setTagsId] = useState([]); //tag 아이디 저장
  const [tagsName, setTagsName] = useState([]); //tag name 저장
  const state = useSelector((state) => state.usersReducer);

  const handledropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClear = () => {
    setTagsId([]);
    setTagsName([]);
  };

  const handleSearch = () => {
    if (tagsId.length !== 0) {
      axios
        .get("http://localhost:4000/palettes/filterd", tagsId, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((error) => {
          console.log("search error", error.response);
        });
    }
  };

  const addTags = (tag) => {
    if (!tagsId.includes(tag.id)) {
      setTagsId([...tagsId, tag.id]);
      setTagsName([...tagsName, tag.name]);
      setCreateState({
        ...createState,
        ["tags"]: [...createState.tags, tag.id],
      });
      console.log(createState.tags);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      {showDropdown ? (
        <div className="createpaletteSearch ">
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
      <div className="addinput" onClick={handledropdown}>
        <input
          className=""
          placeholder="Search Tags"
          value={tagsName}
          readonly
        />
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
