import React, { useRef, useState, useEffect } from "react";
import { Profile, Form } from "../components";
import { getUserData, updateUserData } from "../firebase/Profile";

const ProfileContainer = ({ user }) => {
  const hiddenFileInput = useRef(null);
  const [userData, setUserData] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (user) {
      getUserData(user).then((data) => {
        setUserData(data);
      });
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (user) {
      try {
        await updateUserData(user, userData);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const handleFieldChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Profile>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveChanges();
        }}
      >
        <Profile.Avatar>
          <Profile.Title>Choose Avatar</Profile.Title>
          <Profile.AvatarContent>
            <Profile.Image source="default.jpg" />
            {/* Special file input case */}
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
            />

            <Profile.Button onClick={handleClick}>
              Choose File To Upload
            </Profile.Button>
          </Profile.AvatarContent>
        </Profile.Avatar>
        <Profile.Bio>
          <Profile.BioTop>
            <Form.FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.name : ""}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.email : ""}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Phone</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.phone : ""}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Address</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.address : ""}
                onChange={(e) => handleFieldChange("address", e.target.value)}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Town</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.town : ""}
                onChange={(e) => handleFieldChange("town", e.target.value)}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>State</Form.Label>
              <Form.Input
                type="text"
                value={userData ? userData.state : ""}
                onChange={(e) => handleFieldChange("state", e.target.value)}
              />
            </Form.FormGroup>
          </Profile.BioTop>
          <Profile.BioBottom>
            <Form.FormGroup>
              <Form.Label>About</Form.Label>
              <Form.TextArea
                name="about"
                id="about"
                cols="30"
                rows="10"
                value={userData ? userData.about : ""}
                onChange={(e) => handleFieldChange("about", e.target.value)}
              ></Form.TextArea>
            </Form.FormGroup>
          </Profile.BioBottom>
        </Profile.Bio>
        <Form.FormGroup>
          <Form.SubmitInput value="Save Changes" />
        </Form.FormGroup>
      </Form>
    </Profile>
  );
};

export default ProfileContainer;
