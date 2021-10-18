import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Table from "react-bootstrap/Table";

function Administration() {
  const [idGET, setIdGET] = useState(null);
  const [idDELETE, setIdDELETE] = useState(null);
  const [idUPDATE, setIdUPDATE] = useState(null);
  const [surname, setSurname] = useState(null);
  const [driverData, setDriverData] = useState(null);

  function callAPIAxiosGET() {
    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm/" +
      idGET;

    axios
      .get(endpointURL)
      .then((response) => {
        setDriverData(response.data);
        alert(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    alert(endpointURL);
  }

  function callAPIAxiosDELETE() {
    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm/" +
      idDELETE;

    alert(endpointURL);
    axios.delete(endpointURL).catch((err) => {
      console.log(err);
    });
  }

  function callAPIAxiosUPDATE() {
    const formData = {
      surname,
    };

    const endpointURL =
      "https://6151d1804a5f22001701d45b.mockapi.io/api/v1/insuranceForm/" +
      idUPDATE;

    axios.put(endpointURL, formData).catch((err) => {
      console.log(err);
    });

    alert(formData.surname);
    alert(endpointURL);
  }

  // Populate Table if customer data != null
  const renderTable = () => {
    if (driverData != null) {
      return (
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
              <td>{driverData.id}</td>
              <td>{driverData.firstName}</td>
              <td>{driverData.surname}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  };
  const noDataRender = () => {
    if (driverData === null) {
      return (
        <div>
          <h3>No Driver Record Found</h3>
        </div>
      );
    }
  };

  return (
    <Container>
      <form>
        <div className="form-group">
          <label htmlFor="driverGET">View Driver Details</label>
          <input
            type="text"
            className="form-control"
            id="driverGET"
            placeholder="Enter Driver ID"
            onChange={(e) => setIdGET(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={callAPIAxiosGET}
        >
          Get Driver
        </button>
      </form>
      {renderTable()}

      <form>
        <div className="form-group">
          <label htmlFor="driverDelete">Delete Driver Details</label>
          <input
            type="text"
            className="form-control"
            id="driverDELETE"
            placeholder="Enter Driver ID"
            onChange={(e) => setIdDELETE(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={callAPIAxiosDELETE}
        >
          Delete Driver
        </button>
      </form>
      <form>
        <div className="form-group">
          <label htmlFor="driverUpdate">Update Driver Telephone Number</label>
          <input
            type="text"
            className="form-control"
            id="driverUPDATE"
            placeholder="Enter Driver ID"
            onChange={(e) => setIdUPDATE(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            id="driverUPDATETelephone"
            placeholder="Enter Driver Telephone Number"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={callAPIAxiosUPDATE}
        >
          Update Driver Details
        </button>
      </form>
    </Container>
  );
} // end of admin function

export default Administration;
