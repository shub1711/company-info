import { useState, useCallback } from "react";
import "../../style/searchBar/SearchBar.css";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import NavBar from "../navBar/NavBar";

export default function SearchBar() {
  const navigate = useNavigate();
  const [element, setElement] = useState();
  const [selectedCompany, setSelectedCompany] = useState(" ");
  const companyList = element?.length && ReactHtmlParser(element);
  const [CIN, setCIN] = useState("");

  const onChange = useCallback(async (e) => {
    const data = {
      search: e.target.value,
      filter: "company",
    };
    setSelectedCompany(e.target.value);
    e.preventDefault();
    const response = await axios.post(
      "https://www.zaubacorp.com/custom-search",
      data
    );
    setElement(response.data);
    return response.data;
  }, []);

  const onSearch = useCallback(
    async (e) => {
      const companyName = e.target.textContent;
      console.log("companyList: ", companyList);
      const unfilteredCIN = companyList.filter(
        (company) => company.props?.children[0] === companyName
      )[0]?.props?.id;
      const filteredCIN = unfilteredCIN.slice(8 + companyName.length);
      setCIN(filteredCIN);
      setSelectedCompany(companyName);
      setElement("");
    },
    [companyList]
  );

  const onSubmit = useCallback(async () => {
    console.log("Payload: ", { selectedCompany, CIN });
    const body = {
      selectedCompany,
      CIN,
    };
    if (selectedCompany.length) {
      const response = await axios.post(
        "http://localhost:8080/add-company-info",
        body
      );
      if (response && response.data && response.data.success) {
        console.log("RESPONSE: ", response);
        navigate("/details");
      }
    }
  }, [selectedCompany, CIN, navigate]);
  console.log("companyList: ", companyList);

  return (
    <div>
      <NavBar />
      <div className="App">
        <h1>SEARCH YOUR COMPANY NAME</h1>
        <div className="search-container">
          <div className="search-inner">
            <input
              type="search"
              placeholder="Company Name"
              value={selectedCompany}
              onChange={onChange}
            />
          </div>
          <div className="dropdown">
            {companyList?.length &&
              companyList.map((company) => (
                <div
                  onClick={(e) => onSearch(e)}
                  className="dropdown-row"
                  key={company.props?.children[0]}
                >
                  {company.props?.children[0]}
                </div>
              ))}
          </div>
        </div>
        <div className="button">
          <Button
            className="button-submit"
            style={{ background: "White" }}
            variant="outlined"
            onClick={onSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}
