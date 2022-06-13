import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { LoginApi } from "../app/api/LoginApi";
import { useNavigate } from "react-router-dom";
import ActionTypes from "../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { RootState } from "../app/store/store";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { token } = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    console.log(token)
    if (token) {
      navigate("/home ");
    }
  }, [token]);

  const submit = async () => {
    setIsLoggingIn(true);

    // Can be refactored in better way
    const response: any = await new LoginApi().login(email, password);
    console.log(response.data); // check the status etc, handle failing scenario
    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.data.token,
    });
    setIsLoggingIn(false);
  };

  return (
    <Container>
      {isLoggingIn ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          <Col md={{ span: 5, offset: 3 }} sm={{ span: 3, offset: 1 }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(event: any) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  value={password}
                  onChange={(event: any) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Login;
