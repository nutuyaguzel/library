import React from "react";

import Header from "../components/Header";
import Button from "../components/Button";
import ListCategories from "../components/ListCategories";


import { useNavigate } from "react-router-dom";

const CategoriesHome = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Button
            type={"primary"}
            text="Kategori Ekle"
            onClick={() => navigate("/add-category")}
          />
        </div>
        <ListCategories />
      </div>
    </div>
  );
};

export default CategoriesHome;
