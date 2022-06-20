import React, { useState } from "react";

import { Table, AdminListing, Form } from "../components";

const PropertyHead = () => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Data>Name</Table.Data>
        <Table.Data>Price (ETH)</Table.Data>
        <Table.Data>Category</Table.Data>
        <Table.Data>Bedrooms</Table.Data>
        <Table.Data>Baths</Table.Data>
        <Table.Data>Amenities</Table.Data>
        <Table.Data>Action</Table.Data>
      </Table.Row>
    </Table.Head>
  );
};
const PropertyData = ({ property, setChildData }) => {
  // const [selected, setSelected] = useState(false);

  const handleUpdate = (id) => {
    
    // setSelected((prevState) => !prevState);
    // setChildData(id);
  };

  return (
    <Table.Row>
      <Table.Data>{property._id}</Table.Data>
      <Table.Data>{property.price}</Table.Data>
      <Table.Data>{property.type}</Table.Data>
      <Table.Data>{property.features.beds}</Table.Data>
      <Table.Data>{property.features.baths}</Table.Data>
      <Table.Data>{property.amenities}</Table.Data>
      {property.featured? <Table.Data>
        <Table.Button onClick={(e) => {e.preventDefault(); handleUpdate(property.id);}}>
          Update
        </Table.Button>
      </Table.Data> :
      <Table.Data>
        <Table.Button >
          Listed
        </Table.Button>
      </Table.Data>}
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
