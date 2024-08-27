import React, { useEffect, useState } from "react";
import Styles from "../styles.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";

function fetchPreguntas() {
  return fetch("http://localhost:8000/preguntas")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

const FirstForm = ({ setDone, toast, done }) => {
  const [questionsData, setQuestionsData] = useState([]);

  const clientSchema = Yup.object().shape({
    sexe: Yup.string().required("el sexo es requerido"),
    age: Yup.number().required("el año es requerido"),
    color: Yup.string().required("el color es requerido"),
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      const fetchedData = await fetchPreguntas();
      setQuestionsData(fetchedData);
    };
    fetchDataAsync();
  }, []);

  return (
    <div className={Styles.firstFormContainer}>
      <Formik
        validationSchema={clientSchema}
        initialValues={{
          sexe: "",
          age: "",
          money: "",
          color: "",
        }}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          toast.success("Form has been submitted");
          setDone(!done);
          console.log(values);
          //   dispatch(loginSuccess({ ...values, type: "user" }));
          //   navigate("/profile");
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleBlur,
          resetForm,
          handleChange,
          values,
        }) => (
          <>
            <div className={Styles.col}>
              {questionsData.map((item, index) => (
                <>
                  {item.tipo === "range" && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>{item?.label}</span>
                      <Field
                        className={Styles.inputStyle}
                        value={values.money}
                        onChange={handleChange}
                        type={item?.seconTipo}
                        placeholder={item?.placeHolder}
                        onBlur={handleBlur}
                        disabled
                      />
                      <Field
                        type={item?.tipo}
                        name={item?.name}
                        max={item?.max}
                        min={item?.min}
                      />
                    </div>
                  )}

                  {item.component === "select" && (
                    <div style={{ width: "100%" }}>
                      <span>{item?.label}</span>
                      <Field
                        className={Styles.inputStyle}
                        value={values.sexe}
                        onChange={handleChange}
                        name={item?.name}
                        component={item?.component}
                      >
                        {item?.options.map((item, index) => (
                          <option value={item?.key}>{item?.value}</option>
                        ))}
                      </Field>
                      {/* {errors.{item?.name} && touched.{item?.name} ? (
                            <span className={Styles.inputError}>
                              {errors.{item?.name}}
                            </span>
                          ) : null} */}
                    </div>
                  )}

                  {item.tipo === "number" && (
                    <div style={{ width: "100%" }}>
                      <span>{item?.label}</span>
                      <Field
                        className={Styles.inputStyle}
                        // value={values.age}
                        onChange={handleChange}
                        type={item.tipo}
                        name={item?.name}
                        placeholder={item?.placeHolder}
                        onBlur={handleBlur}
                      />
                      {/* {errors.age && touched.age ? (
                            <span className={Styles.inputError}>
                              {errors.age}
                            </span>
                          ) : null} */}
                    </div>
                  )}
                </>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <Button onClick={handleSubmit} className={Styles.bottom}>
                <p className="social-text">Complete Form</p>
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FirstForm;
