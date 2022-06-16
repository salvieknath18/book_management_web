import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { RootState } from "../app/store/store";
import ActionTypes from "../app/store/ActionTypes";
import { Icon } from "@iconify/react";

export default function Header() {
  const { role, token, name } = useAppSelector(
    (state: RootState) => state.userData
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Book Management</Navbar.Brand>
        {token && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {role === "admin" && <Nav.Link href="/user">User</Nav.Link>}
                <Nav.Link href="/book">Book</Nav.Link>
                <Nav.Link href="/Analytics">Analytics</Nav.Link>
              </Nav>
            </Navbar.Collapse>{" "}
          </>
        )}

        {token && (
          <Row>
            <Col>
              <div>
                <Icon
                  icon="bi:file-person"
                  width="28"
                  height="28"
                  style={{ margin: "10px 5px 10px 5px" }}
                />
              </div>
            </Col>
            {/* <Col>
              <div>
                <Icon icon="bi:file-person" width="28" height="28" />
              </div>
            </Col> */}
            <Col style={{ margin: "10px 5px 10px 5px" }}>{name}</Col>
            <Col>
              <Button
                onClick={() => {
                  dispatch({
                    type: ActionTypes.LOG_OUT,
                  });
                  navigate("/login");
                }}
              >
                LogOut
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Navbar>
  );
}
