import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";
import CategoriesHome from "./pages/CategoriesHome";
import AddCategory from "./pages/AddCategory";

import api from "./api/api";
import urls from "./api/urls";
import Loading from "./components/Loading";
import Error from "./components/Error";


function App() {
  /* const booksState=useSelector(state=>state.booksState)
  const categoriesState=useSelector(state => state.categoriesState) */
  const { booksState, categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    /* get books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "Kitapları çekme işlemi esnasında bir hata oluştu",
        });
      });
    /* get categories */
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Kategori bilgilerini çekerken bir hata oluştu.",
        });
      });
  }, []);
  if(booksState.pending === true || categoriesState.pending === true) return <Loading />
  if(booksState.error === true || categoriesState.error === true) return <Error />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesHome />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/* const obje={
  obje1:{
    name:"emre"
  },
  obje2:{
    name:"ahmet"
  }
}
const obje1=obje.obje1
const obje2=obje.obje2

const {obje1,obje2}=obje */
