import { Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./component/searchBar/SearchBar";
import Details from "./component/companyDetails/Details";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
