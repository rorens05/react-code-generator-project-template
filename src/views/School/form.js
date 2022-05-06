

import React, {  } from "react";
import { Form } from "react-bootstrap";
import SchoolAPI from "../../api/SchoolAPI";
import toBase64 from "../../utils/toBase64";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function SchoolNew() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const history = useHistory();

  const submit = async (content) => {
    let data = {
      tableName: "School",
      columnValues: [
        {
          column: "ID",
          value: content.ID,
        },
        
        {
          column: "SchoolName",
          value: content.SchoolName,
        },
        
        {
          column: "YearFounded",
          value: content.YearFounded,
        },
        
        {
          column: "Address",
          value: content.Address,
        },
        
        {
          column: "Description",
          value: content.Description,
        },
        
        {
          column: "ContactNumber",
          value: content.ContactNumber,
        },
        
        {
          column: "CreatedBy",
          value: content.CreatedBy,
        },
        
        {
          column: "CreatedDate",
          value: content.CreatedDate,
        },
        
        {
          column: "UpdatedBy",
          value: content.UpdatedBy,
        },
        
        {
          column: "UpdatedDate",
          value: content.UpdatedDate,
        },
        
        {
          column: "Deleted",
          value: content.Deleted,
        },
        
        {
          column: "SchoolLogo",
          value: content.SchoolLogo,
        },
        
        {
          column: "SchoolAVP",
          value: content.SchoolAVP,
        },
        ],
    };
    const response = await new SchoolAPI().create(data);
    if (response.ok) {
      alert("Data added successfully");
      history.push("/School");
    } else {
      alert("Something went wrong while fetching Schools");
    }
  };

  return (
    <Form className='col-lg-8 m-auto' onSubmit={handleSubmit(submit)}>
      <p>Create School</p>
        <Form.Group controlId='createItem'>
          <Form.Label>ID</Form.Label>
          <Form.Control
            {...register("ID")}
            type='text'
            placeholder='Enter ID'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>SchoolName</Form.Label>
          <Form.Control
            {...register("SchoolName")}
            type='text'
            placeholder='Enter SchoolName'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>YearFounded</Form.Label>
          <Form.Control
            {...register("YearFounded")}
            type='text'
            placeholder='Enter YearFounded'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            {...register("Address")}
            type='text'
            placeholder='Enter Address'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            {...register("Description")}
            type='text'
            placeholder='Enter Description'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>ContactNumber</Form.Label>
          <Form.Control
            {...register("ContactNumber")}
            type='text'
            placeholder='Enter ContactNumber'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>CreatedBy</Form.Label>
          <Form.Control
            {...register("CreatedBy")}
            type='text'
            placeholder='Enter CreatedBy'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>CreatedDate</Form.Label>
          <Form.Control
            {...register("CreatedDate")}
            type='text'
            placeholder='Enter CreatedDate'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>UpdatedBy</Form.Label>
          <Form.Control
            {...register("UpdatedBy")}
            type='text'
            placeholder='Enter UpdatedBy'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>UpdatedDate</Form.Label>
          <Form.Control
            {...register("UpdatedDate")}
            type='text'
            placeholder='Enter UpdatedDate'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>Deleted</Form.Label>
          <Form.Control
            {...register("Deleted")}
            type='text'
            placeholder='Enter Deleted'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>SchoolLogo</Form.Label>
          <Form.Control
            {...register("SchoolLogo")}
            type='text'
            placeholder='Enter SchoolLogo'
          />
        </Form.Group>
        
        <Form.Group controlId='createItem'>
          <Form.Label>SchoolAVP</Form.Label>
          <Form.Control
            {...register("SchoolAVP")}
            type='text'
            placeholder='Enter SchoolAVP'
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
  

  