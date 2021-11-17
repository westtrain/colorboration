import React from "react";
import "../styles/App.css";

function Tag({ color, addTags }) {
  const isColorTag = true;
  return (
    <button className="tag" onClick={() => addTags("#FFE652")}>
      {isColorTag ? (
        <div className="tagcolor" style={{ background: color, color: color }}>
          x
        </div>
      ) : null}
      tag
    </button>
  );
}

export default Tag;
