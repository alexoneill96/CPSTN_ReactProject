import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Create from "./components/Create/Create";
//import ContactUsForm from "./components/Create/InsuranceForm";
import Create_Form from "./components/Create/Create_Form";

function App() {
  return (
    <div className="App">
      <div className="form-wrapper">
        <Create_Form />
      </div>
    </div>
  );
}

export default App;
