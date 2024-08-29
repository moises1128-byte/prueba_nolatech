import React from "react";
import Styles from "./styles.module.scss";
import "../../styles/styles.scss";
import SideBar from "../../components/sidebar/SideBar";
import Settings from "../../assets/images/settings.svg";
import Resources from "../../assets/images/resources.svg";
import Star from "../../assets/images/star.svg";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Dashboard from "../../assets/animation/dashboard.json";

const DashboardPage = () => {
  const navigate = useNavigate();
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
          <div style={{ paddingBottom: 20 }}>Dashboard Page</div>

          <div className={Styles.col}>
            <div className={Styles.row}>
              <div onClick={() => navigate("/profile")} className={Styles.item}>
                <div style={{ display: "flex" }}>
                  <img alt={"settings"} src={Settings} />
                  <span style={{ padding: 20 }}>Configuration</span>
                </div>
              </div>
              <div onClick={() => navigate("/form")} className={Styles.item}>
                <div style={{ display: "flex" }}>
                  <img alt={"form"} src={Resources} />
                  <span style={{ padding: 20 }}>From Page</span>
                </div>
              </div>
            </div>
            <div className={Styles.row}>
              <div onClick={() => navigate("/result")} className={Styles.item}>
                <div style={{ display: "flex" }}>
                  <img alt={"form"} src={Star} />
                  <span style={{ padding: 20 }}>Result Page</span>
                </div>
              </div>
              <div className={Styles.item}>
                <span style={{ padding: 20 }}>Construction</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 40,
            }}
          >
            <div
              style={{
                maxHeight: "50%",
                maxWidth: "50%",
              }}
            >
              <Lottie animationData={Dashboard} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
