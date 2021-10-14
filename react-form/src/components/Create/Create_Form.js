import React from "react";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

function Create_Form() {
  // SETUP USESTATES
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

  // SETUP MOCK API CALL
  const callMockAPI = (data) => {
    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm";
    axios.post(endpointURL, data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    // ALERT USER
    alert("New Record Created!");
  };

  return (
    <Container>
      <Formik
        initialValues={{ firstName: "", surname: "" }} // SET ALL INITIAL VALUES HERE
        onSubmit={async (values) => {
          const data = {
            records: [
              {
                fields: {
                  // ADD ALL FIELDS AND VALUES HERE
                  firstName: values.firstName,
                  surname: values.surname,
                },
              },
            ],
          };
          callMockAPI(data); // PASS DATA TO MOCK API
        }}
        validationSchema={Yup.object({
          // UPDATE SCHEMA HERE FOR VALIDATION
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First Name is required"),
          surname: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Surname is required"),
        })}
      >
        {(formik, isSubmitting) => (
          <Form>
            <h4>Insurance Form</h4>
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <Field
                name="firstName"
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                onSubmit={(e) => setFirstName(e.target.value)}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="name">Surname</label>
              <Field
                name="surname"
                className={
                  formik.touched.surname && formik.errors.surname
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                onSubmit={(e) => setSurname(e.target.value)}
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div className="invalid-feedback">{formik.errors.surname}</div>
              ) : null}
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Create_Form;
