import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPropertyList } from "../redux/actions/propertiesAction";

import { FormWrapper, Form } from "../components";

import { priceFormat } from "../helpers/helper_functions";

const AdvancedSearchContainer = () => {
  const [priceRange, setPriceRange] = useState(0);
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true);

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

  const setField = function(){
    
  }
  const price = properties.map(
    (property) => +property.price
  );

  const maxPrice = Math.max.apply(null, price),
    minPrice = Math.min.apply(null, price);

  const categories = [
    ...new Set(properties.map((property) => property.type)),
  ];

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
    // const data = new FormData(event.currentTarget);
    // console.log(childData)

    // const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: user?.email? user.email : "None",
    //     waddress: "0x000000",
    //     images: childData,
    //     category: data.get("category"),
    //     price: data.get("price"),
    //     featured: data.get("featured") == "Yes" ? true : false,
    //     date: data.get("date"),
    //     description: data.get("description"),
    //     location: data.get("location"),
    //     city: data.get("city"),
    //     state: data.get("state"),
    //     latitude: data.get("latitude"),
    //     longitude: data.get("longitude"),
    //     beds: data.get("beds"),
    //     baths: data.get("baths"),
    //     areasqft: data.get("areasqft"),
    //     areatext: data.get("areatext"),
    //     garage: data.get("garage") == "Available" ? true : false,
    //     pool: data.get("pool") == "Available" ? true : false,
    //     furnished: data.get("furnished") == "Available" ? true : false,
    //     status: data.get("status") == "Available" ? true : false,
    //     amenities: data.get("amenities").split(','),
    //   }),
    // })
    // const result = await res.json();
    console.log("clicked")
  }


  
  return (
    <FormWrapper>
      <FormWrapper.Header>
        <FormWrapper.Title>Advanced Search</FormWrapper.Title>
      </FormWrapper.Header>
      <FormWrapper.Content>
        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
          <Form.FormGroup>
            <Form.Select>
              <Form.Option defaultValue>Property Type</Form.Option>
              {categories.map((category) => (
                <Form.Option key={category}>{category}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select>
              <Form.Option defaultValue>Location</Form.Option>
              {locations.map((state) => (
                <Form.Option key={state}>{state}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select>
              <Form.Option defaultValue>Area (Marla or Kanal)</Form.Option>
              {area.map((area) => (
                <Form.Option key={Math.random(area)}>{area}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select>
              <Form.Option defaultValue>Bed Rooms</Form.Option>
              {rooms.map((room) => (
                <Form.Option key={Math.random(room)}>{room} Bedrooms</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select>
              <Form.Option defaultValue>Bath Rooms</Form.Option>
              {baths.map((room) => (
                <Form.Option key={Math.random(room)}>{room} Bathrooms</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          
          <Form.FormGroup>
            <Form.Span>
              {" "}
              Price range: PKR {priceFormat(+priceRange)} to PKR{" "}
              {priceFormat(maxPrice)}
            </Form.Span>
            <Form.RangeInput
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={({ target: { value } }) => setPriceRange(value)}
            />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Input type="text" placeholder="Search Term" />
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
