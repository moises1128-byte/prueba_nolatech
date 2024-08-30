import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Styles from "./styles.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const clientSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegExp, "email no valido")
      .required("el email es requerido"),
    password: Yup.string().required("la contraseña es requerida"),
  });

  const fetchDataAsync = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${email}`);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok (status ${response.status})`
        );
      }
      const data = await response.json();

      if (data?.type === "admin") {
        if (password === data?.password) {
          toast.success("Access Granted");
          navigate("/usersList");
          dispatch(loginSuccess({ ...data }));
        } else {
          toast.error("Wrong email or Password");
        }
      } else {
        if (password === data?.password) {
          toast.success("Access Granted");
          navigate("/dashboard");
          dispatch(loginSuccess({ ...data }));
        } else {
          toast.error("Wrong email or Password");
        }
      }
    } catch (error) {
      toast.error("User Doesn't Exist");

      console.error("Error: ", error);
    }
  };

  return (
    <div className={Styles.container}>
      <ToastContainer />
      <div className={Styles.form}>
        <div className={Styles.formContainer}>
          <h5 className="auth-logo">
            <i className="fa fa-circle text-primary" />
            Sing App
            <i className="fa fa-circle text-danger" />
          </h5>

          <Formik
            validationSchema={clientSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              fetchDataAsync(values.email, values.password);
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
                  <span>Password</span>

                  <Field
                    className={Styles.inputStyle}
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <span className={Styles.inputError}>{errors.password}</span>
                  ) : null}
                </div>

                <Button onClick={handleSubmit} className={Styles.bottom}>
                  <p className="social-text">Login</p>
                </Button>
              </>
            )}
          </Formik>

          <p className="widget-auth-info">
            Don't have an account?
            <Link to="/register"> Sign up now!</Link>
          </p>
        </div>
        <footer style={{ display: "flex", justifyContent: "center" }}>
          {new Date().getFullYear()} &copy; App - By
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

export default LoginPage;
