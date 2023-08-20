import React from "react";
import { Section } from "../components";
import {
  HeaderContainer,
  DashboardContainer,
  AdminUserListing,
  FooterContainer,
} from "../containers";

const UserListing = ({ user }) => {
  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title="Delisted Properties">
            <AdminUserListing user={user} />
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default UserListing;
