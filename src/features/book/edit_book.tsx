import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { render } from "react-dom";
import { UpdateBookAPI, BookListApi } from "../../app/api/BookApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";

function EditBook(props: any) {
  const [show, setShow] = useState(props.show);
  const handleClose = () => {
    setShow(false);
    props.setEditShow(false);
  };
  const handleShow = () => {
    setShow(true);
    props.setEditShow(true);
  };
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

  useEffect(() => {
    setId(props.bookData.id);
    setIsbn(props.bookData.isbn);
    setTitle(props.bookData.title);
    setDescription(props.bookData.description);
    setGenre(props.bookData.genre);
    setAuthor(props.bookData.author);
    setYearPublished(props.bookData.year_published);
    setTotalCount(props.bookData.total_count);
    setAvailableCount(props.bookData.available_count);
  }, [props.bookData]);

  useEffect(() => {
    props.show ? handleShow() : handleClose();
  }, [props.show]);

  const fetchBooks = async () => {
    const response: any = await new BookListApi().getBooks();
    //setBooks(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_BOOKS,
      bookList: response.data,
    });
  };

  const submit = async () => {
    // Can be refactored in better way
    const response: any = await new UpdateBookAPI().updateBooks(
      id,
      isbn,
      title,
      description,
      genre,
      author,
      yearPublished,
      totalCount,
      availableCount
    );
    console.log(response.data); // check the status etc, handle failing scenario
    fetchBooks();
    handleClose();
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
                defaultValue={isbn}
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
                defaultValue={title}
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
                defaultValue={description}
                autoFocus
                onChange={(event: any) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={genre}
                defaultValue={genre}
                onChange={(event: any) => {
                  setGenre(event.target.value);
                }}
              >
                <option value={"suspense"}>Suspense</option>
                <option value={"educational"}>Educational</option>
                <option value={"comedy"}>Comedy</option>
                <option value={"scienece"}>Scienece</option>
                <option value={"technology"}>Technology</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                defaultValue={author}
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
                defaultValue={yearPublished}
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
                defaultValue={totalCount}
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
                type="text"
                defaultValue={availableCount}
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

export default EditBook;
