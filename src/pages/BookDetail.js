import React from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";

const BookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { booksState, categoriesState } = useSelector((state) => state);
  /* let myBook=null
    for(let i=0;i<booksState.books.length;i++){
        if(booksState.books[i].id === bookId){
            myBook=booksState.books[i]
            break
        }
    } */
  const myBook = booksState.books.find((item) => item.id === bookId);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === myBook.categoryId
  );
  return (
    <div>
      <Header />
      <div className="container my-5 d-flex justify-content-center">
        <div
          style={{
            borderRadius: "10px",
            padding: "30px",
            width: "80%",
            boxShadow: "0px 0px 10px 0px gray",
          }}>
          <h5
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <span
              onClick={() => navigate("/")}
              style={{ position: "absolute", left: 0, cursor: "pointer" }}
              className="badge bg-secondary">
              Geri
            </span>{" "}
            <h1>Kitap Bilgileri</h1>
          </h5>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Adı</b>
            </p>
            <p>{upperFirstLetter(myBook.title)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Yazarı</b>
            </p>
            <p>{upperFirstLetter(myBook.author)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Yayın Evi</b>
            </p>
            <p>
              {myBook.publisher === ""
                ? "Belirtilmemiş"
                : upperFirstLetter(myBook.publisher)}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Fiyat</b>
            </p>
            <p>{myBook.price === "" ? "Belirtilmemiş" : myBook.price}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>ISBN</b>
            </p>
            <p>{myBook.isbn === "" ? "Belirtilmemiş" : myBook.isbn}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kategori</b>
            </p>
            <p>{upperFirstLetter(myCategory.name)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
