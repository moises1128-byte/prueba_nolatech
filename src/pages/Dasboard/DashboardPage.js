import React, { useState } from "react";
import Styles from "./styles.module.scss";
import "../../styles/styles.scss";
import SideBar from "../../components/sidebar/SideBar";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "react-chartjs-2";

const DashboardPage = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      quizAttempts: [
        {
          quizId: 1,
          completedQuestions: 10,
          score: 80,
        },
        {
          quizId: 2,
          completedQuestions: 15,
          score: 95,
        },
      ],
    },
  ];

  const [chartData, setChartData] = useState({
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Total Completed Questions",
        data: users.map((user) =>
          user.quizAttempts.reduce(
            (total, attempt) => total + attempt.completedQuestions,
            0
          )
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        type: "category", // Use 'category' here
        // Other options for x-axis
      },
    },
  };

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

          {/* <div>
            <Bar options={options} data={chartData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
