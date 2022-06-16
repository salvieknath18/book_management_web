import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import Image from "react-bootstrap/Image";
import { Icon } from "@iconify/react";
import {
  BorrowedBookAPI,
  CollectBookByAdmin,
  ReturnBook,
} from "../../app/api/BorrowApi";
import { RootState } from "../../app/store/store";
import { useNavigate } from "react-router-dom";

function ViewUser(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state: RootState) => state.userData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const borrowedBookList = useAppSelector(
    (state: RootState) => state.borrowedBookList
  );

  useEffect(() => {
    setName(props.userData.name);
    setEmail(props.userData.email);
    setRole(props.userData.role);
    setId(props.userData.id);
  }, [props.show]);

  useEffect(() => {
    console.log(`view${props.userData}` + JSON.stringify(props.userData));
    fetchBorrowedBooks();
  }, [props.userData]);

  const fetchBorrowedBooks = async () => {
    const response: any = await new BorrowedBookAPI().getBorrowedBooks(
      props.userData.id
    );
    console.log(response.data);
    dispatch({
      type: ActionTypes.GET_BORROWED_BOOKS,
      borrowedBookList: response.data,
    });
  };

  const returnRequest = async (id: string) => {
    const response: any = await new ReturnBook().returnBook(id);
    console.log(response.data); // check the status etc, handle failing scenario
    fetchBorrowedBooks();
    navigate("/home");
  };

  const returnByAdmin = async (book_id: string, user_id: string) => {
    const response: any = await new CollectBookByAdmin().returnBook(
      book_id,
      user_id
    );
    console.log(response.data); // check the status etc, handle failing scenario
    fetchBorrowedBooks();
    navigate("/home");
  };

  const userListPage = () => {
    props.setViewShow(false);
  };
  return (
    <>
      {console.log(borrowedBookList.borrowBooklist)}
      <div className="container mt-5 mb-5">
        {props.notHomeRequest && (
          <Icon
            onClick={userListPage}
            align="right"
            width="32"
            height="32"
            icon="bi:skip-backward-circle"
          />
        )}{" "}
        <div className="row no-gutters">
          <Image
            thumbnail={true}
            className="col-md-2 col-sm-4 square border border-dark"
            alt="Display User Image (Future Enhancement)"
            src="static/avatar.jpg"
          ></Image>
          <div className="col-md-10 col-lg-8">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                <h3 className="display-5">{name}</h3>
                <i className="fa fa-facebook"></i>
                <i className="fa fa-google"></i>
                <i className="fa fa-youtube-play"></i>
                <i className="fa fa-dribbble"></i>
                <i className="fa fa-linkedin"></i>
              </div>
              <div className="p-3 bg-black text-white">
                <h6>EMAIL &nbsp;&nbsp; : &nbsp;&nbsp; {email}</h6>
              </div>
              <div className="p-3 bg-black text-white">
                <h6>ROLE &nbsp;&nbsp; : &nbsp;&nbsp; {role}</h6>
              </div>
            </div>
          </div>
        </div>
        {/* { borrowedBookList.map((item: any)=>{ return <li>{item}</li>}) } */}
        {borrowedBookList.borrowBooklist &&
          borrowedBookList.borrowBooklist.map((item: any, index: any) => {
            return (
              <Card
                key={item.id}
                style={{ width: "18rem", margin: "10px", float: "left" }}
              >
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Borroed On: {item.borrow_date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Return By: {item.return_date}
                    </ListGroup.Item>
                  </ListGroup>

                  {(currentUser.role !== "admin" ||
                    props.userData.id === currentUser.id) && (
                    <Button
                      variant="primary"
                      onClick={() => returnRequest(item.book_id)}
                    >
                      Return Book
                    </Button>
                  )}
                  {currentUser.role === "admin" &&
                    props.userData.id !== currentUser.id && (
                      <Button
                        variant="primary"
                        style={{ margin: 5 }}
                        onClick={() =>
                          returnByAdmin(item.book_id, props.userData.id)
                        }
                      >
                        Collect Book
                      </Button>
                    )}
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default ViewUser;
