import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import Palette from "./Palette";
import SetModal from "./SetModal";
import InputFileModal from "./InputFileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MyPage() {
  const state = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const [showInputFileModal, setShowInputFileModal] = useState(false);
  const [showSetModal, setShowSetModal] = useState(false);
  const [likePalette, setLikePalette] = useState([
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
  ]);
  const [myPalette, setMyPalette] = useState([
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
  ]);
  const [history, setHistory] = useState([
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
    {
      id: 0,
      color0: "#EEEEEE",
      color1: "#DDDDDD",
      color2: "#CCCCCC",
      color3: "#BBBBBB",
    },
  ]);

  const defaultPalette = {
    id: 0,
    color0: "#EEEEEE",
    color1: "#DDDDDD",
    color2: "#CCCCCC",
    color3: "#BBBBBB",
  };

  const getPalette = () => {
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
        while (palettesData.length < 4) {
          palettesData.push(defaultPalette);
        }
        setLikePalette(palettesData);
      })
      .catch((error) => {
        console.log("getPalette() error", error.response);
      });
    //마이 팔레트
    axios
      .get(`http://localhost:4000/palettes/?user_id=${state.userInfo.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const palettesData = response.data.data;
        while (palettesData.length < 4) {
          palettesData.push(defaultPalette);
        }
        setMyPalette(palettesData);
      })
      .catch((error) => {
        console.log("getPalette() error", error.response);
      });

    //히스토리
    if (localStorage.getItem("history")) {
      const palettesData = JSON.parse(localStorage.getItem("history"));
      while (palettesData.length < 4) {
        palettesData.push(defaultPalette);
      }
      setHistory(palettesData);
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
          <div className="editButton">
            <button onClick={() => setShowInputFileModal(true)}>EDIT</button>
            {showInputFileModal ? (
              <InputFileModal setShowInputFileModal={setShowInputFileModal} />
            ) : null}
          </div>
          <div className="username">
            {state.userInfo.name}
            <span className="setButton" onClick={() => setShowSetModal(true)}>
              <FontAwesomeIcon icon={faCog} size="1x" spin={false} />
            </span>
          </div>
          <div className="useremail">{state.userInfo.email}</div>
        </section>
        <section className="view">
          <section className="area">
            <div className="profilelike">Like</div>
            <div className="profilePalette">
              <Palette palette={likePalette[0]} />
            </div>
            <div className="profilePalette">
              <Palette palette={likePalette[1]} />
            </div>
            <div className="profilePalette">
              <Palette palette={likePalette[2]} />
            </div>
            <div className="profilePalette">
              <Palette palette={likePalette[3]} />
            </div>
            <div
              className="moreView"
              onClick={() => navigate("/userpage/like")}
            >
              <div>more</div>

              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="1x"
                spin={false}
                color="rgb(136, 134, 134)"
              />
            </div>
          </section>
          <section className="area mypalettesarea">
            <div className="mypalettes">My palettes</div>
            <div className="profilePalette">
              <Palette palette={myPalette[0]} />
            </div>
            <div className="profilePalette">
              <Palette palette={myPalette[1]} />
            </div>
            <div className="profilePalette">
              <Palette palette={myPalette[2]} />
            </div>
            <div className="profilePalette">
              <Palette palette={myPalette[3]} />
            </div>
            <div
              className="moreView"
              onClick={() => navigate("/userpage/mypalette")}
            >
              <div>more</div>

              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="1x"
                spin={false}
                color="rgb(136, 134, 134)"
              />
            </div>
          </section>
          <section className="area historyarea">
            <div className="history">History</div>
            <div className="profilePalette">
              <Palette palette={history[0]} />
            </div>
            <div className="profilePalette">
              <Palette palette={history[1]} />
            </div>
            <div className="profilePalette">
              <Palette palette={history[2]} />
            </div>
            <div className="profilePalette">
              <Palette palette={history[3]} />
            </div>
            <div
              className="moreView"
              onClick={() => navigate("/userpage/history")}
            >
              <div>more</div>

              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="1x"
                spin={false}
                color="rgb(136, 134, 134)"
              />
            </div>
          </section>
        </section>
      </div>

      {showSetModal ? <SetModal setShowSetModal={setShowSetModal} /> : null}
    </>
  );
}

export default MyPage;
