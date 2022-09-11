import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../navBar/NavBar";
import "../../style/companyDetails/Details.css";

export default function Details() {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      await axios
        .get("http://localhost:8080/company-details")
        .then((response) => {
          if (response && response.data && response.data.success) {
            console.log("RESPONSE: ", response);
            setCompanyInfo(response.data?.payload);
            setIsLoading(false);
          }
        });
    };
    fetchCompanyInfo();
  }, []);

  console.log("companyInfo: ", companyInfo);
  console.log("isLoading: ", isLoading);
  const goBack = () => {
    return navigate("/");
  };
  return (
    <>
      <NavBar title={"xyz"} />
      <div className="company-button">
        <Button
          variant="outlined"
          style={{ backgroundColor: "purple" }}
          onClick={goBack}
        >
          {"<- COMPANY"}
        </Button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">CIN</th>
            <th scope="col">COMPANY NAME</th>
          </tr>
        </thead>
        {isLoading === false &&
          companyInfo.length !== 0 &&
          companyInfo.map((company) => (
            <tbody key={company.id}>
              <tr>
                <th scope="row"> </th>
                <td>{company.cin}</td>
                <td>{company.company_name}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
