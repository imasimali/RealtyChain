import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Section } from "../components";
import { ListingItemContainer } from "./index";
// import { getFeaturedList } from "../redux/actions/propertiesAction";
import { getListingsFirebase } from "../firebase/Listing";

const FeaturedListingContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProperties, setfeaturedProperties] = useState([]);

  const requestfeatured = async function () {
    return await getListingsFirebase();
  };

  useEffect(async () => {
    const res = await requestfeatured();
    const featured = res.filter((item) => item.featured === true);
    setfeaturedProperties(featured);
    setIsLoading(false);
  }, []);

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
