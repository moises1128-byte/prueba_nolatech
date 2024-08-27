import React, { useState } from "react";
import Styles from "./styles.module.scss";
import SideBar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Success from "../../assets/animation/Success.json";
import Lottie from "lottie-react";

const FormPage = () => {
  const user = useSelector(loginSuccess);
  const [done, setDone] = useState(false);

  console.log(user.payload.auth.user, "test");

  const clientSchema = Yup.object().shape({
    sexe: Yup.string().required("el sexo es requerido"),
    age: Yup.number().required("el año es requerido"),
    color: Yup.string().required("el color es requerido"),
  });

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 5 }}>
        <SideBar />
      </div>
      <div className={Styles.container}>
        <ToastContainer />
        <div className={Styles.form}>
          <div style={{ paddingBottom: 30, fontWeight: "bold" }}>Form Page</div>

          {done ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Lottie animationData={Success} loop={false} />
            </div>
          ) : (
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
                    <div style={{ fontWeight: "bold" }}>
                      Personal Information
                    </div>
                    <div style={{ width: "100%" }}>
                      <span>Sexe</span>
                      <Field
                        className={Styles.inputStyle}
                        value={values.sexe}
                        onChange={handleChange}
                        name="sexe"
                        placeholder="sexe"
                        component="select"
                      >
                        <option value="">Select Sexe</option>
                        <option value="man">Man</option>
                        <option value="female">Female</option>
                        <option value="none">None</option>
                      </Field>
                      {errors.sexe && touched.sexe ? (
                        <span className={Styles.inputError}>{errors.sexe}</span>
                      ) : null}
                    </div>

                    <div style={{ width: "100%" }}>
                      <span>Age</span>
                      <Field
                        className={Styles.inputStyle}
                        value={values.age}
                        onChange={handleChange}
                        type="number"
                        name="age"
                        placeholder="age"
                        onBlur={handleBlur}
                      />
                      {errors.age && touched.age ? (
                        <span className={Styles.inputError}>{errors.age}</span>
                      ) : null}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>How mucho money do you earn ?</span>
                      <Field
                        className={Styles.inputStyle}
                        value={values.money}
                        onChange={handleChange}
                        type="number"
                        //   name="money"
                        placeholder="$$$"
                        onBlur={handleBlur}
                        disabled
                      />
                      <Field type="range" name="money" max="10000" min="0" />
                    </div>
                  </div>

                  <div style={{ width: "100%" }}>
                    <span>Favorite color ?</span>
                    <Field
                      className={Styles.inputStyle}
                      value={values.color}
                      onChange={handleChange}
                      name="color"
                      placeholder="color"
                      component="select"
                    >
                      <option value="">Select Color</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="blue">Blue</option>
                    </Field>
                    {errors.color && touched.color ? (
                      <span className={Styles.inputError}>{errors.color}</span>
                    ) : null}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
