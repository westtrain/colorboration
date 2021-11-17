import React, { useState } from "react";
import "../styles/App.css";
import Palette from "./Palette";
import SetModal from "./SetModal";
import InputFileModal from "./InputFileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function MyPage() {
  const arr = Array.from({ length: 100 }, () => 0); //dummy
  const rankingArr = Array.from({ length: 3 }, () => 0);
  const [showInputFileModal, setShowInputFileModal] = useState(false);
  const [showSetModal, setShowSetModal] = useState(false);

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
            보라돌이
            <span className="setButton" onClick={() => setShowSetModal(true)}>
              <FontAwesomeIcon icon={faCog} size="1x" spin={false} />
            </span>
          </div>
          <div className="useremail">1234abcd@gmail.com</div>
        </section>
        <section className="view">
          <section className="area">
            <div className="profilelike">Like</div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="moreView">
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
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="moreView">
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
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="profilePalette">
              <Palette />
            </div>
            <div className="moreView">
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
