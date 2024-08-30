import React from "react";
import Styles from "./style.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { ToastContainer, toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
const ResultPage = () => {
  const user = useSelector(loginSuccess);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "My Second Dataset",
        data: [12, 19, 3, 5, 2, 3, 11],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <ToastContainer />
        <div className={Styles.form}>
          <div style={{ paddingBottom: 30, fontWeight: "bold" }}>
            Resultados de Preguntas Para la visualizacion de los Admins
          </div>

          <div>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
