import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Styles from "./styles.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "../../styles/styles.scss";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewSecondPassword, setViewSecondPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const clientSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegExp, "email no valido")
      .required("el email es requerido"),
    name: Yup.string().required("el nombre es requerido"),
    password: Yup.string()
      .required("contaseña requerida")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "debe contener 8 caracteres, una Mayuscula, una minuscula, un numero y un caracter especial"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "las contrasenas no coinciden")
      .required("contaseña requerida")
      .min(8),
  });

  return (
    <div className={Styles.container}>
      <ToastContainer />
      <div className={Styles.form}>
        <div className={Styles.formContainer}>
          <h5 className="auth-logo">
            <i className="fa fa-circle text-primary" />
            Register App
            <i className="fa fa-circle text-danger" />
          </h5>

          <Formik
            validationSchema={clientSchema}
            initialValues={{
              email: "",
              name: "",
              password: "",
              confirmPassword: "",
            }}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              dispatch(loginSuccess({ ...values, type: "user" }));
              navigate("/profile");
              toast.success("You have been Register Succesfully");
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
                <div style={{ width: "100%" }}>
                  <span>Email</span>

                  <Field
                    className={Styles.inputStyle}
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <span className={Styles.inputError}>{errors.email}</span>
                  ) : null}
                </div>

                <div style={{ width: "100%" }}>
                  <span>Name</span>

                  <Field
                    className={Styles.inputStyle}
                    value={values.name}
                    onChange={handleChange}
                    type="name"
                    name="name"
                    placeholder="Name"
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <span className={Styles.inputError}>{errors.name}</span>
                  ) : null}
                </div>

                <div
                  style={{
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <span>Password</span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Field
                      className={Styles.inputStyle}
                      value={values.password}
                      onChange={handleChange}
                      type={viewPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      onBlur={handleBlur}
                    />

                    {viewPassword ? (
                      <div
                        className={Styles.icon}
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                          <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                          <path d="M3 3l18 18" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className={Styles.icon}
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.password && touched.password ? (
                    <span className={Styles.inputError}>{errors.password}</span>
                  ) : null}
                </div>

                <div
                  style={{
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <span>Confirm Password</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Field
                      className={Styles.inputStyle}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      type={viewSecondPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onBlur={handleBlur}
                    />

                    {viewSecondPassword ? (
                      <div
                        className={Styles.icon}
                        onClick={() =>
                          setViewSecondPassword(!viewSecondPassword)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                          <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                          <path d="M3 3l18 18" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className={Styles.icon}
                        onClick={() =>
                          setViewSecondPassword(!viewSecondPassword)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <span className={Styles.inputError}>
                      {errors.confirmPassword}
                    </span>
                  ) : null}
                </div>

                <Button onClick={handleSubmit} className={Styles.bottom}>
                  <p className="social-text">Login</p>
                </Button>
              </>
            )}
          </Formik>

          <p className="widget-auth-info">
            have an account?
            <Link to="/"> Login now!</Link>
          </p>
        </div>
        <footer style={{ display: "flex", justifyContent: "center" }}>
          {new Date().getFullYear()} &copy; Sing App - By{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://flatlogic.com"
          >
            Nolatech
          </a>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
