
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SchoolAPI from "../../api/SchoolAPI";

export default function SchoolIndex() {

  const [Schools, setSchools] = useState([])

  const fetchSchools = async () => {
    const response = await new SchoolAPI().index()
    if(response.ok){
      setSchools(response.data)
    }else{
      alert("Something went wrong while fetching Schools")
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [])
  
  return (
    <div className="index-container School-index-container ">
      <Link to="/School/new" className="btn btn-primary btn-School">Add School</Link>
      <table className="table generated-table School-table">
        <thead>
          <tr>
            
              <th>ID</th>
              <th>SchoolName</th>
              <th>YearFounded</th>
              <th>Address</th>
              <th>Description</th>
              <th>SchoolLogo</th>
              <th>SchoolAVP</th>
              <th>ContactNumber</th>
              <th>CreatedBy</th>
              <th>CreatedDate</th>
              <th>UpdatedBy</th>
              <th>UpdatedDate</th>
              <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {Schools.map(School => (
            <tr key={School.ID}>
              <td>{School["ID"]}</td>
              <td>{School["SchoolName"]}</td>
              <td>{School["YearFounded"]}</td>
              <td>{School["Address"]}</td>
              <td>{School["Description"]}</td>
              <td>{School["SchoolLogo"]}</td>
              <td>{School["SchoolAVP"]}</td>
              <td>{School["ContactNumber"]}</td>
              <td>{School["CreatedBy"]}</td>
              <td>{School["CreatedDate"]}</td>
              <td>{School["UpdatedBy"]}</td>
              <td>{School["UpdatedDate"]}</td>
              <td>{School["Deleted"]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  