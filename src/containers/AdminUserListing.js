import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { getPropertyList } from "../redux/actions/propertiesAction";
import {
  AdminListingHeader,
  PropertyData,
  PropertyHead,
} from "../partials/admin_listing_partial";

import { Table, AdminListing } from "../components";

import { useHistory } from "react-router-dom";
import { getListingsFirebase, relistListing } from "../firebase/Listing";

import Web3 from "web3";
import Blockyards from "../abis/Blockyards.json";

const AdminAgentListing = ({ user }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const [web3Enabled, setWeb3Enabled] = useState(false);

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
    const filteredProperty = res.filter(
      (property) =>
        property.owner.name === user?.email && property.featured === false
    );
    setProperties(filteredProperty);
    const isweb3 = await loadWeb3();
    const sameTestnet = isweb3 && (await loadBlockchainData());
    setWeb3Enabled(isweb3 && sameTestnet);
    setIsLoading(false);
  }, [user]);

  const reList = (_assetId, value, _metadata, data) => {
    setIsLoading(true);
    const _price = window.web3.utils.toWei(value.toString(), "ether");
    Contract.methods
      .listASSET(_assetId, _price, _metadata)
      .send({ from: Account })
      .once("receipt", (receipt) => {
        receipt.status ? update(data) : null;
        setIsLoading(false);
        setTimeout(() => {
          history.push("/property/" + data.propertyid);
        }, 15000);
      });
  };

  const update = async function (data) {
    return await relistListing({
      id: data.propertyid,
      waddress: Account,
      price: data.price,
      beds: data.beds,
      baths: data.baths,
      amenities: data.amenities.split(","),
    });
  };

  async function handleSubmit(data) {
    if (!web3Enabled) {
      alert("Please connect your metamask wallet and use Goerli test network.");
      return;
    }
    const meta = user.email || "none";
    if (
      Account != undefined &&
      data.propertyid != undefined &&
      data.price != undefined &&
      meta != undefined &&
      !isNaN(data.price)
    ) {
      reList(data.propertyid, data.price, meta, data);
    }
  }

  return (
    <AdminListing>
      {/*<AdminListing.Top>
        <AdminListingHeader
          selectId={selectId}
          handleDeleteAction={handleDeleteAction}
        />
      </AdminListing.Top>*/}
      <AdminListing.Content>
        <Table>
          <PropertyHead />
          <Table.Body>
            {properties.map((property) => (
              <PropertyData property={property} handleSubmit={handleSubmit} />
            ))}
          </Table.Body>
        </Table>
      </AdminListing.Content>
    </AdminListing>
  );
};

export default AdminAgentListing;
