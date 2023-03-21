import React,{useState} from "react";

import { useSelector, useDispatch } from "react-redux";

import { upperFirstLetter, upperFirstLetter2 } from "../utils/functions";
import Button from "./Button";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

import Modal from "./Modal";

import { useNavigate } from "react-router-dom";

const ListBooks = () => {
  const { booksState, categoriesState, themeState } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [openDeleteModal,setOpenDeleteModal]=useState(false)
  const [willDeleteBook,setWillDeleteBook]=useState("")
  
  const deleteBook = (id) => {
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK, payload: id });
        setOpenDeleteModal(false)
      })
      .catch((err) => {});
  };
  
  
  return (
    <div>
      {booksState.books.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-warning text-center w-75" role="alert">
            Sistemde gösterilecek kitap kaydı yok.
          </div>
        </div>
      )}
      {booksState.books.length > 0 && (
        <div>
          <table
            className={`table table-striped ${
              themeState === "light" ? "table-light" : "table-dark"
            }`}>
            <thead>
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Kitap Adı</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {booksState.books.map((book, index) => {
                const myCategory = categoriesState.categories.find(
                  (item) => item.id === book.categoryId
                );
                return (
                  <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{upperFirstLetter2(book.title)}</td>
                    <td>{upperFirstLetter(myCategory.name)}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          className="btn-sm"
                          text="Detay"
                          type="secondary"
                          onClick={()=>navigate(`/book-detail/${book.id}`)}
                        />
                        <Button
                          onClick={() => {
                            setOpenDeleteModal(true)
                            setWillDeleteBook(book.id)
                          }}
                          className="btn-sm"
                          text="Sil"
                          type="danger"
                        />
                        <Button
                          className="btn-sm"
                          text="Güncelle"
                          type="warning"
                          onClick={()=>navigate(`/edit-book/${book.id}`)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        title="Kitap Silme"
        content="Kitabı silmek istediğinize emin misiniz?"
        hasConfirmButton={true}
        confirmButtonText="Sil"
        cancelButtonText="Vazgeç"
        confirmButtonClick={()=>deleteBook(willDeleteBook)}
        cancelButtonClick={()=>setOpenDeleteModal(false)}
        visible={openDeleteModal}
      />
    </div>
  );
};

export default ListBooks;
