import React, { useState, useEffect } from "react";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import { Section, Summary } from "../components";
import BarGraph from "../helpers/graphs";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const requestfeatured = async function () {
    const res = await fetch(`/.netlify/functions/addnew`);
    const json = await res.json();
    return json;
  };

  useEffect(async () => {
    const res = await requestfeatured();
    setProperties(res);
    setIsLoading(false);
  }, []);

  return (
    <>
      <HeaderContainer />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          {isLoading ? (
            <h3>Loading ...</h3>
          ) : (
            <DashboardContainer title="Agency Summaries">
              <Summary.Top>
                <Summary.Anchor to="" bg="var(--bs-teal)">
                  <Summary.AnchorDiv>
                    <Summary.Title>{properties.length}</Summary.Title>
                    <Summary.Text>All Properties</Summary.Text>
                  </Summary.AnchorDiv>
                  <Summary.AnchorDiv>
                    <Summary.Icon name="fas fa-map-marker-alt" />
                  </Summary.AnchorDiv>
                </Summary.Anchor>
                <Summary.Anchor to="" bg="var(--bs-pink)">
                  <Summary.AnchorDiv>
                    <Summary.Title>4</Summary.Title>
                    <Summary.Text>All Users</Summary.Text>
                  </Summary.AnchorDiv>
                  <Summary.AnchorDiv>
                    <Summary.Icon name="fas fa-users" />
                  </Summary.AnchorDiv>
                </Summary.Anchor>
              </Summary.Top>
              <Summary.Bottom>
                <Summary.BottomHeader>
                  <Summary.Title>Properties By Category</Summary.Title>
                </Summary.BottomHeader>
                <Summary.BottomContent>
                  <BarGraph properties={properties} />
                </Summary.BottomContent>
              </Summary.Bottom>
            </DashboardContainer>
          )}
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default Dashboard;
