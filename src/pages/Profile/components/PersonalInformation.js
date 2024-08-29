import React, { useEffect, useState } from "react";
import Styles from "../style.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../state/reducer/userReducer";

const InformationComponent = ({ toast }) => {
  const dispatch = useDispatch();
  const userData = useSelector(loginSuccess);

  const user = userData.payload.auth.user;

  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const clientSchema = Yup.object().shape({
    name: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    birthday: Yup.string().required("Fecha de nacimiento es requerida"),
    telephone: Yup.string()
      .matches(phoneRegExp, "Numero de telefono invalido")
      .required("El telefono es requerido")
      .min(10, "Muy corto")
      .max(12, "Muy largo"),
    email: Yup.string()
      .matches(emailRegExp, "email no valido")
      .required("el email es requerido"),
  });

  const updateUserDataAsync = async (values) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: values.email,
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          birthday: values.birthday,
          telephone: values.telephone,
        }),
      });

      toast.success("Personal Information was Updated");
      console.log(response.json());
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  return (
    <div className={Styles.col}>
      <div style={{ fontWeight: "bold" }}>Personal Information</div>

      <Formik
        validationSchema={clientSchema}
        initialValues={{
          name: user?.name ?? "",
          lastName: user?.lastName ?? "",
          birthday: user?.birthday ?? "",
          telephone: user?.telephone ?? "",
          email: user?.email ?? "",
        }}
        onSubmit={(values) => {
          updateUserDataAsync(values);
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
            <div className={Styles.row}>
              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Name</span>
                <Field
                  type="text"
                  name="name"
                  placeholder="Escriba su nombre"
                  className={Styles.inputStyle}
                />
                {errors.name && touched.name ? (
                  <span className={Styles.inputError}>{errors.name}</span>
                ) : null}
              </div>

              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Last Name</span>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Escriba su Apellido"
                  className={Styles.inputStyle}
                />
                {errors.lastName && touched.lastName ? (
                  <span className={Styles.inputError}>{errors.lastName}</span>
                ) : null}
              </div>

              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Date of birth</span>
                <Field
                  type="date"
                  name="birthday"
                  placeholder="Escriba su cumpleaños"
                  className={Styles.inputStyle}
                />
                {errors.birthday && touched.birthday ? (
                  <span className={Styles.inputError}>{errors.birthday}</span>
                ) : null}
              </div>
            </div>

            <div className={Styles.row}>
              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Telephone</span>
                <Field
                  type="number"
                  name="telephone"
                  placeholder="Escriba su Telephone"
                  className={Styles.inputStyle}
                />
                {errors.telephone && touched.telephone ? (
                  <span className={Styles.inputError}>{errors.telephone}</span>
                ) : null}
              </div>

              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Email</span>
                <Field
                  type="text"
                  name="email"
                  placeholder="Escriba su email"
                  className={Styles.inputStyle}
                />
                {errors.email && touched.email ? (
                  <span className={Styles.inputError}>{errors.email}</span>
                ) : null}
              </div>
            </div>

            <div style={{ width: "30%" }}>
              <Button onClick={handleSubmit} className={Styles.bottom}>
                <p className="social-text">Update</p>
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default InformationComponent;
