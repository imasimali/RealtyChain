import React from "react";
import { Section } from "../components";
import {
  HeaderContainer,
  DashboardContainer,
  AdminAgentListing,
  FooterContainer,
} from "../containers";

const AgentListing = ({ user }) => {
  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title="Delisted Properties">
            <AdminAgentListing user={user} />
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default AgentListing;
