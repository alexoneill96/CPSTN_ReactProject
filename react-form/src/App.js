import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Create_Form from "./components/Create/Create_Form";
import Admin from "./components/Admin/Admin.js";

function App() {
  return (
    <div className="App">
      <div className="form-wrapper">
        <Admin />
      </div>
    </div>
  );
}

export default App;
