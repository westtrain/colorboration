import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Ranking from "../components/Ranking";
import "../styles/App.css";

function RankingPage() {
  return (
    <>
      <Header />
      <div className="flexStart">
        <Nav />
        <Ranking />
        <SideBar />
      </div>
    </>
  );
}

export default RankingPage;
