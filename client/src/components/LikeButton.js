import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import { setShowLoginModal } from "../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

function LikeButton({ palette, isPalettePage }) {
  const [likeState, setLikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(palette.likeCount);
  //const [palette, setPalette] = useState(palette);
  const state = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLike = () => {
    if (state.isLogin) {
      axios
        .get(`http://localhost:4000/likes`, {
          headers: {
            Authorization: state.accessToken,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log("response", response.data.data);
          const likeList = response.data.data;
          setLikeState(false);
          likeList.map((v) => {
            if (v.id === palette.id) {
              setLikeState(true);
            }
          });
        })
        .catch((error) => {
          console.log("get like error", error.response);
        });
    }
  };
  const getLikeCount = () => {
    axios
      .get(`http://localhost:4000/palettes/${palette.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("palettepage response", response.data);
        setLikeCount(response.data.data.likeCount);
      })
      .catch((error) => {
        console.log("palettepage error", error.response);
      });
  };

  const handleClickLike = () => {
    if (state.isLogin) {
      // 로그인 된 상태
      if (!likeState) {
        // 좋아요가 안 눌러져 있다면
        axios
          .post(
            `http://localhost:4000/likes/${palette.id}`,
            {},
            {
              headers: {
                Authorization: state.accessToken,
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log("response", response.data);
            setLikeState(true);
            getLikeCount();
          })
          .catch((error) => {
            console.log("like error", error.response);
          });
      } else {
        // 좋아요가 눌러져 있다면
        console.log("되니");
        axios
          .delete(`http://localhost:4000/likes/${palette.id}`, {
            headers: {
              Authorization: state.accessToken,
            },
            withCredentials: true,
          })
          .then((response) => {
            console.log("response", response.data);
            setLikeState(false);
            getLikeCount();
          })
          .catch((error) => {
            console.log("unlike error", error.response);
          });
      }
    } else {
      //비로그인 상태
      dispatch(setShowLoginModal(true));
    }
  };

  useEffect(() => {
    getLike();
  }, [state.isLogin]);

  return (
    <>
      {isPalettePage ? (
        <div className="buttonlike" onClick={() => handleClickLike()}>
          {likeState ? (
            <FontAwesomeIcon icon={fullHeart} size="0.5x" spin={false} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} size="0.5x" spin={false} />
          )}
          <span>{likeCount}</span>
        </div>
      ) : (
        <div className="button like" onClick={() => handleClickLike()}>
          {likeState ? (
            <FontAwesomeIcon icon={fullHeart} size="0.5x" spin={false} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} size="0.5x" spin={false} />
          )}
          <span>{likeCount}</span>
        </div>
      )}
    </>
  );
}

export default LikeButton;
