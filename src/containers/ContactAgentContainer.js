import React from "react";
import { Property, Form } from "../components";
const ContactAgentContainer = ({ property, buyAsset, Account }) => {

  async function handleSubmit(event) {
    const price = property.price

    const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/update`, {
      method: 'POST',
      body: JSON.stringify({
        id: property._id,
        owner: Account,
      }),
    })

    if (Account != undefined && price != undefined) {
      const cRes = await buyAsset(property._id);
      // console.log(cRes)
      const result = await res.json();
      console.log(result.result)
      // document.getElementById(".message").innerText = ``
    }
    else {
      // document.getElementById(".message").innerText = `Request Failed - Please check input`
      console.log("else")
    }
  }

  return (
    <Property.Contact>
      <Property.ContactHeader>
        <Property.ContactItem>
          <Property.AgentImage
            source={
              /*property.agent.image ? property.agent.image : property.agent.photo*/
              `default.jpg`
            }
          />
        </Property.ContactItem>
        <Property.ContactItem>
          <Property.Subtitle>{property.owner ? property.owner.name : "Loading"}</Property.Subtitle>
          <Property.ContactList>
            <Property.ListItem>
              {/*<Property.Icon name="fas fa-phone-alt"></Property.Icon>*/}
              <Property.Text>{property.owner ? property.owner.metaid.substring(2, 22) : "Loading"}<br />{property.owner ? property.owner.metaid.substring(22, 43) : "Loading"}</Property.Text>
            </Property.ListItem>
          </Property.ContactList>
        </Property.ContactItem>
      </Property.ContactHeader>

      <Property.ContactContent>
        <Property.ContactContainer>
          {property ?.owner.metaid !== Account ?
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
              <Form.FormGroup>
                <Form.SubmitInput type="submit" value="Buy Now" />
              </Form.FormGroup>
            </Form> :
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.FormGroup>
                <Form.SubmitInput value="Listed Property" />
              </Form.FormGroup>
            </Form>}
          {/*<Form>
            <Form.FormGroup>
              <Form.Input type="text" placeholder="Name" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Input type="text" placeholder="Email" />
            </Form.FormGroup>

            <Form.FormGroup>
              <Form.Input type="text" placeholder="Phone Number" />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.TextArea
                placeholder="I would love to know more about this property"
                name=""
                id=""
                cols="24"
                rows="8"></Form.TextArea>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.SubmitInput type="submit" value="Send Message" />
            </Form.FormGroup>
          </Form>*/}
        </Property.ContactContainer>
      </Property.ContactContent>
    </Property.Contact>
  );
};

export default ContactAgentContainer;
