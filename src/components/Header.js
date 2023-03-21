import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";
import "../styles/general.css";
import sun from '../assets/sun1.gif'

const Header = () => {
  const { themeState, booksState, categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <nav
      style={{ position: "relative" }}
      className={`navbar navbar-expand-sm navbar-dark ${
        themeState === "light" ? "headerBgLight" : "headerBgDark"
      }`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={"/"}>
                Kitap İşlemleri
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/categories"}>
                Kategori İşlemleri
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ position: "absolute", right: "20px",display:'flex',alignItems:'center',gap:'10px' }}>
        <div>
          <p style={{margin:0,color:'#fff'}}>Topam Kitap Sayısı: {booksState.books.length}</p>
          <p style={{margin:0,color:'#fff'}}>Topam Kategori Sayısı: {categoriesState.categories.length}</p>
        </div>
        {themeState === "light" ? (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "dark",
              })
            }
            className="btn btn-sm btn-secondary">
            Dark
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "light",
              })
            }
            className="btn btn-sm btn-warning">
            <img style={{width:'20px',height:'20px',marginRight:'10px'}} src={sun} />
            <span>Light</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
