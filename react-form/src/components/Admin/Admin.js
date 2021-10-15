import React from "react";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function Admin() {
  const [driverDetailsGETID, setDriverDetailsGETID] = useState("");

  const apiCallGetDriverData = () => {
    alert(driverDetailsGETID);
    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm?id=" +
      driverDetailsGETID;
    alert(endpointURL);
    axios.get(endpointURL).then((resp) => {
      console.log(resp.data);
    });
  };
  return (
    <Container>
      <Formik
        initialValues={{ driverDetailsGETID: "" }} // SET ALL INITIAL VALUES HERE
        onSubmit={async (values) => {
          const data = {
            // ADD ALL FIELDS AND VALUES HERE
            driverDetailsGETID: values.driverDetailsGETID,
          };
          apiCallGetDriverData();
        }}
        validationSchema={Yup.object({
          // UPDATE SCHEMA HERE FOR VALIDATION
          driverDetailsGETID: Yup.number()
            .min(1, "Number must be 1 or higher")
            .required("Driver ID is required to fetch details."),
        })}
      >
        {(formik, isSubmitting) => (
          <Form>
            <h4>Admin</h4>
            <div className="form-group">
              <label htmlFor="driverDetailsGETID">
                Enter Driver ID To Fetch Details
              </label>
              <Field
                name="driverDetailsGETID"
                className={
                  formik.touched.driverDetailsGETID &&
                  formik.errors.driverDetailsGETID
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                onSubmit={(e) => setDriverDetailsGETID(e.target.value)}
              />
              {formik.touched.driverDetailsGETID &&
              formik.errors.driverDetailsGETID ? (
                <div className="invalid-feedback">
                  {formik.errors.driverDetailsGETID}
                </div>
              ) : null}
            </div>
            <div id="table" hidden></div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                onSubmit={apiCallGetDriverData}
              >
                {isSubmitting ? "Please wait..." : "Fetch Driver Details"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div></div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#ID</th>
            <th>First Name</th>
            <th>Surname</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin;
