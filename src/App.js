import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GlobalStyle from "./globalStyles";
import Footer from "./components/Footer/Footer";
import PostCreateView from "./components/ForHome/PostCreateView";
import AnnouncementCreateView from "./components/ForHome/AnnouncementCreateView";
import EditUserView from "./components/Navbar/EditUserView";

import EditView from "./components/ForHome/EditView";
import Reports from "./pages/Reports";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  // Use state for toggling hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <MainContentStyled>
        <div className="lines">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
          <div className="line-5"></div>
        </div>

        <Router forceRefresh={true}>
          <GlobalStyle />
          {/* <Sidebar isOpen={isOpen} toggle={toggle} /> */}
          <Navbar toggle={toggle} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/create" exact component={PostCreateView} />
            <Route path="/edit/:id" exact component={EditView} />
            <Route path="/reports" exact component={Reports} />
            <Route path="/announcementCreateView" exact component={AnnouncementCreateView} />
            <Route path="/editUserView" exact component={EditUserView} />

          </Switch>
        </Router>

        <Footer />
      </MainContentStyled>
    </>
  );
}

const MainContentStyled = styled.main`
  position: relative;
  .lines {
    position: absolute;
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    opacity: 0.1;
    z-index: -1;

    @media screen and (max-width: 768px) {
      display: none;
    }

    .line-1,
    .line-2,
    .line-3,
    .line-4,
    .line-5 {
      width: 1px;
      min-height: 100vh;
      background-color: #000;
    }
  }
`;

export default App;
