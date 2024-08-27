import React from "react";
import Styles from "./style.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { ToastContainer, toast } from "react-toastify";

const ResultPage = () => {
  const user = useSelector(loginSuccess);

  console.log(user.payload.auth.user, "test");

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <ToastContainer />
        <div className={Styles.form}>
          <div style={{ paddingBottom: 30, fontWeight: "bold" }}>
            Resultados de Preguntas
          </div>
          <progress />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
