import React from "react";
import { useEffect, useState } from "react";
import { Section, Add, Form } from "../components";
import { useParams } from "react-router-dom";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import {
  Descrition,
  Location,
  Media,
  Details,
} from "../partials/add_property_partials";
import { useHistory } from "react-router-dom";

import Web3 from "web3";
import Blockyards from "../abis/Blockyards.json";

const AddLisiting = ({ user }) => {
  const { id } = useParams();
  const [childData, setChildData] = useState("");
  const [newpropertyid, setNewpropertyid] = useState("");
  const history = useHistory();

  const [web3Enabled, setWeb3Enabled] = useState(false);

  const [Account, setAccount] = useState("");
  const [Contract, setContract] = useState("");
  const [loading, isLoading] = useState(true);

  useEffect(async () => {
    const isweb3 = await loadWeb3();
    const sameTestnet = isweb3 && (await loadBlockchainData());
    setWeb3Enabled(isweb3 && sameTestnet);
  }, []);

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

  const addLand = (_assetId, value, _metadata) => {
    isLoading(true);
    const _price = window.web3.utils.toWei(value.toString(), "ether");
    Contract.methods
      .listASSET(_assetId, _price, _metadata)
      .send({ from: Account })
      .once("receipt", (receipt) => {
        isLoading(false);
      });
  };

  async function handleSubmit(event) {
    if (!web3Enabled) {
      alert(
        "Please connect your metamask wallet and use Sepolia test network."
      );
      return;
    }
    const data = new FormData(event.currentTarget);
    const price = data.get("price");
    const meta = user.email || "none";
    // console.log(childData)

    const res = await fetch(`/.netlify/functions/addnew`, {
      method: "POST",
      body: JSON.stringify({
        email: user?.email ? user.email : "None",
        waddress: Account,
        images: childData,
        category: data.get("category"),
        price: data.get("price"),
        featured: data.get("featured") == "Yes" ? true : false,
        date: data.get("date"),
        description: data.get("description"),
        location: data.get("location"),
        city: data.get("city"),
        state: data.get("state"),
        latitude: data.get("latitude"),
        longitude: data.get("longitude"),
        beds: data.get("beds"),
        baths: data.get("baths"),
        areasqft: data.get("areasqft"),
        areatext: data.get("areatext"),
        garage: data.get("garage") == "Available" ? true : false,
        pool: data.get("pool") == "Available" ? true : false,
        furnished: data.get("furnished") == "Available" ? true : false,
        status: data.get("status") == "Available" ? true : false,
        amenities: data.get("amenities").split(","),
      }),
    });
    if (
      Account != undefined &&
      price != undefined &&
      meta != undefined &&
      !isNaN(price)
    ) {
      const resulting = await res.json();
      setNewpropertyid(resulting.result);
      console.log(resulting.result);
      addLand(newpropertyid, price, meta);
      event.target.reset();
      document.getElementById(".message").innerText = ``;
      setTimeout(() => {
        history.push("/property/" + resulting.result);
      }, 15000);
    } else {
      document.getElementById(
        ".message"
      ).innerText = `Request Failed - Please check input`;
    }
  }

  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title={id ? "Edit Property" : "Add Property"}>
            <Add>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <Descrition />
                <Location />
                <Media passChildData={setChildData} />
                <Details />
                <Add.Footer>
                  <Form.FormGroup class="form-group">
                    <Form.SubmitInput
                      type="submit"
                      value={id ? "Update Property" : "Submit Property"}
                    />
                    <div id=".message"></div>
                  </Form.FormGroup>
                  {id && (
                    <Form.FormGroup class="form-group">
                      <Form.SubmitInput type="submit" value="Cancel Update" />
                    </Form.FormGroup>
                  )}
                </Add.Footer>
              </Form>
            </Add>
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default AddLisiting;
