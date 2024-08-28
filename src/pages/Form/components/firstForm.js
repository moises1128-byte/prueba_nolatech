import React, { useEffect, useState } from "react";
import Styles from "../styles.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../state/reducer/userReducer";

function fetchPreguntas() {
  return fetch("http://localhost:8000/preguntas")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

const FirstForm = ({ setDone, toast, done }) => {
  const user = useSelector(loginSuccess);
  const userId = user?.payload?.auth.user?.id;
  const userQuestions = user?.payload?.auth.user?.preguntasContestatas;


  const [questionsData, setQuestionsData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchDataAsync = async () => {
      const fetchedData = await fetchPreguntas();
      setQuestionsData(fetchedData);
    };
    fetchDataAsync();
  }, []);

  const updateUserQuestionsDataAsync = async (id, respuesta) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preguntasContestatas: [{ id: id, respuesta: respuesta }],
        }),
      });

      toast.success("Question has been Updated");
      console.log(response.json(), "test");
    } catch (error) {
      alert("Error");
      console.log("Error: ", error);
    }
  };

  return (
    <div className={Styles.firstFormContainer}>
      <div className={Styles.col}>
        {questionsData.map((item, index) => (
          <>
            {item.type === "range" && (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>{index}</span>
                <div style={{ display: "flex", gap: 10, width: "80%" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span>{item?.label}</span>
                    <input
                      className={Styles.inputStyle}
                      // value={values.money}
                      // onChange={handleChange}
                      type={item?.seconTipo}
                      placeholder={item?.placeHolder}
                      // onBlur={handleBlur}
                      disabled
                      value={value}
                    />
                    <input
                      type={item?.type}
                      name={item?.name}
                      onChange={(e) => setValue(e.target.value)}
                      max={item?.max}
                      min={item?.min}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 20,
                    width: "20%",
                  }}
                >
                  <Button
                    onClick={() =>
                      updateUserQuestionsDataAsync(item?.id, value)
                    }
                    className={Styles.bottom}
                  >
                    <p className="social-text">Complete Question</p>
                  </Button>
                </div>
              </div>
            )}

            {item.type === "select" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: "bold" }}>{index}</span>

                <div style={{ width: "80%" }}>
                  <span>{item?.label}</span>
                  <select
                    className={Styles.inputStyle}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name={item?.name}
                  >
                    {item?.options.map((item, index) => (
                      <option value={item?.key}>{item?.value}</option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 20,
                    width: "20%",
                  }}
                >
                  <Button
                    onClick={() =>
                      updateUserQuestionsDataAsync(item?.id, value)
                    }
                    className={Styles.bottom}
                  >
                    <p className="social-text">Complete Question</p>
                  </Button>
                </div>
              </div>
            )}

            {item.type === "number" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: "bold" }}>{index}</span>

                <div style={{ width: "80%" }}>
                  <span>{item?.label}</span>
                  <input
                    className={Styles.inputStyle}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type={item.type}
                    name={item?.name}
                    placeholder={item?.placeHolder}
                    // onBlur={handleBlur}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 20,
                    width: "20%",
                  }}
                >
                  <Button
                    onClick={() =>
                      updateUserQuestionsDataAsync(item?.id, value)
                    }
                    className={Styles.bottom}
                  >
                    <p className="social-text">Complete Question</p>
                  </Button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default FirstForm;
