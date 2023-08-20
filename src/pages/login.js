import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { HeaderContainer, FooterContainer } from "../containers";
import { Login, Form } from "../components";
import { useHistory } from "react-router-dom";

const Loginn = ({ user, signInWithEmailAndPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkUser(user);
  }, []);

  useEffect(() => {
    checkUser(user);
  }, [user]);

  function checkUser(user) {
    if (user != null) {
      history.push("/dashboard");
    }
  }

  function handleSubmit(event) {
    signInWithEmailAndPassword(email, password);
    history.push("/dashboard");
  }

  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <Login>
        <Login.Container>
          <Login.Content>
            <Login.Header>
              <Login.Title>Login</Login.Title>
            </Login.Header>
            <Login.InnerContent>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Login" />
                </Form.FormGroup>
              </Form>
            </Login.InnerContent>
            <Login.Footer>
              <Login.Text>
                <Login.Anchor to="/forgot-password">
                  Forgot Password ?
                </Login.Anchor>
              </Login.Text>
              <Login.Text>
                Don't have an Account ?{" "}
                <Login.Anchor to="/signup">Sign Up</Login.Anchor>
              </Login.Text>
            </Login.Footer>
          </Login.Content>
        </Login.Container>
      </Login>
      <FooterContainer />
    </Fragment>
  );
};

export default Loginn;
