import React, { useState, useEffect } from "react";
import MiniPalette from "./MiniPalette";
import "../styles/App.css";

function SideBar() {
  const [historyArr, setHistoryArr] = useState([]);
  const getHistory = () => {
    if (localStorage.getItem("history")) {
      setHistoryArr(JSON.parse(localStorage.getItem("history")));
    }
  };
  const setHistory = () => {
    localStorage.setItem("history", JSON.stringify([]));
  };

  useEffect(() => {
    //setHistory();
    getHistory();
  }, [historyArr]);
  return (
    <>
      <div className="sidebar right">
        <h1>History</h1>
        <div className="history">
          <div className="flex"></div>
          <div className="likesList">
            {historyArr.map((palette) => {
              return (
                <div className="item">
                  <MiniPalette palette={palette} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="line"></div>
      </div>
    </>
  );
}

export default SideBar;
