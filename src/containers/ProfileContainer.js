import React, { useRef } from "react";
import { Profile, Form } from "../components";

const ProfileContainer = () => {
  const hiddenFileInput = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <Profile>
      <Form>
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
              <Form.Input type="text" value="Asim Ali" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Input type="text" value="hi@asimali.net" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Phone</Form.Label>
              <Form.Input type="text" value="+92 111 222 333" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Address</Form.Label>
              <Form.Input type="text" value="St# 23 Cantonment" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>Town</Form.Label>
              <Form.Input type="text" value="Lahore" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>State</Form.Label>
              <Form.Input type="text" value="Punjab" />
            </Form.FormGroup>
          </Profile.BioTop>
          <Profile.BioBottom>
            <Form.FormGroup>
              <Form.Label>About</Form.Label>
              <Form.TextArea name="" id="" cols="30" rows="10"></Form.TextArea>
            </Form.FormGroup>
          </Profile.BioBottom>
        </Profile.Bio>
        <Profile.Social>
          <Profile.SocialHeader>
            <Profile.Title>Social Accounts</Profile.Title>
          </Profile.SocialHeader>
          <Profile.SocialContent>
            <Form.FormGroup>
              <Form.Label for="">Facebook</Form.Label>
              <Form.Input type="text" class="form-input" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label for="">Twitter</Form.Label>
              <Form.Input type="text" class="form-input" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label for="">Instagram</Form.Label>
              <Form.Input type="text" class="form-input" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label for="">Linkedin</Form.Label>
              <Form.Input />
            </Form.FormGroup>
          </Profile.SocialContent>
          <Form.FormGroup>
            <Form.SubmitInput value="Save Changes" />
          </Form.FormGroup>
        </Profile.Social>
      </Form>
    </Profile>
  );
};

export default ProfileContainer;
