import React from "react";

import { Listing } from "../components";

const ListingItemContainer = ({ featured, width }) => {
  // console.log(featured)
  
  return (
    <Listing width={width}>
      <Listing.Top>
        <Listing.TopItem>
          <Listing.Image source={featured.images} />
          {/*<Listing.TopItemContainer>
            <Listing.TopItemInfo>
              <Listing.Icon></Listing.Icon>
              <Listing.Text location>{featured.address.locality}</Listing.Text>
            </Listing.TopItemInfo>
          </Listing.TopItemContainer>*/}
        </Listing.TopItem>
      </Listing.Top>
      <Listing.Bottom>
        <Listing.BottomItem>
          <Listing.Title>
            <Listing.Anchor to={`/property/${featured._id}`}>
              {featured.type} For Sale
            </Listing.Anchor>
          </Listing.Title>
          <Listing.Price>ETH {featured.price}</Listing.Price>
          <Listing.Text description>
            {featured.description.substring(0, 100)}
          </Listing.Text>
          <Listing.Button>
            <Listing.Anchor to={`/property/${featured._id}`}>
              Details
            </Listing.Anchor>
          </Listing.Button>
          <Listing.AgentContainer>
            <Listing.AgentImageContainer>
              <Listing.Image
                src={`/images/agents/default.jpg`/*${featured.agent.image}*/}
                profile="true"
              />
            </Listing.AgentImageContainer>
            <Listing.AgentName>
              <Listing.Anchor to={`/agents/default.jpg`/*${featured.agent.name}*/}>
                {featured.owner.name}
              </Listing.Anchor>
            </Listing.AgentName>
          </Listing.AgentContainer>
        </Listing.BottomItem>
      </Listing.Bottom>
    </Listing>
  );
};

export default ListingItemContainer;
