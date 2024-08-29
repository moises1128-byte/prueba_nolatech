import React, { useEffect, useState } from "react";
import Styles from "../style.module.scss";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../state/reducer/userReducer";
import { Country } from "./countrysData";

const AddressComponent = ({ toast }) => {
  const dispatch = useDispatch();
  const userData = useSelector(loginSuccess);

  const user = userData.payload.auth.user;

  const clientSchema = Yup.object().shape({
    address: Yup.string().required("Adresse est requis"),
    postalCode: Yup.number().required("Codigo postal requerido"),
    city: Yup.string().required("La ciudad es requerida"),
    country: Yup.string().required("Pais requerido"),
  });

  const updateUserDataAsync = async (values) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: values.address,
          postalCode: values.postalCode,
          city: values.city,
          country: values.country,
        }),
      });

      toast.success("Address Information was Updated");
      console.log(response.json());
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  return (
    <div className={Styles.col}>
      <div style={{ fontWeight: "bold" }}>Address Information</div>

      <Formik
        validationSchema={clientSchema}
        initialValues={{
          address: user?.address ?? "",
          postalCode: user?.postalCode ?? "",
          city: user?.city ?? "",
          country: user?.country ?? "",
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
                <span style={{ fontWeight: "bold" }}>Address</span>
                <Field
                  type="text"
                  name="address"
                  placeholder="Escriba su direccion"
                  className={Styles.inputStyle}
                />
                {errors.address && touched.address ? (
                  <span className={Styles.inputError}>{errors.address}</span>
                ) : null}
              </div>

              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Codigo Postal</span>
                <Field
                  type="number"
                  name="postalCode"
                  placeholder="Escriba su Codigo postal"
                  className={Styles.inputStyle}
                />
                {errors.postalCode && touched.postalCode ? (
                  <span className={Styles.inputError}>{errors.postalCode}</span>
                ) : null}
              </div>

              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Pais</span>
                <Field
                  className={Styles.inputStyle}
                  value={values.country}
                  onChange={handleChange}
                  name="country"
                  component="select"
                >
                  {Country.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>
                {errors.country && touched.country ? (
                  <span className={Styles.inputError}>{errors.country}</span>
                ) : null}
              </div>
            </div>

            <div className={Styles.row}>
              <div style={{ width: "100%", flexDirection: "column", gap: 5 }}>
                <span style={{ fontWeight: "bold" }}>Ciudad</span>
                <Field
                  type="text"
                  name="city"
                  placeholder="Escriba la ciudad"
                  className={Styles.inputStyle}
                />
                {errors.city && touched.city ? (
                  <span className={Styles.inputError}>{errors.city}</span>
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

export default AddressComponent;
