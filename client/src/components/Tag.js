import React from "react";
import "../styles/App.css";

function Tag({ tag, addTags }) {
  if (tag !== undefined) {
    const { name, isColorTag, id } = tag;

    return (
      <button className="tag" onClick={() => addTags(tag)}>
        {isColorTag ? (
          <div className="tagcolor" style={{ background: name, color: name }}>
            x
          </div>
        ) : null}
        {name}
      </button>
    );
  } else {
    return <></>;
  }
}

export default Tag;
