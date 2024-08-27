import React from "react";
import Styles from "./styles.module.scss";
import "../../styles/styles.scss";
import SideBar from "../../components/sidebar/SideBar";

const DashboardPage = () => {
  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>

      <div
        style={{ position: "relative", zIndex: 1 }}
        className={Styles.container}
      >
        <div className={Styles.form}>
          <div>Dashboard Page</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
