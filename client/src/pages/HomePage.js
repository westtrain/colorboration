import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import PaletteFrame from "../components/PaletteFrame";
import "../styles/App.css";

function HomePage() {
  return (
    <>
      <Header />
      <div className="flexStart">
        <Nav />
        <PaletteFrame />
        <SideBar />
      </div>
    </>
  );
}

export default HomePage;
