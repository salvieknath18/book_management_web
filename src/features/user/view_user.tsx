import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import { render } from "react-dom";
import { UpdateUserAPI, UserListApi } from "../../app/api/UserApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import Image from 'react-bootstrap/Image'
import { Icon } from '@iconify/react';
import { BorrowedBookAPI, ReturnBook } from "../../app/api/BorrowApi";
import { RootState } from "../../app/store/store";
import { useNavigate } from "react-router-dom";

function ViewUser(props:any) {

    const [userData, setUserData] = useState(props.userData);
    const [bookId, setBookId] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");

    const  borrowedBookList  = useAppSelector((state: RootState) => state.borrowedBookList);

    useEffect(()=> {
      setUserData(props.userData)
      setName(props.userData.name)
      setEmail(props.userData.email)
      setRole(props.userData.role)
      setId(props.userData.id)
      fetchBorrowedBooks()
    }, [props.show, props.userData]);

    useEffect(()=> {
      fetchBorrowedBooks()
    }, []);

    const fetchUsers = async ()=>{
        const response: any =  await new UserListApi().getUsers()
        dispatch({
          type: ActionTypes.GET_ALL_USERS,
          userList: response.data,
        });
    
      }

      const fetchBorrowedBooks = async ()=>{
        const response: any =  await new BorrowedBookAPI().getBorrowedBooks(props.userData.id)
        console.log(response.data)
        dispatch({
          type: ActionTypes.GET_BORROWED_BOOKS,
          borrowedBookList: response.data,
        });
    
      }

    const returnRequest = async (id: string) => {
        const response: any = await new ReturnBook().returnBook(id);
        console.log(response.data); // check the status etc, handle failing scenario
        navigate("/home ");
      };
      
    const userListPage = () => {
      props.setViewShow(false)
    }
    return (
      <>
        <div className="container mt-5 mb-5">
          <Icon onClick={userListPage} align="right" width="32" height="32" icon="bi:skip-backward-circle" /> Back to User list
          <div className="row no-gutters">
              <Image thumbnail={true} className="col-md-2 col-lg-4 square border border-dark"></Image>
              <div className="col-md-10 col-lg-8">
                  <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                          <h3 className="display-5">{name}</h3><i className="fa fa-facebook"></i><i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i></div>
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
           {borrowedBookList.borrowBooklist && borrowedBookList.borrowBooklist.map((item:any,index:any)=>{return <li key={index}>{item.book_id}hello</li>})}
          <Card style={{ width: '18rem', margin: "10px", float: "left"}}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
                <ListGroup variant="flush">
                <ListGroup.Item>Borroed On: 12-12-2020</ListGroup.Item>
                  <ListGroup.Item>Return By: 12-21-2021</ListGroup.Item>
                </ListGroup>
              <Button variant="primary" onClick={()=> returnRequest(bookId)}>Return Book</Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
  
  export default ViewUser;