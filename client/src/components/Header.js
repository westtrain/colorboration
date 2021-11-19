import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import { setShowLoginModal } from "../actions/index";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import SearchBar from "./SearchBar";
//import ColorborationLogo from "../Colorboration_logo.jpg";

function Header() {
  //const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const state = useSelector((state) => state.usersReducer);
  const showLoginModal = state.showLoginModal;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginModal = (isOpen) => {
    //isOpen is booleantype
    dispatch(setShowLoginModal(isOpen));
  };

  const hadleClickCreate = () => {
    if (state.isLogin) {
      navigate("/create");
    } else {
      handleLoginModal(true);
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
                <img
                  src="https://user-images.githubusercontent.com/50609368/142510439-52209239-ed0e-4059-8a41-a57c82c9147f.jpg"
                  className="tongue"
                  alt="logo"
                  style={{ height: 50, width: 50 }}
                />
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
          <span
            className="create mobileHide"
            onClick={() => hadleClickCreate()}
          >
            CREATE
          </span>
          {!state.isLogin ? (
            <span
              className="create mobileHide"
              onClick={() => {
                handleLoginModal(true);
              }}
            >
              LOGIN
            </span>
          ) : (
            <div className="logoutProfile">
              <span className="create mobileHide" onClick={() => {}}>
                LOGOUT
              </span>
              <Link to="mypage">
                <img
                  className="miniuserphoto"
                  width="31px"
                  height="31px"
                  src="https://pbs.twimg.com/profile_images/1066362123020722176/Xk24Wksm_400x400.jpg"
                  alt="프로필사진"
                />
              </Link>
            </div>
          )}
        </div>
        {showLoginModal ? (
          <LoginModal setShowSignUpModal={setShowSignUpModal} />
        ) : null}
        {showSignUpModal ? (
          <SignUpModal setShowSignUpModal={setShowSignUpModal} />
        ) : null}
      </div>
    </>
  );
}

export default Header;
