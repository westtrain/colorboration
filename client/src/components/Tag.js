import React from "react";
import "../styles/App.css";

function Tag({ color, addTags }) {
  return (
    <button className="tag" onClick={() => addTags("#FFE652")}>
      <div className="tagcolor" style={{ background: color, color: color }}>
        x
      </div>
      tag
    </button>
  );
}

export default Tag;
