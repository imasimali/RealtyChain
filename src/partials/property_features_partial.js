import React, { useState } from "react";
import { Property } from "../components";
export const PropertGallery = ({ image }) => {
  return (
    <Property.Gallery>
        <Property.Image source={image} />
      {/*<Property.ImageContainer>
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image source={image[1]} />
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image source={image[2]} />
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image source={image[3]} />
      </Property.ImageContainer>*/}
    </Property.Gallery>
  );
};

export const PropertyFeatures = ({ features }) => {
  const [featuresShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Details and Features</Property.InfoTitle>
        <Property.Icon
          name={featuresShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={featuresShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Bedrooms : </Property.Span>
            {features.beds}
          </Property.Text>
          <Property.Text>
            <Property.Span>Baths : </Property.Span>
            {features.baths}
          </Property.Text>
        </Property.InfoItem>

        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Status : </Property.Span>
            {features.status ? "Active" : "Not Active"}
          </Property.Text>
          <Property.Text>
            <Property.Span>Corner : </Property.Span>
            {features.corner ? "Yes" : "No"}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Furnished : </Property.Span>
            {features.furnished ? "Yes" : "No"}
          </Property.Text>
          <Property.Text>
            <Property.Span>Swimming Pool : </Property.Span>
            {features.pool ? "Availalbe" : "Not Available"}
          </Property.Text>
        </Property.InfoItem>
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAmenities = ({ amenities }) => {
  const [amenitiesShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Amenities</Property.InfoTitle>
        <Property.Icon
          name={amenitiesShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={amenitiesShown}>
        {amenities.map((amenity) => (
          <Property.InfoItem key={amenity}>
            <Property.Text>{amenity}</Property.Text>
          </Property.InfoItem>
        ))}
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAddress = ({ address }) => {
  const [addressShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Address</Property.InfoTitle>
        <Property.Icon
          name={addressShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={addressShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Text>
            <Property.Span>Street : </Property.Span>
            {address.location}
          </Property.Text>
            <Property.Span>Address : </Property.Span>
            {address.location}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Text>
            <Property.Span>City : </Property.Span>
            {address.city}
          </Property.Text>
            <Property.Span>Province : </Property.Span>
            {address.state}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Area : </Property.Span>
            {address.areatext}
          </Property.Text>
        </Property.InfoItem>
      </Property.InfoContent>
    </Property.Info>
  );
};
export const PropertyDescription = ({ description }) => {
  const [descriptionShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Property Description</Property.InfoTitle>
        <Property.Icon
          name={descriptionShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent block="true" contentShown={descriptionShown}>
        <Property.Text>{description}</Property.Text>
      </Property.InfoContent>
    </Property.Info>
  );
};
