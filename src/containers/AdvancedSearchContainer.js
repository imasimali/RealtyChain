import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getPropertyList } from "../redux/actions/propertiesAction";

import { FormWrapper, Form } from "../components";

import { priceFormat } from "../helpers/helper_functions";

const AdvancedSearchContainer = (props) => {
  const [priceRange, setPriceRange] = useState(0);
  const [properties, setProperties] = useState([]);

  const requestlistings = async function () {
    const res = await fetch(`/.netlify/functions/addnew`);
    const json = await res.json();
    return json;
  };

  useEffect(async () => {
    const res = await requestlistings();
    setProperties(res);
  }, []);

  const price = properties.map((property) => +property.price);

  const maxPrice = Math.max.apply(null, price),
    minPrice = Math.min.apply(null, price);

  const categories = [...new Set(properties.map((property) => property.type))];

  const area = [
    ...new Set(properties.map((property) => property.address.areatext)),
  ];

  const locations = [
    ...new Set(properties.map((property) => property.address.city)),
  ];

  const rooms = [
    ...new Set(properties.map((property) => property.features.beds)),
  ].sort((a, b) => a - b);

  const baths = [
    ...new Set(properties.map((property) => property.features.baths)),
  ].sort((a, b) => a - b);

  async function handleSubmit(event) {
    const data = new FormData(event.currentTarget);

    const res = await fetch(`/.netlify/functions/search`, {
      method: "POST",
      body: JSON.stringify({
        type: data.get("type"),
        location: data.get("location"),
        area: data.get("area"),
        beds: data.get("beds"),
        baths: data.get("baths"),
        searchfield: data.get("searchfield"),
        price: priceRange,
      }),
    });
    const json = await res.json();
    json.length != 0 ? props.passChildData(json) : null;
    console.log(json);
  }

  return (
    <FormWrapper>
      <FormWrapper.Header>
        <FormWrapper.Title>Advanced Search</FormWrapper.Title>
      </FormWrapper.Header>
      <FormWrapper.Content>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Form.FormGroup>
            <Form.Select name="type" required>
              <Form.Option defaultValue>Property Type</Form.Option>
              {categories.map((category) => (
                <Form.Option key={category}>{category}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select name="location" required>
              <Form.Option defaultValue>Location</Form.Option>
              {locations.map((state) => (
                <Form.Option key={state}>{state}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select name="area">
              <Form.Option defaultValue>Area (Marla or Kanal)</Form.Option>
              {area.map((area) => (
                <Form.Option key={Math.random(area)} value={area}>
                  {area}
                </Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select name="beds">
              <Form.Option defaultValue>Bed Rooms</Form.Option>
              {rooms.map((room) => (
                <Form.Option key={Math.random(room)} value={room}>
                  {room} Bedrooms
                </Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select name="baths">
              <Form.Option defaultValue>Bath Rooms</Form.Option>
              {baths.map((room) => (
                <Form.Option key={Math.random(room)} value={room}>
                  {room} Bathrooms
                </Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>

          <Form.FormGroup>
            <Form.Span>
              {" "}
              Price range: ETH {priceRange} to ETH {maxPrice}
            </Form.Span>
            <Form.RangeInput
              type="range"
              step="0.01"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={({ target: { value } }) => setPriceRange(value)}
            />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Input
              type="text"
              name="searchfield"
              placeholder="Search Term"
            />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.SubmitInput type="submit" value="Search" />
          </Form.FormGroup>
        </Form>
      </FormWrapper.Content>
    </FormWrapper>
  );
};

export default AdvancedSearchContainer;
