import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import { closeLoginModal, openLoginModal } from "../actions/index";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import SearchBar from "./SearchBar";

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const state = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const handleLoginModal = () => {
    console.log(state.isLogin);
    if (state.isLogin) {
      dispatch(closeLoginModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <>
      {/* Header*/}
      <div className="header flex">
        {/* Header-Left*/}
        <div className="wrap flex">
          <div className="left">
            <Link to="/">
              <a className="logo flex">
                <img src="../logo.png" className="tongue" alt="logo" />
                <span className="mobileHide">Colorboration</span>
              </a>
            </Link>
          </div>
        </div>
        {/* Header-Middle*/}
        <div className="middle filterContainer">
          <SearchBar />
        </div>
        {/* Header-Right*/}
        <div className="rightHeader flexAround">
          <Link to="create">
            <span className="create mobileHide">CREATE</span>
          </Link>
          {/* */}
          {!state.isLogin ? (
            <span
              className="create mobileHide"
              onClick={() => {
                setShowLoginModal(true);
                handleLoginModal();
              }}
            >
              LOGIN
            </span>
          ) : (
            <Link to="mypage">
              <img
                className="miniuserphoto"
                width="31px"
                height="31px"
                src="https://pbs.twimg.com/profile_images/1066362123020722176/Xk24Wksm_400x400.jpg"
                alt="프로필사진"
              />
            </Link>
          )}
        </div>
        {showLoginModal ? (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            setShowSignUpModal={setShowSignUpModal}
          />
        ) : null}
        {showSignUpModal ? (
          <SignUpModal setShowSignUpModal={setShowSignUpModal} />
        ) : null}
      </div>
    </>
  );
}

export default Header;
