import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// imports from old project
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

function Create() {
  // FORM VALIDATION
  const [validated, setValidated] = useState(false);
  // HANDLE SUBMIT
  const handleSubmit = (event) => {
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
    <Container>
      <h2>New Driver Record</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  ); // END OF HTML RETURN
}

export default Create;
