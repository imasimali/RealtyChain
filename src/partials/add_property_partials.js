import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Add, Form } from "../components";
import firebaseConfig from "../firebaseConfig";

import firebase from "firebase";
// import { ref, uploadBytesResumable, getStorage, getDownloadURL } from "firebase/storage";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const storage = firebaseApp.storage();

const Descrition = () => {
  
  return (
    <Add.Description>
      <Add.DescriptionHeader>
        <Add.Title>Description</Add.Title>
      </Add.DescriptionHeader>
      <Add.DescriptionContent>
        <Add.DescriptionContentTop>
          <Form.FormGroup>
            <Form.Label>
              Property Type <span>(required)</span>
            </Form.Label>
            <Form.Select name="category">
              <Form.Option>Apartment</Form.Option>
              <Form.Option>House</Form.Option>
              <Form.Option>Land</Form.Option>
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              Property Price <span>(required)</span>
            </Form.Label>
            <Form.Input type="text" name="price" />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              Featured Property <span>(required)</span>
            </Form.Label>
            <Form.Select name="featured">
              <Form.Option>Yes</Form.Option>
              <Form.Option>No</Form.Option>
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              Date Added <span>(required)</span>
            </Form.Label>
            <Form.Input type="text" name="date" />
          </Form.FormGroup>
        </Add.DescriptionContentTop>
        <Add.DescriptionContentBottom>
          <Form.FormGroup>
            <Form.Label>
              Description <span>(required)</span>
            </Form.Label>
            <Form.TextArea name="description" cols="30" rows="10"></Form.TextArea>
          </Form.FormGroup>
        </Add.DescriptionContentBottom>
      </Add.DescriptionContent>
    </Add.Description>
  );
};

const Location = () => {
  return (
    <Add.Location>
      <Add.LocationHeader>
        <Add.Title>Property Location</Add.Title>
      </Add.LocationHeader>
      <Add.LocationContent>
        <Add.LocationContentTop>
          <Form.FormGroup>
            <Form.Label>
              Location <span>(required)</span>
            </Form.Label>
            <Form.Input type="text" name="location"/>
          </Form.FormGroup>
        </Add.LocationContentTop>
        <Add.LocationContentBottom>
          <Form.FormGroup>
            <Form.Label>
              City<span>(required)</span>
            </Form.Label>
            <Form.Input type="text" name="city"/>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              State<span>(required)</span>
            </Form.Label>
            <Form.Input type="text" name="state"/>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              Latitude<span>(for google maps)</span>
            </Form.Label>
            <Form.Input type="text" name="latitude"/>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>
              Longitude<span>(for google maps)</span>
            </Form.Label>
            <Form.Input type="text" name="longitude"/>
          </Form.FormGroup>
        </Add.LocationContentBottom>
      </Add.LocationContent>
    </Add.Location>
  );
};

const Media = (props) => {
  // const hiddenFileInput = useRef(null);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [downloadurl, setDownloadurl] = useState("");

  const functionHandler = (data) => {
    props.passChildData(data);
  }
  
  function handleChange(event) {
        setFile(event.target.files[0]);
    }
  
  function handleUpload() {
    if (!file) {
        alert("Please choose a file first!")
    }
    const storageRef = storage.ref(`/images/${file.name}`)
    
    const uploadTask = storageRef.put(file);

    uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                storageRef.getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setDownloadurl(url);
                  functionHandler(downloadurl);
                  // console.log(downloadurl);
                });
            }
        );
}

  const handleFileButton = (e) => {
    e.preventDefault();
    handleUpload();
    // hiddenFileInput.current.click();
  };

  return (
    <Add.Media>
      <Add.MediaHeader>
        <Add.Title>Property Images</Add.Title>
      </Add.MediaHeader>
      <Add.MediaContent>
        <Form.FormGroup>
          <Form.Label>Images</Form.Label>
          {/* Special input file case */}
          <input
            type="file"
            // ref={hiddenFileInput}
            onChange={handleChange}
            accept="/image/*"
            // style={{ display: "none" }}
          />
          <Add.Button onClick={handleFileButton}>Upload Files</Add.Button>
          <p>{percent} "% done"</p>
        </Form.FormGroup>
      </Add.MediaContent>
    </Add.Media>
  );
};

const Details = () => {
  return (
    <Add.Details>
      <Add.DetailsHeader>
        <Add.Title>Property Details</Add.Title>
      </Add.DetailsHeader>
      <Add.DetailsContent>
        <Form.FormGroup>
          <Form.Label>Bedrooms</Form.Label>
          <Form.Input type="text" name="beds"/>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Bathrooms</Form.Label>
          <Form.Input type="text" name="baths"/>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Area (sqft)</Form.Label>
          <Form.Input type="number" name="areasqft"/>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Area (Marla or Kanal)</Form.Label>
          <Form.Input type="text" name="areatext"/>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Garage</Form.Label>
          <Form.Select name="garage" class="form-select">
            <Form.Option>Available</Form.Option>
            <Form.Option>Not Available</Form.Option>
          </Form.Select>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Swimming Pool</Form.Label>
          <Form.Select name="pool" class="form-select">
            <Form.Option>Available</Form.Option>
            <Form.Option>Not Available</Form.Option>
          </Form.Select>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Fully Furnished</Form.Label>
          <Form.Select name="furnished" class="form-select">
            <Form.Option>Available</Form.Option>
            <Form.Option>Not Available</Form.Option>
          </Form.Select>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Property Status</Form.Label>
          <Form.Select name="status" class="form-select">
            <Form.Option>Available</Form.Option>
            <Form.Option>Not Available</Form.Option>
          </Form.Select>
        </Form.FormGroup>
      </Add.DetailsContent>
      <Form.FormGroup>
        <Form.Label>Amenities (Seperated by Comma)</Form.Label>
        <Form.Input type="text" name="amenities"/>
      </Form.FormGroup>
    </Add.Details>
  );
};

export { Descrition, Location, Media, Details };
