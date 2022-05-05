import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import SchoolAPI from "../../api/SchoolAPI";
import toBase64 from "../../utils/toBase64";
import { useForm } from "react-hook-form";

export default function SchoolNew() {
  const [SchoolName, setSchoolName] = useState("");
  const [YearFounded, setYearFounded] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [SchoolLogo, setSchoolLogo] = useState("");
  const [SchoolAVP, setSchoolAVP] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const submit = async (content) => {
    let data = {
      tableName: "School",
      columnValues: [
        {
          column: "SchoolName",
          value: SchoolName,
        },
        {
          column: "YearFounded",
          value: YearFounded,
        },
        {
          column: "Address",
          value: Address,
        },
        {
          column: "Description",
          value: Description,
        },
        {
          column: "SchoolLogo",
          value: SchoolLogo,
        },
        {
          column: "SchoolAVP",
          value: SchoolAVP,
        },
        {
          column: "ContactNumber",
          value: ContactNumber,
        },
      ],
    };
    console.log({data, content});
    return
    const response = await new SchoolAPI().create(data);
    if (response.ok) {
      alert("Data added successfully");
    } else {
      alert("Something went wrong while fetching Schools");
    }
  };

  return (
    <Form className='col-lg-8 m-auto' onSubmit={handleSubmit(submit)}>
      <p>Create</p>
      <Form.Group controlId='createItem'>
        <Form.Label>School Name</Form.Label>
        <Form.Control
          {...register("SchoolName")}
          type='text'
          placeholder='Enter School Name'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>Year Founded</Form.Label>
        <Form.Control          {...register("YearFounded")}

          type='number'
          placeholder='Enter Year Founded'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>Address</Form.Label>
        <Form.Control          {...register("Address")}

          type='text'
          placeholder='Enter Address'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>Description</Form.Label>
        <Form.Control {...register("Description")}
          type='text'
          placeholder='Enter Description'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>School Logo</Form.Label>
        <Form.Control
          {...register("SchoolLogo")}
          type='file'
          placeholder='Enter School Logo'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>School AVP</Form.Label>
        <Form.Control {...register("SchoolAVP")}
          type='file'
          placeholder='Enter School AVP'
        />
      </Form.Group>
      <Form.Group controlId='createItem'>
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
        {...register("ContactNumber")}
          type='number'
          placeholder='Enter Contact Number'
        />
      </Form.Group>
      <button
        type="submit"
        className='btn btn-primary btn-School'
      >
        Submit
      </button>
    </Form>
  );
}
