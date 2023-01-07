import React from "react";
import {
  HeaderContainer,
  FeaturedListingContainer,
  FeaturedAgentsContainer,
  HomeContactContainer,
  FooterContainer,
} from "../containers";
import { useEffect, useState } from "react";

const Home = ({ user }) => {
  return (
    <>
      <HeaderContainer bg="true" source="/images/banners/banner-homes.jpg" />
      <FeaturedListingContainer />
      {/*<FeaturedAgentsContainer />*/}
      {/*<HomeContactContainer />*/}
      <FooterContainer />
    </>
  );
};

export default Home;
