import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import Palette from "./Palette";
import LikeButton from "./LikeButton";

function UserPage() {
  const [palettes, setPalettes] = useState([]);
  const { type } = useParams();
  const state = useSelector((state) => state.usersReducer);

  const getPalette = () => {
    if (type === "like") {
      axios
        // like 팔레트
        .get("http://localhost:4000/likes", {
          headers: {
            Authorization: state.accessToken,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log("response", response.data.data);
          const palettesData = response.data.data;
          setPalettes(palettesData);
        })
        .catch((error) => {
          console.log("getPalette() error", error.response);
        });
    }
    //마이 팔레트
    else if (type === "mypalette") {
      axios
        .get(`http://localhost:4000/palettes/?user_id=${state.userInfo.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          const palettesData = response.data.data;
          setPalettes(palettesData);
        })
        .catch((error) => {
          console.log("getPalette() error", error.response);
        });
    }
  };
  //getPalette();
  useEffect(() => {
    getPalette();
  }, []);
  return (
    <>
      {/* Body*/}
      <div className="middle">
        <section className="profile">
          <img
            className="userphoto"
            width="15%"
            height="15%"
            src="https://pbs.twimg.com/profile_images/1066362123020722176/Xk24Wksm_400x400.jpg"
            alt="프로필사진"
          />

          <div className="username">
            {state.userInfo.name}님의 {type}
          </div>
        </section>

        <div className="feed global">
          {palettes.map((palette) => {
            return (
              <div className="item">
                <Palette palette={palette} />
                <div className="flex">
                  <div className="action flex">
                    <LikeButton palette={palette} />
                  </div>
                  <span className="date">2days</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserPage;
