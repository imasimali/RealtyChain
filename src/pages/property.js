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
import { getListingsFirebase, updateListing } from "../firebase/Listing";

import Web3 from "web3";
import Blockyards from "../abis/Blockyards.json";

const Listing = ({ user }) => {
  const { id } = useParams();
  const [web3Enabled, setWeb3Enabled] = useState(false);
  const [featuredProperties, setfeaturedProperties] = useState([]);
  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [Account, setAccount] = useState("");
  const [Contract, setContract] = useState("");

  const loadWeb3 = async function () {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return true;
    } else {
      return false;
    }
  };

  const loadBlockchainData = async function () {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account);
    console.log(accounts[0]);
    // Load contract
    const networkId = await web3.eth.net.getId();
    const networkData = Blockyards.networks[networkId];
    if (networkData) {
      const BlockyardsContract = new web3.eth.Contract(
        Blockyards.abi,
        networkData.address
      );
      setContract(BlockyardsContract);
      return true;
    } else {
      return false;
    }
  };

  const requestlistings = async function () {
    return await getListingsFirebase();
  };

  useEffect(async () => {
    const res = await requestlistings();
    const filteredProperty = res.filter((property) => property._id === id);
    const filteredFeatured = res.filter((property) => property._id !== id);
    setfeaturedProperties(filteredFeatured);
    setProperty(filteredProperty[0]);
    const isweb3 = await loadWeb3();
    const sameTestnet = isweb3 && (await loadBlockchainData());
    setWeb3Enabled(isweb3 && sameTestnet);
    // const isOwner = checkAsset(property._id)
    setIsLoading(false);
  }, [id]);

  const buyAsset = async (_assetId) => {
    Contract.methods
      .buyASSET(_assetId)
      .send({ from: Account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        receipt.status ? update() : null;
      });
  };

  const delistAsset = async (_assetId) => {
    Contract.methods
      .delistASSET(_assetId)
      .send({ from: Account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        receipt.status ? update() : null;
      });
  };

  const update = async function () {
    return await updateListing({
      id: property._id,
      email: user.email,
      owner: Account,
    });
  };

  async function handleBuy(event) {
    if (web3Enabled && Account != undefined && property._id != undefined) {
      await buyAsset(property._id);
      // console.log(cRes)
    } else {
      alert(
        "Please connect your metamask wallet and use Sepolia test network."
      );
    }
  }

  async function handleDelist(event) {
    if (web3Enabled && Account != undefined && property._id != undefined) {
      await delistAsset(property._id);
      // console.log(cRes)
    } else {
      alert(
        "Please connect your metamask wallet and use Sepolia test network."
      );
    }
  }

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
                  <Property.Title>
                    {property.type} For Sale - Property {property._id}
                  </Property.Title>
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
                  <ContactAgentContainer
                    handleDelist={handleDelist}
                    handleBuy={handleBuy}
                    Account={Account}
                    property={property}
                  />
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
