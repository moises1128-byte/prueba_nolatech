import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import InformationComponent from "./components/PersonalInformation";
import { toast, ToastContainer } from "react-toastify";
import AddressComponent from "./components/AddressInformation";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector(loginSuccess);
  const userCompletedAnswerd = user?.payload?.auth.user?.preguntasContestatas;

  const navigate = useNavigate();
  const [questionsData, setQuestionsData] = useState([]);

  const deleteUserDataAsync = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });
      navigate("/");
      toast.error("Your Account has been deleted");
      console.log(response.json(), "test");
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  const getQuestionsDataAsync = async () => {
    try {
      fetch("http://localhost:8000/preguntas")
        .then((response) => response.json())
        .then((questions) => setQuestionsData(questions));
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getQuestionsDataAsync();
  }, []);

  console.log(userCompletedAnswerd, "test");

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <ToastContainer />
        <div className={Styles.form}>
          <div style={{ paddingBottom: 30, fontWeight: "bold" }}>
            Profile Page
          </div>

          <InformationComponent toast={toast} />

          <div style={{ paddingTop: 20 }}>
            <AddressComponent toast={toast} />
          </div>

          <div style={{ paddingTop: 30 }} className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Questions Information</div>

            <div style={{ display: "flex" }}>
              Posees un total de preguntas de :
              <div style={{ fontWeight: "bold" }}> {questionsData.length}</div>
            </div>
            <div style={{ display: "flex" }}>
              Preguntas Completadas :
              <div style={{ fontWeight: "bold" }}>
                {userCompletedAnswerd?.length !== 0
                  ? userCompletedAnswerd?.length
                  : 0}
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 30 }} className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Notifications</div>
            <div className={Styles.row}>
              <div style={{ width: "100%" }}>
                <span>Suscripción al Newsletter de Nolatech</span>
                <input type="radio" name="address" placeholder="Address" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 30 }} className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Delete Personal Account</div>
            <div className={Styles.row}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span>Delete my account and personal data</span>
                <span
                  onClick={() =>
                    deleteUserDataAsync(user?.payload?.auth.user?.id)
                  }
                  className={Styles.delete}
                >
                  Delete Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
