import React, { useEffect, useState } from "react";
import Styles from "../styles.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../state/reducer/userReducer";

function fetchPreguntas() {
  return fetch("http://localhost:8000/preguntas")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

const initializeQuestionValues = (fetchedData) => {
  let emptyFormData = [];
  emptyFormData = fetchedData.map((question) => {
    // console.log(question, "teauyset");

    return {
      id: question.id,
      respuesta: question.respuesta,
    };
  });

  return emptyFormData;
};

const FirstForm = ({ toast }) => {
  const user = useSelector(loginSuccess);
  const userId = user?.payload?.auth.user?.id;

  const [questionsData, setQuestionsData] = useState([]);

  // console.log(questionsData, "test");

  useEffect(() => {
    const fetchDataAsync = async () => {
      const fetchedData = await fetchPreguntas();
      setQuestionsData(initializeQuestionValues(fetchedData));
      setQuestionsData(fetchedData);
    };
    fetchDataAsync();
  }, []);

  const updateUserQuestionsDataAsync = async (respuestas) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preguntasContestatas: respuestas,
        }),
      });

      toast.success("Question has been Updated");
      console.log(response.json(), "test");
    } catch (error) {
      alert("Error");
      console.log("Error: ", error);
    }
  };

  const initialValues = questionsData.reduce((acc, question) => {
    const { type, defaultValue, id } = question;

    switch (type) {
      case "text":
        acc[id] = defaultValue || "";
        break;
      case "number":
        acc[id] = defaultValue || 0;

        break;
      case "select":
        acc[id] = defaultValue || "";

        break;
      case "checkbox":
        acc[id] = defaultValue || false;

        break;
      // ... other question types
      default:
        break;
    }

    return acc;
  }, {});

  function addIdToObject(obj) {
    const id = Object.keys(obj).length;
    return { id, ...obj };
  }

  return (
    <div className={Styles.FormContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let idCounter = 0;
          const outputObject = Object.entries(values).map(([key, value]) => {
            const newObject = addIdToObject({ [key]: value });
            newObject.id = idCounter++;
            return newObject;
          });

          updateUserQuestionsDataAsync(outputObject);

          // console.log(outputObject, "test");
        }}
      >
        {({ handleSubmit }) => (
          <>
            <div className={Styles.col}>
              {questionsData?.length !== 0 && (
                <Form>
                  {questionsData.map((pregunta) => (
                    <div key={pregunta.id}>
                      <label htmlFor={pregunta.name}>{pregunta.label}</label>
                      {pregunta.type === "select" ? (
                        <Field
                          as="select"
                          className={Styles.inputStyle}
                          name={pregunta.name}
                        >
                          {pregunta.options.map((option) => (
                            <option key={option.key} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          className={Styles.inputStyle}
                          type={pregunta.type}
                          name={pregunta.name}
                          placeholder={pregunta.placeholder}
                        />
                      )}
                      <ErrorMessage name={pregunta.name} component="div" />
                    </div>
                  ))}
                  <Button onClick={handleSubmit} className={Styles.bottom}>
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FirstForm;
