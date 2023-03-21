import React,{useState} from "react";

import { useSelector,useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { upperFirstLetter } from "../utils/functions";

import api from "../api/api";
import urls from "../api/urls";

import Modal from "./Modal";

const ListCategories = () => {
  const dispatch=useDispatch()
  const { categoriesState, booksState } = useSelector((state) => state);
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [willDeleteCategory,setWillDeleteCategory]=useState("")

  const deleteCategory=(id)=>{
    api.delete(`${urls.categories}/${id}`)
    .then(res=>{
      dispatch({type: actionTypes.categoryActions.DELETE_CATEGORY,payload:id})
      dispatch({type:actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,payload:id})
      setShowDeleteModal(false)
    })
    .catch(err => {})
  }

  return (
    <div>
      {categoriesState.categories.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-warning text-center w-75" role="alert">
            Sistemde gösterilecek kategori kaydı yok.
          </div>
        </div>
      )}
      {categoriesState.categories.length > 0 && (
        <table className={`table table-striped table-light`}>
          <thead>
            <tr>
              <th scope="col">Sıra No</th>
              <th scope="col">Kategori Adı</th>
              <th scope="col">Kitap Sayısı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.map((category, index) => {
              var siraNo = index + 1;
              /* const myBooks = booksState.books.filter(
                (item) => item.categoryId === category.id
              ); */
              const myBooks = [];
              for (let i = 0; i < booksState.books.length; i++) {
                if (booksState.books[i].categoryId === category.id) {
                  myBooks.push(booksState.books[i]);
                }
              }
              return (
                <tr key={category.id}>
                  <th>{siraNo}</th>
                  <td>{upperFirstLetter(category.name)}</td>
                  <td>{myBooks.length}</td>
                  <td>
                    <div className="btn-group">
                      <button onClick={()=>{
                        setShowDeleteModal(true)
                        setWillDeleteCategory(category.id)
                      }} type="button" className="btn btn-danger btn-sm">
                        Sil
                      </button>
                      <button type="button" className="btn btn-warning btn-sm">
                        Güncelle
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Modal
        visible={showDeleteModal}
        title="Silme İşlemi"
        content="Kategori silindiğinde o kategoriye ait bütün kitaplar da silinir. Devam etmek istediğinize emin misiniz?"
        cancelButtonText="Vazgeç"
        cancelButtonClick={()=>setShowDeleteModal(false)}
        hasConfirmButton={true}
        confirmButtonText="Sil"
        confirmButtonClick={()=>deleteCategory(willDeleteCategory)}
      />
    </div>
  );
};

export default ListCategories;
