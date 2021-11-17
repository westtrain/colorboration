import React, { useState } from "react";
import "../styles/App.css";
import Palette from "./Palette";
import SetModal from "./SetModal";
import InputFileModal from "./InputFileModal";

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
            <span>
              <img
                className="setButton"
                width="17px"
                src="data:image/png;base64,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"
                alt="setting"
                onClick={() => setShowSetModal(true)}
              ></img>
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

            <img
              className="moreView"
              width="100px"
              height="100px"
              src="http://m.ssamplus.com/images/common/icon_more.png"
              alt="더보기"
            />
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
            <img
              className="moreView"
              width="100px"
              height="100px"
              src="http://m.ssamplus.com/images/common/icon_more.png"
              alt="더보기"
            />
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
            <img
              className="moreView"
              width="100px"
              height="100px"
              src="http://m.ssamplus.com/images/common/icon_more.png"
              alt="더보기"
            />
          </section>
        </section>
      </div>

      {showSetModal ? <SetModal setShowSetModal={setShowSetModal} /> : null}
    </>
  );
}

export default MyPage;
