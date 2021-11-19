import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import "../styles/App.css";
import MiniSearchBar from "./MiniSearhBar";
import { ChromePicker } from "react-color";

function Create() {
  const state = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [pickerNumber, setPickerNumber] = useState(0);
  const [createState, setCreateState] = useState({
    color3: "#EEEEEE",
    color2: "#DDDDDD",
    color1: "#CCCCCC",
    color0: "#BBBBBB",
    tags: [],
    user_id: state.userInfo.id,
  });
  //addTagPalette
  //state.userInfo.user_info
  const onClickSubmit = () => {
    if (createState.tags.length === 0) {
      return;
    } else {
      axios
        .post("http://localhost:4000/palettes", createState, {
          headers: {
            Authorization: state.accessToken,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.status);
          console.log("팔레트 생성을 완료했습니다");
          navigate("/");
          //history.push("/");
        })
        .catch((error) => {
          console.log("error", error.response);
          //if (error.response.status === 402)
          console.log("팔레트 생성 실패!");
        });
    }
  };

  const handleColorPicker = (colorNumber) => {
    if (!showPicker) {
      setShowPicker(true);
    }
    setPickerNumber(colorNumber);
  };
  /* 피커창 닫기
  const closeColorPicker = (e) => {
    console.log(e.target);
    if (e.target === e.currentTarget) {
      setShowPicker(false);
    }
  };
*/
  return (
    <>
      {/* Body*/}
      <div className="middle">
        <div className="createarea">
          <div className="createitem">
            <div className="createhead">New Color Palette</div>

            <div className="palette">
              <div
                className="place c3"
                onClick={() => handleColorPicker(3)}
                style={{ background: createState.color3 }}
              ></div>
              <div
                className="place c2"
                onClick={() => handleColorPicker(2)}
                style={{ background: createState.color2 }}
              ></div>
              <div
                className="place c1"
                onClick={() => handleColorPicker(1)}
                style={{ background: createState.color1 }}
              ></div>
              <div
                className="place c0"
                onClick={() => handleColorPicker(0)}
                style={{ background: createState.color0 }}
              ></div>
            </div>

            <MiniSearchBar
              createState={createState}
              setCreateState={setCreateState}
            />
            <div className="submitpalette" onClick={() => onClickSubmit()}>
              Submit Palette
            </div>
          </div>
          <div className="colorselectarea">
            <div className="colorselect">
              {showPicker && pickerNumber === 3 ? (
                <ChromePicker
                  color={createState.color3}
                  onChangeComplete={(color) => {
                    setCreateState({ ...createState, ["color3"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 2 ? (
                <ChromePicker
                  color={createState.color2}
                  onChangeComplete={(color) => {
                    setCreateState({ ...createState, ["color2"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 1 ? (
                <ChromePicker
                  color={createState.color1}
                  onChangeComplete={(color) => {
                    setCreateState({ ...createState, ["color1"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 0 ? (
                <ChromePicker
                  color={createState.color0}
                  onChangeComplete={(color) => {
                    setCreateState({ ...createState, ["color0"]: color.hex });
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
