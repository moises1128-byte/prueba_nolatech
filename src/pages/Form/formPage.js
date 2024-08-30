import React, { useEffect } from "react";
import Styles from "./styles.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { ToastContainer, toast } from "react-toastify";
import Success from "../../assets/animation/Success.json";
import Lottie from "lottie-react";
import From from "./components/firstForm";

const FormPage = () => {
  const user = useSelector(loginSuccess);
  const userCompletedAnswerd = user?.payload?.auth.user?.preguntasContestatas;

  useEffect(() => {
    if (userCompletedAnswerd?.length !== 0) {
      toast.success("You have completed all questions !!");
    }
  });

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

          {userCompletedAnswerd?.length !== 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                height: "80%",
              }}
            >
              <Lottie animationData={Success} loop={false} />
            </div>
          ) : (
            <From toast={toast} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
