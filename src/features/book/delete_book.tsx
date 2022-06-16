import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DeleteBookAPI, BookListApi } from "../../app/api/BookApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";

function DeleteBook(props: any) {
  const [show, setShow] = useState(props.show);
  const [bookData, setBookData] = useState(props.bookData);
  const handleClose = () => {
    setShow(false);
    props.setDeleteShow(false);
  };
  const handleShow = () => {
    setShow(true);
    props.setDeleteShow(true);
  };
  const dispatch = useAppDispatch();

  const [id, setId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    props.show ? handleShow() : handleClose();
    setBookData(props.bookData);

    setId(props.bookData.id);
    setIsbn(props.bookData.isbn);
    setTitle(props.bookData.title);
  }, [props.show, props.bookData]);

  const fetchBooks = async () => {
    const response: any = await new BookListApi().getBooks();
    //setBooks(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      bookList: response.data,
    });
  };

  const submit = async () => {
    const response: any = await new DeleteBookAPI().DeleteBook(id);
    console.log(response.data); // To-Do, Handle Failing scenario
    fetchBooks();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book ... !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete book '{title}' 'ISBN:{isbn}'{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBook;
