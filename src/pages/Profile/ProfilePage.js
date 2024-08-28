import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";

function fetchUser() {
  return fetch("http://localhost:8000/users")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

const ProfilePage = () => {
  const user = useSelector(loginSuccess);
  const [userData, setUserdata] = useState({});

  // const mockdata = [
  //   {key:1,fomrName:'fomr-1'},
  //   {key:2,fomrName:'fomr-2'},
  //   {key:3,fomrName:'fomr-3'},
  // ]

  // console.log(user.payload.auth.user, "test");

  useEffect(() => {
    const fetchDataAsync = async () => {
      const fetchedData = await fetchUser();
      setUserdata(fetchedData);
    };
    fetchDataAsync();
  }, []);

  console.log(userData, "testt2");

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <div className={Styles.form}>
          <div style={{ paddingBottom: 30, fontWeight: "bold" }}>
            Profile Page
          </div>

          <div className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Personal Information</div>
            <div className={Styles.row}>
              <div style={{ width: "100%" }}>
                <span>Name</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>

              <div style={{ width: "100%" }}>
                <span>Last Name</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="LastName"
                  placeholder="LastName"
                />
              </div>

              <div style={{ width: "100%" }}>
                <span>Date of birth</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="birth"
                  placeholder="Birthday"
                />
              </div>
            </div>

            <div className={Styles.row}>
              <div style={{ width: "100%" }}>
                <span>Telephone</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="telephone"
                  placeholder="Telephone"
                />
              </div>

              <div style={{ width: "100%" }}>
                <span>Email</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 30 }} className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Address Information</div>
            <div className={Styles.row}>
              <div style={{ width: "100%" }}>
                <span>Address</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
              </div>

              <div style={{ width: "100%" }}>
                <span>Postal Code</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="PostalCode"
                  placeholder="PostalCode"
                />
              </div>
            </div>

            <div className={Styles.row}>
              <div style={{ width: "100%" }}>
                <span>City</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="city"
                  placeholder="City"
                />
              </div>

              <div style={{ width: "100%" }}>
                <span>Country</span>
                <input
                  className={Styles.inputStyle}
                  type="text"
                  name="country"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 30 }} className={Styles.col}>
            <div style={{ fontWeight: "bold" }}>Questions Information</div>

            <div style={{ display: "flex" }}>
              Posees un total de preguntas de :
              <div style={{ fontWeight: "bold" }}> 0</div>
            </div>
            <div style={{ display: "flex" }}>
              Preguntas Completadas :
              <div style={{ fontWeight: "bold" }}> 0</div>
            </div>
            <div style={{ display: "flex" }}>
              Preguntas no Completadas :
              <div style={{ fontWeight: "bold" }}> 0</div>
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
                <span style={{ color: "red" }}>Delete Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
