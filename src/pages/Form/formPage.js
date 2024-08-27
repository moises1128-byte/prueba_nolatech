import React, { useState } from "react";
import Styles from "./styles.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { ToastContainer, toast } from "react-toastify";
import Success from "../../assets/animation/Success.json";
import Lottie from "lottie-react";
import FirstFrom from "./components/firstForm";
import SecondForm from "./components/secondFrom";
import ThirdForm from "./components/thirdForm";

const FormPage = () => {
  const user = useSelector(loginSuccess);
  const [done, setDone] = useState(false);

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
            Formulario de Preguntas
          </div>

          {/* {done ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Lottie animationData={Success} loop={false} />
            </div>
          ) : ( */}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <FirstFrom setDone={setDone} done={done} toast={toast} />

            {/* <SecondForm setDone={setDone} done={done} toast={toast} />

            <ThirdForm setDone={setDone} done={done} toast={toast} /> */}
          </div>

          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
