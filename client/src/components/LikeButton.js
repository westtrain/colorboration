import React, { useState } from "react";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

function LikeButton({ isPalettePage }) {
  const [likeState, setLikeState] = useState(false);
  const handleClickLike = () => {
    setLikeState(!likeState);
  };

  return (
    <>
      {isPalettePage ? (
        <div className="buttonlike" onClick={() => handleClickLike()}>
          {likeState ? (
            <FontAwesomeIcon icon={fullHeart} size="0.5x" spin={false} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} size="0.5x" spin={false} />
          )}
          <span>53</span>
        </div>
      ) : (
        <div className="button like" onClick={() => handleClickLike()}>
          {likeState ? (
            <FontAwesomeIcon icon={fullHeart} size="0.5x" spin={false} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} size="0.5x" spin={false} />
          )}
          <span>53</span>
        </div>
      )}
    </>
  );
}

export default LikeButton;
