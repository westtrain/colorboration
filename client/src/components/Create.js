import React, { useState } from "react";
import "../styles/App.css";
import { ChromePicker } from "react-color";

function Create() {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerNumber, setPickerNumber] = useState(0);
  const [colorState, setColorState] = useState({
    color3: "#EEEEEE",
    color2: "#DDDDDD",
    color1: "#CCCCCC",
    color0: "#BBBBBB",
  });

  const handleColorPicker = (colorNumber) => {
    if (!showPicker) {
      setShowPicker(true);
    }
    setPickerNumber(colorNumber);
    console.log(colorState);
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
                style={{ background: colorState.color3 }}
              ></div>
              <div
                className="place c2"
                onClick={() => handleColorPicker(2)}
                style={{ background: colorState.color2 }}
              ></div>
              <div
                className="place c1"
                onClick={() => handleColorPicker(1)}
                style={{ background: colorState.color1 }}
              ></div>
              <div
                className="place c0"
                onClick={() => handleColorPicker(0)}
                style={{ background: colorState.color0 }}
              ></div>
            </div>

            <div className="addinput">
              <input></input>
            </div>
            <div className="submitpalette">Submit Palette</div>
          </div>
          <div className="colorselectarea">
            <div className="colorselect">
              {showPicker && pickerNumber === 3 ? (
                <ChromePicker
                  color={colorState.color3}
                  onChangeComplete={(color) => {
                    setColorState({ ...colorState, ["color3"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 2 ? (
                <ChromePicker
                  color={colorState.color2}
                  onChangeComplete={(color) => {
                    setColorState({ ...colorState, ["color2"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 1 ? (
                <ChromePicker
                  color={colorState.color1}
                  onChangeComplete={(color) => {
                    setColorState({ ...colorState, ["color1"]: color.hex });
                  }}
                />
              ) : null}
              {showPicker && pickerNumber === 0 ? (
                <ChromePicker
                  color={colorState.color0}
                  onChangeComplete={(color) => {
                    setColorState({ ...colorState, ["color0"]: color.hex });
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
