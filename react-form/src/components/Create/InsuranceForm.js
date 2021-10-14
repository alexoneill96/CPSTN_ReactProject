import React from "react";
import { Formik, Field, Form } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";

const ContactUsForm = () => {
  return (
    <Container>
      <Formik
        initialValues={{ firstName: "", surname: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
        validationSchema={Yup.object({
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
            <h4>Contact Us</h4>
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
};

export default ContactUsForm;
