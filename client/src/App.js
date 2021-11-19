import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import PaletteFrame from "./components/PaletteFrame";
import Create from "./components/Create";
import Ranking from "./components/Ranking";
import MyPage from "./components/MyPage";
import UserPage from "./components/UserPage";
import PalettePage from "./components/PalettePage";
// import HomePage from "./pages/HomePage";
// import RankingPage from "./pages/RankingPage";
// import RandomPage from "./pages/RandomPage";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <div className="flexStart">
        <Nav />
        <Routes>
          <Route
            exact={true}
            path="/"
            element={<PaletteFrame isRandom={false} />}
          />
          <Route
            exact={true}
            path="/:light"
            element={<PaletteFrame isRandom={false} />}
          />
          <Route exact={true} path="/ranking/:period" element={<Ranking />} />
          <Route
            exact={true}
            path="/random"
            element={<PaletteFrame isRandom={true} />}
          />
          <Route exact={true} path="/like" element={<PaletteFrame />} />
          <Route exact={true} path="/create" element={<Create />} />
          <Route exact={true} path="/mypage" element={<MyPage />} />
          <Route exact={true} path="/userpage/:type" element={<UserPage />} />
          <Route
            exact={true}
            path="/palettepage/:paletteid"
            element={<PalettePage />}
          />
        </Routes>
        <SideBar />
      </div>
    </>
  );
}

export default App;

//  page별로 구분하기 위해 Page 폴더 생성 후 아래 코드를 사용했으나, 라우터가 중첩되는 오류 발생
//  예)  랜덤 페이지 방문 후 랭킹 페이지로 이동하면 주소가 http://localhost:3000/random/ranking으로 된다.
// <>
//   <Routes>
//     <Route exact={true} path="/" element={<HomePage />} />
//     <Route exact={true} path="/ranking" element={<RankingPage />} />
//     <Route exact={true} path="/random" element={<RandomPage />} />
//     <Route exact={true} path="/like" element={<PaletteFrame />} />
//     <Route exact={true} path="/like" element={<PaletteFrame />} />
//     <Route exact={true} path="/create" element={<Create />} />
//   </Routes>
// </>
