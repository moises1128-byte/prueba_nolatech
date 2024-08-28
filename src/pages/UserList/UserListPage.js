import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { ToastContainer, toast } from "react-toastify";
import HeaderComponent from "./components/HeaderComponent";
import ListComponent from "./components/ListComponent";

const UserListPage = () => {
  const user = useSelector(loginSuccess);
  const [search, setSearch] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [clientsData, setClienstData] = useState([]);

  console.log(filterList, "filter list");

  const getUserDataAsync = async () => {
    try {
      fetch("http://localhost:8000/users")
        .then((response) => response.json())
        .then((users) => setClienstData(users));
    } catch (error) {
      alert("Error");
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getUserDataAsync();
  }, []);

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <ToastContainer />
        <div className={Styles.form}>
          <HeaderComponent
            setSearch={setSearch}
            search={search}
            data={clientsData}
            setFilterList={setFilterList}
          />
          <div style={{ width: "100%", position: "relative", top: 12 }}>
            <div className={Styles.line} />
          </div>

          {search !== "" ? (
            <ListComponent data={filterList} />
          ) : (
            <ListComponent data={clientsData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
