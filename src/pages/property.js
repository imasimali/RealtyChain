import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProperty,
//   getFeaturedList,
// } from "../redux/actions/propertiesAction";
import { Section, Property } from "../components";
import {
  HeaderContainer,
  ContactAgentContainer,
  PropertyRelatedContainer,
  FooterContainer,
} from "../containers";

import {
  PropertGallery,
  PropertyAddress,
  PropertyAmenities,
  PropertyFeatures,
  PropertyDescription,
} from "../partials/property_features_partial";

const Listing = () => {
  const { id } = useParams();
  const [featuredProperties, setfeaturedProperties] = useState([])
  const [property, setProperty] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const requestlistings = async function() {
    const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`);
    const json = await res.json()
    return json
  };

  useEffect(async () => {
    const res = await requestlistings();
    const filteredProperty = res.filter(
      (property) => property._id === id
    );
    const filteredFeatured = res.filter(
      (property) => property._id !== id
    );
    setfeaturedProperties(filteredFeatured);
    setProperty(filteredProperty[0]);
    setIsLoading(false);
  }, [id]);

  // console.log(featuredProperties)
  // console.log(property)

  return (
    <div>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
      <div>
        <HeaderContainer bg="false" />
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <Property.Header>
              <Property.HeaderLeft>
                <Property.Title>{property.type} For Sale - Property {property._id}</Property.Title>
                <Property.Location>
                  <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                  <Property.Text>{property.address.location}</Property.Text>
                </Property.Location>
              </Property.HeaderLeft>
              <Property.HeaderRight>
                <Property.Title>
                  ETH {"   "}
                  {property.price}
                  <Property.Span>
                    {property.type === "rental" ? "/ Month" : ""}
                  </Property.Span>
                </Property.Title>
              </Property.HeaderRight>
            </Property.Header>
            <Property.Content>
              <Property.Left>
                <PropertGallery image={property.images} />
                <PropertyFeatures features={property.features} />
                <PropertyAmenities amenities={property.amenities} />
                <PropertyAddress address={property.address} />
                <PropertyDescription description={property.description} />
              </Property.Left>
              <Property.Right>
                <ContactAgentContainer property={property} />
                <PropertyRelatedContainer
                  property={property}
                  featured={featuredProperties}
                />
              </Property.Right>
            </Property.Content>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </div>
      )}
    </div>
  );
};

export default Listing;
