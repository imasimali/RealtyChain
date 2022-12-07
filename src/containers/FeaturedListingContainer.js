import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Section } from "../components";
import { ListingItemContainer } from "./index";
// import { getFeaturedList } from "../redux/actions/propertiesAction";

const FeaturedListingContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProperties, setfeaturedProperties] = useState([]);

  const requestfeatured = async function () {
    const res = await fetch(`/.netlify/functions/addnew`);
    const json = await res.json();
    return json;
  };

  useEffect(async () => {
    const res = await requestfeatured();
    setfeaturedProperties(res);
    setIsLoading(false);
  }, []);

  // console.log(featuredProperties)

  return (
    <Section bgColor="--bs-light">
      <Section.InnerContainer>
        <Section.Header>
          <Section.Title>Our Featured Listing</Section.Title>
        </Section.Header>
        {isLoading ? (
          <h3>Loading ...</h3>
        ) : (
          <Section.Content>
            {featuredProperties.map((featured) => (
              <ListingItemContainer key={featured._id} featured={featured} />
            ))}
          </Section.Content>
        )}
        <Section.Footer>
          <Section.Button>More Listing</Section.Button>
        </Section.Footer>
      </Section.InnerContainer>
    </Section>
  );
};

export default FeaturedListingContainer;
