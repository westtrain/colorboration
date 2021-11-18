import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/SignUpModal.css";
import { EmailValidation, PasswordValidation } from "../utils/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
function SignUpModal({ setShowSignUpModal }) {
  const [signUpState, setSignUpState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const state = useSelector((state) => state.usersReducer);
  const [emailErrorMessage, setEmailErrorMessage] = useState(""); // 이메일 유효 안내 메세지
  const [nameErrorMessage, setNameErrorMessage] = useState(""); //유저네임 유효 안내 메세지
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(""); //비밀번호 유효 안내 메세지
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(""); //비밀번호 확인 안내 메세지
  const [isValidPassword, setIsValidPassword] = useState(false); //confirm 비밀번호 일치 여부 저장

  const { email, password, name } = signUpState;

  const onChangeSignUpState = (e) => {
    const { name, value } = e.target;
    setSignUpState({ ...signUpState, [name]: value }); //set 정보 state 업데이트
    if (name === "email") {
      if (value !== "" && EmailValidation(value)) {
        setEmailErrorMessage("");
      } else if (value === "") {
        setEmailErrorMessage("이메일을 입력하세요");
      } else {
        setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
      }
    } else if (name === "password") {
      if (!PasswordValidation(value)) {
        setPasswordErrorMessage("특수문자 포함 8자 이상");
      } else {
        setPasswordErrorMessage("");
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

  const onClickSubmit = () => {
    console.log("===============");
    if (!PasswordValidation(password)) {
      // 패스워드 유효성 검사
      console.log("~~~~~~~~~0");
      setPasswordErrorMessage("특수문자 포함 6자 이상");
      console.log("~~~~~~~~~q1");
    } else if (!EmailValidation(email)) {
      setEmailErrorMessage("이메일 형식이 올바르지 않습니다");
      console.log("~~~~~~~~~2");
    } else if (name !== "" && isValidPassword) {
      // confirm 비밀번호 일치 확인
      // 유저네임 중복 확인
      console.log("~~~~~~~~~3");
      axios
        .post(
          "http://localhost:4000/auth/name",
          { name: signUpState.name },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          console.log("네임 중복 검사를 통과했습니다");
          // 유저네임 중복 검사 통과 후 회원 가입 post 요청
          axios
            .post("http://localhost:4000/auth/signup", signUpState, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.status);
              console.log("회원가입을 완료했습니다");
              setShowSignUpModal(false);
            })
            .catch((error) => {
              console.log("error", error.response);
              if (error.response.status === 401)
                setNameErrorMessage("회원가입 실패!");
            });
        })
        .catch((error) => {
          console.log("error", error.response);
          if (error.response.status === 409) {
            setNameErrorMessage("이미 사용 중인 이름입니다 ");
          }
        });
    }
  };

  return (
    <div className="page">
      <div className="modalback">
        <div className="signupmodalview">
          <div
            className="signupClosed"
            onClick={() => {
              setShowSignUpModal();
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" spin={false} />
          </div>
          <div className="signupheadarea ">SIGN UP</div>
          <form onSubmit={onClickSubmit}>
            <div className="signuparea signupemailarea">
              <div>
                Email<span>{emailErrorMessage}</span>
              </div>
              <input
                type="text"
                placeholder="example@example.com"
                onChange={onChangeSignUpState}
                name="email"
                required
                value={signUpState.email}
              />
            </div>
            <div className="signuparea signuppasswordarea">
              <div>
                Password
                <span>{passwordErrorMessage}</span>
              </div>
              <input
                type="password"
                placeholder="특수문자 포함 8자 이상"
                onChange={onChangeSignUpState}
                name="password"
                required
                value={signUpState.password}
              />
            </div>
            <div className="signuparea signupconfirmarea">
              <div>
                Confirm<span>{confirmPasswordMessage}</span>
              </div>
              <input
                type="password"
                onChange={onChangeSignUpState}
                name="confirmpassword"
                required
              />
            </div>
            <div className="signuparea signupnamearea">
              <div>
                Name<span>{nameErrorMessage}</span>
              </div>
              <input
                type="text"
                onChange={onChangeSignUpState}
                name="name"
                required
                value={signUpState.name}
              />
            </div>
            <button type="submit" className="signup">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
