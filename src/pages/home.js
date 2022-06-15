import React from "react";
import {
  HeaderContainer,
  FeaturedListingContainer,
  FeaturedAgentsContainer,
  HomeContactContainer,
  FooterContainer,
} from "../containers";
import { useEffect, useState } from "react";
import firebase from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseConfig from "../firebaseConfig";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const Home = ({
  user
}) => {
  console.log(user)
  return (
    <>
      <HeaderContainer bg="true" source="/images/banners/banner4.jpg" />
      <FeaturedListingContainer />
      <FeaturedAgentsContainer />
      <HomeContactContainer />
      <FooterContainer />
    </>
  );
};

// export default Home;

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({ firebaseAppAuth })(Home);