import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import * as Yup from "yup";

// imports from old project
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

function Create() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  // FORM VALIDATION
  const [validated, setValidated] = useState(false);
  // HANDLE SUBMIT
  const handleSubmit = (event) => {
    alert("Handle");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (validated === true) {
      callMockAPI();
    }
  };
  // SETUP USESTATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // SETUP HISTORY
  //let history = useHistory(); // THIS LINE SEEMS TO MESS UP HOOKS

  // SETUP MOCK API CALL
  const callMockAPI = () => {
    // SETUP FORM DATA
    const formData = {
      firstName,
      lastName,
    };

    // CALL MOCK API
    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm";
    axios.post(endpointURL, formData).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    // ALERT USER
    alert("New Record Created!");
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      onSubmit={console.log}
      initialValues={{
        firstName: "",
        lastName: "",

        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Container>
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

export default Create;
