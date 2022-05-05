
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { Form } from 'react-bootstrap';
  import SchoolAPI from "../../api/SchoolAPI";
import toBase64 from "../../utils/toBase64";
  
  export default function SchoolNew() {
    const [SchoolName, setSchoolName] = useState('');
    const [YearFounded, setYearFounded] = useState('');
    const [Address, setAddress] = useState('');
    const [Description, setDescription] = useState('');
    const [SchoolLogo, setSchoolLogo] = useState('');
    const [SchoolAVP, setSchoolAVP] = useState('');
    const [ContactNumber, setContactNumber] = useState('');

    const fetchSchools = async () => {
      let data = {
        "tableName": "School",
        "columnValues": [
          {
            "column": 'SchoolName',
            "value": SchoolName
          },
          {
            "column": 'YearFounded',
            "value": YearFounded
          },
          {
            "column": 'Address',
            "value": Address
          },
          {
            "column": 'Description',
            "value": Description
          },
          {
            "column": 'SchoolLogo',
            "value": SchoolLogo
          },
          {
            "column": 'SchoolAVP',
            "value": SchoolAVP
          },
          {
            "column": 'ContactNumber',
            "value": ContactNumber
          },
        ]
      }
      const response = await new SchoolAPI().create(data)
      if(response.ok){
        alert('Data added successfully')
      }else{
        alert("Something went wrong while fetching Schools")
      }
    }

    return (
      <Form className="col-lg-8 m-auto">
        <p>Create</p>
        <Form.Group controlId="createItem">
          <Form.Label>School Name</Form.Label>
          <Form.Control value={SchoolName} onChange={(e) => setSchoolName(e.target.value)} type="text" placeholder="Enter School Name" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>Year Founded</Form.Label>
          <Form.Control value={YearFounded} onChange={(e) => setYearFounded(e.target.value)} type="number" placeholder="Enter Year Founded" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>Address</Form.Label>
          <Form.Control value={Address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter Address" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>Description</Form.Label>
          <Form.Control value={Description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Description" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>School Logo</Form.Label>
          <Form.Control onChange={async(e) => setSchoolLogo((await toBase64(e.target.files[0])).base64String)} type="file" placeholder="Enter School Logo" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>School AVP</Form.Label>
          <Form.Control onChange={async(e) => setSchoolAVP((await toBase64(e.target.files[0])).base64String)} type="file" placeholder="Enter School AVP" />
        </Form.Group>
        <Form.Group controlId="createItem">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} type="number" placeholder="Enter Contact Number" />
        </Form.Group>
        <button onClick={() => fetchSchools()} className="btn btn-primary btn-School">Submit</button>
      </Form>
    );
  }
  