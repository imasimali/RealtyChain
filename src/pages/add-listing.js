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

const AddLisiting = () => {
  const { id } = useParams();
  // console.log(id);

  const [childData, setChildData] = useState("");

  async function handleSubmit(event) {
    const data = new FormData(event.currentTarget);
    console.log(childData)

    const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`, {
      method: 'POST',
      body: JSON.stringify({
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
    const result = await res.json();
    console.log(result)
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
                <Media passChildData={setChildData}/>
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

export default AddLisiting;
