import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseConfig from "../firebaseConfig";

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

import Web3 from 'web3';
import Blockyards from '../abis/Blockyards.json';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const AddLisiting = ({
  user
}) => {
  const { id } = useParams();
  const [childData, setChildData] = useState("");
  const [newpropertyid, setNewpropertyid] = useState("");

  const [Account, setAccount] = useState("");
  const [Contract, setContract] = useState("");
  const [loading, isLoading] = useState(true);

  useEffect(async () => {
    await loadWeb3()
    await loadBlockchainData()
  }, []);

  const loadWeb3 = async function() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-ethereum browser detected')
    }
  }

  const loadBlockchainData = async function() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    setAccount(account)
    console.log(accounts[0])
    // Load contract
    const networkId = await web3.eth.net.getId()
    const networkData = Blockyards.networks[networkId]
    if(networkData) {
      const BlockyardsContract = new web3.eth.Contract(Blockyards.abi, networkData.address)
      setContract(BlockyardsContract)
      console.log(BlockyardsContract)
    } else {
      window.alert('Blockyards not deployed to connected network');
    }
  }

  const addLand = (_assetId, value, _metadata) => {
    isLoading(true)
    const _price = window.web3.utils.toWei(value.toString(), 'ether')
    Contract.methods.listASSET(_assetId, _price, _metadata).send({ from: Account })
    .once('receipt', (receipt) => {
      isLoading(false)
    })
  }

  

  async function handleSubmit(event) {
    const data = new FormData(event.currentTarget);
    // console.log(childData)

    const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`, {
      method: 'POST',
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
        amenities: data.get("amenities").split(','),
      }),
    })
    const resulting = await res.json();
    setNewpropertyid(resulting.result);
    console.log(resulting.result);
    addLand(newpropertyid, data.get("price"), user.email);
    event.target.reset();
  }

  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title={id ? "Edit Property" : "Add Property"}>
            <Add>
              <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
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

// export default AddLisiting;

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({ firebaseAppAuth })(AddLisiting);