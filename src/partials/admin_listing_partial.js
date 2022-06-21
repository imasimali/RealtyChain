import React, { useState } from "react";

import { Table, AdminListing, Form } from "../components";

const PropertyHead = () => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Data>Name</Table.Data>
        <Table.Data>Price (ETH)</Table.Data>
        <Table.Data>Bedrooms</Table.Data>
        <Table.Data>Baths</Table.Data>
        <Table.Data>Amenities</Table.Data>
        <Table.Data>Action</Table.Data>
      </Table.Row>
    </Table.Head>
  );
};
const PropertyData = ({ property, handleSubmit }) => {
  const [iprice, setPrice] = useState("");
  const [ibeds, setBeds] = useState("");
  const [ibaths, setBaths] = useState("");
  const [iamenities, setAmenities] = useState("");

  const handleUpdate = () => {
    const data = {
      propertyid: property._id,
      price: iprice,
      beds: ibeds,
      baths: ibaths,
      amenities: iamenities,
    }
    handleSubmit(data)
  };

  return (
      <Table.Row>
        <Table.Data>{property._id}</Table.Data>
        <Table.Data><Form.Input type="text" placeholder="i.e 0.005" required onChange={(e) => setPrice(e.target.value)}/></Table.Data>
        <Table.Data><Form.Input type="text" placeholder="i.e 5" required onChange={(e) => setBeds(e.target.value)}/></Table.Data>
        <Table.Data><Form.Input type="text" placeholder="i.e 4" required onChange={(e) => setBaths(e.target.value)}/></Table.Data>
        <Table.Data><Form.Input type="text" placeholder="i.e Fireplace" required onChange={(e) => setAmenities(e.target.value)}/></Table.Data>
        <Table.Data>
        <Table.Button type="submit" onClick={(e) => {e.preventDefault(); handleUpdate(e);}}>Update</Table.Button>
        </Table.Data>
      </Table.Row>
  );
};

const AdminListingHeader = ({ selectId, handleDeleteAction }) => {
  return (
    <AdminListing.Header>
      <Form>
        <Form.Input type="text" placeholder="Search" />
      </Form>
      <AdminListing.Action>
        <AdminListing.Button
          onClick={() => handleDeleteAction(selectId)}
          bg="var(--bs-danger)">
          Delete
        </AdminListing.Button>
        <AdminListing.Button bg="var(--bs-blue)">
          <AdminListing.Anchor to={selectId && `/add-listing/${selectId}`}>
            Edit
          </AdminListing.Anchor>
        </AdminListing.Button>
        <AdminListing.Button bg="var(--bs-blue)">
          <AdminListing.Anchor to={selectId && `/property/${selectId}`}>
            View
          </AdminListing.Anchor>
        </AdminListing.Button>
      </AdminListing.Action>
    </AdminListing.Header>
  );
};

export { AdminListingHeader, PropertyHead, PropertyData };
