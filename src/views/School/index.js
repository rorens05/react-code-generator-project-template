
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SchoolAPI from "../../api/SchoolAPI";
import FullScreenLoader from "../../components/loaders/FullScreenLoader";
import toBase64 from "../../utils/toBase64";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SchoolIndex() {
  const [Schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    const response = await new SchoolAPI().index();
    if (response.ok) {
      setSchools(response.data.list);
    } else {
      alert("Something went wrong while fetching Schools");
    }
    setLoading(false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const fetchById = async () => {
    setLoading(true);
    const response = await new SchoolAPI().show(selectedId);
    if (response.ok) {
      let infoData = response.data;
      setSelectedData(infoData);
      console.log({ response });
      
        setValue("ID", infoData.ID);
        
        setValue("SchoolName", infoData.SchoolName);
        
        setValue("YearFounded", infoData.YearFounded);
        
        setValue("Address", infoData.Address);
        
        setValue("Description", infoData.Description);
        
        setValue("ContactNumber", infoData.ContactNumber);
        
        setValue("CreatedBy", infoData.CreatedBy);
        
        setValue("CreatedDate", infoData.CreatedDate);
        
        setValue("UpdatedBy", infoData.UpdatedBy);
        
        setValue("UpdatedDate", infoData.UpdatedDate);
        
        setValue("Deleted", infoData.Deleted);
        
        setValue("SchoolLogo", infoData.SchoolLogo);
        
        setValue("SchoolAVP", infoData.SchoolAVP);
        
    } else {
      alert("Something went wrong while fetching Schools");
    }
    setLoading(false);
  };

  const create = async (content) => {
    let data = {
      tableName: "School",
      columnValues: [
      {
        column: "SchoolName",
        value: content.SchoolName ,
      },
      
      {
        column: "YearFounded",
        value: content.YearFounded ,
      },
      
      {
        column: "Address",
        value: content.Address ,
      },
      
      {
        column: "Description",
        value: content.Description ,
      },
      
      {
        column: "ContactNumber",
        value: content.ContactNumber ,
      },
      
      {
        column: "CreatedBy",
        value: content.CreatedBy ,
      },
      
      {
        column: "CreatedDate",
        value: content.CreatedDate ,
      },
      
      {
        column: "UpdatedBy",
        value: content.UpdatedBy ,
      },
      
      {
        column: "UpdatedDate",
        value: content.UpdatedDate ,
      },
      
      {
        column: "Deleted",
        value: content.Deleted ,
      },
      
      {
        column: "SchoolLogo",
        value: (await toBase64(content.SchoolLogo[0]))?.base64String ,
      },
      
      {
        column: "SchoolAVP",
        value: (await toBase64(content.SchoolAVP[0]))?.base64String ,
      },
      ],
    };
    console.log(data);
    const response = await new SchoolAPI().create(data);
    if (response.ok) {
      toast.success("Data was created successfully");
      setModalVisible(false);
      fetchSchools();
    } else {
      alert("Something went wrong while fetching Schools");
    }
  };

  const update = async (content) => {
    setLoading(true);
    console.log({content})
    let data = {
      id: selectedId,
      tableName: "School",
      columnValues: [
      {
        column: "SchoolName",
        value: content.SchoolName ,
      },
      
      {
        column: "YearFounded",
        value: content.YearFounded ,
      },
      
      {
        column: "Address",
        value: content.Address ,
      },
      
      {
        column: "Description",
        value: content.Description ,
      },
      
      {
        column: "ContactNumber",
        value: content.ContactNumber ,
      },
      
      {
        column: "CreatedBy",
        value: content.CreatedBy ,
      },
      
      {
        column: "CreatedDate",
        value: content.CreatedDate ,
      },
      
      {
        column: "UpdatedBy",
        value: content.UpdatedBy ,
      },
      
      {
        column: "UpdatedDate",
        value: content.UpdatedDate ,
      },
      
      {
        column: "Deleted",
        value: content.Deleted ,
      },
      
      {
        column: "SchoolLogo",
        value: (await toBase64(content.SchoolLogo[0]))?.base64String == null ? selectedData.SchoolLogo : await toBase64(content.SchoolLogo[0])?.base64String ,
      },
      
      {
        column: "SchoolAVP",
        value: (await toBase64(content.SchoolAVP[0]))?.base64String == null ? selectedData.SchoolAVP : await toBase64(content.SchoolAVP[0])?.base64String ,
      },
      ],
    };
    console.log(data);
    const response = await new SchoolAPI().update(selectedId, data);
    if (response.ok) {
      toast.success("Data was updated successfully");
      setModalVisible(false);
      fetchSchools();
    } else {
      alert("Something went wrong while updating Schools");
    }
    setLoading(false);
  };

  const showModal = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const hideModel = () => {
    setSelectedId(null);
    setModalVisible(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await new SchoolAPI().destroy(selectedId);
    if (response.ok) {
      toast.success("Data was deleted successfully");
      setModalVisible(false);
      fetchSchools();
    } else {
      toast.error("Something went wrong while deleting School");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedId != null) {
      fetchById();
    }else{
      reset()
    }
  }, [selectedId]);

  return (
    <div className='index-container School-index-container '>
      {loading && <FullScreenLoader />}
      <Button
        onClick={() => showModal()}
        className='btn btn-primary btn-School'
      >
        Add School
      </Button>
      <div className='table-container school-table-container'>
        <table className='table generated-table School-table'>
          <thead>
            <tr>
            
              <th>ID</th>
              <th>SchoolName</th>
              <th>YearFounded</th>
              <th>Address</th>
              <th>Description</th>
              <th>ContactNumber</th>
              <th>CreatedBy</th>
              <th>CreatedDate</th>
              <th>UpdatedBy</th>
              <th>UpdatedDate</th>
              <th>Deleted</th>
              <th>SchoolLogo</th>
              <th>SchoolAVP</th>
            </tr>
          </thead>
          <tbody>
            {Schools.map((School) => (
              <tr key={School.ID} onClick={() => showModal(School.ID)}>
                
          <td>{School["ID"]}</td>
          <td>{School["SchoolName"]}</td>
          <td>{School["YearFounded"]}</td>
          <td>{School["Address"]}</td>
          <td>{School["Description"]}</td>
          <td>{School["ContactNumber"]}</td>
          <td>{School["CreatedBy"]}</td>
          <td>{School["CreatedDate"]}</td>
          <td>{School["UpdatedBy"]}</td>
          <td>{School["UpdatedDate"]}</td>
          <td>{School["Deleted"]}</td>
          <td><img src={School["SchoolLogo"]} /></td>
          <td><img src={School["SchoolAVP"]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        size='lg'
        className="generated-modal student-form-modal"
        show={modalVisible}
        onHide={() => hideModel()}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='col-lg-8 m-auto'
            onSubmit={handleSubmit(selectedId == null ? create : update)}
          >
            <p>Create School</p>
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
                type='number'
                placeholder='Enter CreatedBy'
              />
            </Form.Group>
            
            <Form.Group controlId='createItem'>
              <Form.Label>CreatedDate</Form.Label>
              <Form.Control
                {...register("CreatedDate")}
                type='date'
                placeholder='Enter CreatedDate'
              />
            </Form.Group>
            
            <Form.Group controlId='createItem'>
              <Form.Label>UpdatedBy</Form.Label>
              <Form.Control
                {...register("UpdatedBy")}
                type='number'
                placeholder='Enter UpdatedBy'
              />
            </Form.Group>
            
            <Form.Group controlId='createItem'>
              <Form.Label>UpdatedDate</Form.Label>
              <Form.Control
                {...register("UpdatedDate")}
                type='date'
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
                type='file'
                placeholder='Enter SchoolLogo'
              />
            </Form.Group>
            
            <Form.Group controlId='createItem'>
              <Form.Label>SchoolAVP</Form.Label>
              <Form.Control
                {...register("SchoolAVP")}
                type='file'
                placeholder='Enter SchoolAVP'
              />
            </Form.Group>
            
            <button type='submit' className='btn btn-primary btn-School'>
              Submit
            </button>
            {selectedId != null && (
              <button
                onClick={(e) => handleDelete(e)}
                className='btn btn-danger btn-School'
              >
                Delete
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
  
  
  