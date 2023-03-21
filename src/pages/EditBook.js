import React, { useState, useRef } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import actionTypes from "../redux/actions/actionTypes";

import api from "../api/api";
import urls from "../api/urls";

const EditBook = () => {
  /* const titleRef = useRef();
  const authorRef = useRef(); */
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { booksState, categoriesState } = useSelector((state) => state);
  const myBook = booksState.books.find((item) => item.id === bookId);
  const [formState, setFormState] = useState(myBook);
  const [errorType, setErrorType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (formState.categoryId === "empty") {
      alert("Kategori alanı zorunludur");
      return;
    }
    if (formState.title === "") {
      //alert("Kitap adı zorunludur");
      /* titleRef.current.style.display = "block"; */
      setErrorType("title");
      setErrorMessage("Kitap adı zorunludur");
      return;
    }
    if (formState.author === "") {
      //alert("Kitap yazarı zorunludur");
      /* authorRef.current.style.display="block" */
      setErrorType("author");
      setErrorMessage("Yazar adı zorunludur");
      return;
    }
    /* api call */
    api
      .put(`${urls.books}/${bookId}`, formState)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.EDIT_BOOK,
          payload: formState,
        });
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Puslu Kıtalar Atlası"
              value={formState.title}
              onChange={(event) =>
                setFormState({ ...formState, title: event.target.value })
              }
            />
            {/* <p ref={titleRef} style={{ display: "none" }}>
              <small className="text-danger">Kitap adı zorunludur</small>
            </p> */}
            {errorType === "title" && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Kitap Yazarı
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="İhsan Oktay Anar"
              value={formState.author}
              onChange={(event) =>
                setFormState({ ...formState, author: event.target.value })
              }
            />
            {/* <p ref={authorRef} style={{ display: "none" }}>
              <small className="text-danger">Kitap adı zorunludur</small>
            </p> */}
            {errorType === "author" && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayın Evi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="İletişim"
              value={formState.publisher}
              onChange={(event) =>
                setFormState({ ...formState, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Fiyat
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="70"
              value={formState.price}
              onChange={(event) =>
                setFormState({ ...formState, price: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="xxxxxxxxxxxxx"
              value={formState.isbn}
              onChange={(event) =>
                setFormState({ ...formState, isbn: event.target.value })
              }
            />
          </div>
          <select
            value={formState.categoryId}
            onChange={(event) =>
              setFormState({ ...formState, categoryId: event.target.value })
            }
            className="form-select">
            <option value="empty">Kategori Seçin</option>
            {categoriesState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {upperFirstLetter(category.name)}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
