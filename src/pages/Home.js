import React from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { themeState } = useSelector((state) => state);
  return (
    <div
      style={{ minHeight: "100vh" }}
      className={themeState === "light" ? "bg-light" : "bg-dark"}>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Button
            type={themeState === "light" ? "primary" : "secondary"}
            text="Kitap Ekle"
            onClick={() => navigate("/add-book")}
          />
        </div>
        <ListBooks />
      </div>
    </div>
  );
};

export default Home;
