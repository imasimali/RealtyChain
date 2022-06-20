import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { getPropertyList } from "../redux/actions/propertiesAction";
import {
  AdminListingHeader,
  PropertyData,
  PropertyHead,
} from "../partials/admin_listing_partial";

import { Table, AdminListing } from "../components";

const AdminAgentListing = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [childData, setChildData] = useState([]);

  const requestlistings = async function() {
    const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`);
    const json = await res.json()
    return json
  };

  useEffect(async () => {
    const res = await requestlistings();
    setProperties(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setProperties(childData);
  }, [childData]);

  const handleDeleteAction = (id) => console.log(id);
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
              <PropertyData property={property} setChildData={setChildData} />
            ))}
          </Table.Body>
        </Table>
      </AdminListing.Content>
    </AdminListing>
  );
};

export default AdminAgentListing;
