import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/SetModal.css";
import DeleteModal from "./DeleteModal";
import { PasswordValidation } from "../utils/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SetModal({ setShowSetModal }) {
  const [settingState, setSettingState] = useState({
    userName: "",
    password: "",
  });
  const state = useSelector((state) => state.usersReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(""); //유저네임 유효 안내 메세지
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(""); //비밀번호 유효 안내 메세지
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(""); //비밀번호 확인 안내 메세지
  const [isValidPassword, setIsValidPassword] = useState(false); //비밀번호 확인 안내 메세지

  const { userName, password } = settingState;

  const onChangeSettingState = (e) => {
    const { name, value } = e.target;
    setSettingState({ ...settingState, [name]: value }); //set 정보 state 업데이트
    if (name === "password") {
      if (!PasswordValidation(value)) {
        setPasswordErrorMessage("특수문자 포함 8자 이상");
      }
    } else if (name === "confirmpassword") {
      if (password !== value) {
        setConfirmPasswordMessage("일치하지 않습니다");
        setIsValidPassword(false);
      } else {
        //비밀번호 확인 완료
        setConfirmPasswordMessage("");
        setIsValidPassword(true);
      }
    }
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    try {
      if (!PasswordValidation(password)) {
        // 패스워드 유효성 검사
        setPasswordErrorMessage("특수문자 포함 8자 이상");
      } else if (userName !== "" && isValidPassword) {
        // 유저네임 중복 확인
        axios
          .post("http://localhost:4000/auth/name", {
            headers: {
              Authorization: localStorage.getItem(state.accessToken),
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .then((res) => {
            console.log(res.status);
            if (res.status === 409) {
              setNameErrorMessage("이미 사용 중인 이름입니다 ");
            }
            console.log(res);
            console.log("회원정보 수정을 완료했습니다");
          });
      } else {
        // 유저네임 중복 검사 통과 후 유저 정보 수정 patch 요청
        axios
          .patch("http://localhost:4000/users", {
            headers: {
              Authorization: localStorage.getItem(state.accessToken),
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .then((res) => {
            console.log(res.status);
            if (res.status === 401) {
              setNameErrorMessage("회원 정보 수정 실패!");
            }
            console.log(res);
            console.log("회원정보 수정을 완료했습니다");
            setShowSetModal(false);
          });
      }
    } catch (err) {
      setNameErrorMessage("회원정보가 잘못 입력 되었습니다");
    }
  };

  return (
    <div className="page">
      <div className="modalback">
        <div className="setmodalview">
          <div className="setclosed " onClick={() => setShowSetModal(false)}>
            <FontAwesomeIcon icon={faTimes} size="1x" spin={false} />
          </div>
          <div className="setheadarea ">SETTING</div>
          <form onSubmit={onClickSubmit}>
            <div className="setarea namearea">
              <div>
                Name<span>{nameErrorMessage}</span>
              </div>
              <input
                type="text"
                onChange={onChangeSettingState}
                name="userName"
                required
                value={settingState.userName}
                placeholder="보라돌이"
              />
            </div>
            <div className="setarea passwordarea">
              <div>
                Password
                <span>{passwordErrorMessage}</span>
              </div>
              <input
                type="password"
                placeholder="특수문자 포함 8자 이상"
                onChange={onChangeSettingState}
                name="password"
                required
                value={settingState.password}
              />
            </div>
            <div className="setarea confirmarea">
              <div>
                Confirm Password<span>{confirmPasswordMessage}</span>
              </div>
              <input
                type="password"
                onChange={onChangeSettingState}
                name="confirmpassword"
                required
                // value={settingState.username}
              />
            </div>
            <button type="submit" className="save">
              SAVE
            </button>
          </form>
          <div
            className="deleteaccount"
            onClick={() => {
              setShowDeleteModal(true);
              //setShowSetModal(false);
            }}
          >
            DELETE MY ACCOUNT
          </div>
          {showDeleteModal ? (
            <DeleteModal
              setShowDeleteModal={setShowDeleteModal}
              //setShowSetModal={{ setShowSetModal }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SetModal;
