import React, { useState, useEffect } from "react";
import links from "../constants/routes/nav-links";
import { HeaderWrapper, Banner, Jumbotron } from "../components";
import firebase from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseConfig from "../firebaseConfig";

import { AdvancedSearchContainer, SideNavigationContainer } from "./index";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const HeaderContainer = ({ bg, source, user }) => {
  const [sideNavShown, setSideNavShown] = useState(false);
  const [sideNavHidden, setSideNavHidden] = useState(true);
  const [fixed, setFixed] = useState(false);

  const changeBackgroundColorAndPosition = () => {
    if (window.pageYOffset > 100) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  window.addEventListener("scroll", changeBackgroundColorAndPosition);

  const handleSideNavigation = () => {
    setSideNavHidden((prevState) => !prevState);
    setSideNavShown((prevState) => !prevState);
  };

  return (
    <Banner bg={bg} source={source}>
      <HeaderWrapper bg={bg} fixed={fixed}>
        <HeaderWrapper.Container>
          <HeaderWrapper.Title bg={bg}>
            <HeaderWrapper.Link bg={bg} fixed={fixed} to="/">
              Block Yards
            </HeaderWrapper.Link>
          </HeaderWrapper.Title>
          <HeaderWrapper.LinksContainer>
            <HeaderWrapper.List links="links">
              {links.map((link) => (
                <HeaderWrapper.Item key={link.to}>
                  <HeaderWrapper.Anchor bg={bg} fixed={fixed} to={`${link.to}`}>
                    { !(link.name == "login") ? link.name : ( user != null ? link.name = "dashboard" : link.name = "login" ) }
                  </HeaderWrapper.Anchor>
                </HeaderWrapper.Item>
              ))}
            </HeaderWrapper.List>
            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/add-listing" special="true">
                  Add Listing
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>
            <HeaderWrapper.List side="side">
              <HeaderWrapper.Item>
                <HeaderWrapper.Button onClick={handleSideNavigation}>
                  <HeaderWrapper.Icon name="fa fa-bars" />
                </HeaderWrapper.Button>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>
          </HeaderWrapper.LinksContainer>
        </HeaderWrapper.Container>
      </HeaderWrapper>
      {bg === "true" && (
        <Jumbotron>
          <Jumbotron.Left>
            <Jumbotron.Title>Find The Home You Deserve With Us</Jumbotron.Title>
            <Jumbotron.Text>
              We have implemented the blockchain on real estate industry.
            </Jumbotron.Text>
          </Jumbotron.Left>
          {/*<Jumbotron.Right>
            <AdvancedSearchContainer />
          </Jumbotron.Right>*/}
        </Jumbotron>
      )}
      <SideNavigationContainer
        sideNavShown={sideNavShown}
        sideNavHidden={sideNavHidden}
        setSideNavHidden={setSideNavHidden}
        setSideNavShown={setSideNavShown}
      />
    </Banner>
  );
};

// export default HeaderContainer;

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({ firebaseAppAuth })(HeaderContainer);