import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { render } from "react-dom";
import { AddBookAPI, UpdateBookAPI, BookListApi } from "../../app/api/BookApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";

function AddBook(props:any) {
    const [show, setShow] = useState(props.show);
    const handleClose = () => {setShow(false); props.setAddShow(false)}
    const handleShow = () => {setShow(true); props.setAddShow(true)}
    const dispatch = useAppDispatch();

    const [id, setId] = useState("");
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [yearPublished, setYearPublished] = useState("");
    const [totalCount, setTotalCount] = useState("");
    const [availableCount, setAvailableCount] = useState("");

    useEffect(()=> {
      props.show ? handleShow() : handleClose()
    }, [props.show]);

    const fetchBooks = async ()=>{
        const response: any =  await new BookListApi().getBooks()
        //setBooks(response.data)
        dispatch({
          type: ActionTypes.GET_ALL_USERS,
          userList: response.data,
        });
    
      }

    const submit = async () => {
        // Can be refactored in better way
        const response: any = await new AddBookAPI().addBooks(isbn, title, description, genre, author, yearPublished, totalCount, availableCount);
        console.log(response.data); // check the status etc, handle failing scenario
        fetchBooks()
        handleClose()
        // dispatch({
        //   type: ActionTypes.UPDATE_SUCCESS,
        //   token: response.data.token,
        // });
      };
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Provide ISBN number of book"
                  autoFocus
                  onChange={(event: any) => {
                    setIsbn(event.target.value);
                  }}
                  value={isbn}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Book title"
                  autoFocus
                  onChange={(event: any) => {
                    setTitle(event.target.value);
                  }}
                  value={title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description on book"
                  autoFocus
                  onChange={(event: any) => {
                    setDescription(event.target.value);
                  }}
                  value={description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" value={genre} placeholder="educational" 
                    onChange={(event: any) => {
                    setGenre(event.target.value);
                  }}>
                    <option value={"suspense"}>Suspense</option>
                    <option value={"educational"}>Educational</option>
                    <option value={"comedy"}>Comedy</option>
                    <option value={"scienece"}>Scienece</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Book Author"
                  autoFocus
                  onChange={(event: any) => {
                    setAuthor(event.target.value);
                  }}
                  value={author}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                <Form.Label>Published Date</Form.Label>
                <Form.Control
                  type="text"
                  //to-do Date Picker
                  placeholder="book Published Date (%d/%m/%Y)"
                  autoFocus
                  onChange={(event: any) => {
                    setYearPublished(event.target.value);
                  }}
                  value={yearPublished}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label>Total Copies</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Copies"
                  autoFocus
                  onChange={(event: any) => {
                    setTotalCount(event.target.value);
                  }}
                  value={totalCount}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                <Form.Label>Available Copies</Form.Label>
                <Form.Control
                  disabled={true}
                  type="text"
                  placeholder="same as total count {totalCount}"
                  autoFocus
                  onChange={(event: any) => {
                    setAvailableCount(event.target.value);
                  }}
                  value={availableCount}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={submit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default AddBook;