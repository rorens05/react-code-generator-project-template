import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import SchoolAPI from '../../../api/SchoolAPI'
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from "react-toastify";

export default function SchoolTeacher() {

  const [teachers, setTeachers ] = useState([]);
  const [ resetNotify, setResetNotify ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toResetId, setToResetId] = useState('');
  
	useEffect(() => {
    handleGetAllTeachers()
  }, [])

  const handleResetPassword = async() => {
    let response = await new SchoolAPI().resetDefaultPassword(toResetId);
    if(response.ok){
      toast.success("Password reset!")
    }else{
      toast.error("Something went wrong while reseting teacher's password.")
    }
    setResetNotify(false);
  }

  const handleClikedReset = (id) => {
    console.log(id)
    setResetNotify(true);
    setToResetId(id)
  }

  const handleGetAllTeachers = async() => {
    let response = await new SchoolAPI().getAllTeacher();
    if(response.ok){
      setTeachers(response.data)
      console.log(response.data)
    }else{
      toast.error("Something went wrong while fetching exam information")
    }
    console.log(response)
  }
  return (
    <>
    {/* <p>sample</p> */}
    <span className='m-t-5'>Teachers List</span> | <input type="checkbox" id={'cboxspassword'} name={'cboxspassword'} checked={showPassword} onChange={() => setShowPassword(!showPassword) } />
                                                <label className="form-check-label" for={'cboxspassword'} >Show passwords</label>
      <ReactTable pageCount={100}
        list={teachers}
        filterable
        data={teachers}
        columns={[{
          Header: '',
          columns:
          // Start Columns
          [
            {
              Header: 'Username',
              id: 'username',
              accessor: d => d.username,
            },
            {
              Header: 'Password',
              id: 'password',
              accessor: 
              showPassword ?
              d => <input type="text" className="form-control form-control-lg" placeholder="Password" name="password" value={d.password} required disabled />
              :
              d => <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={d.password} required disabled />
            },
            {
              Header: 'Actions',
              id: 'edit',
              accessor: d => d.id,
              Cell: row => (
                <div className="">
                    <button onClick={() => {
                        this.setState(row.original);
                        this.toggleModal("modalMessage", row.original.id);
                    }}
                        className="btn btn-info btn-sm m-r-5"
                    >
                        Change Password
                    </button>
                    {/* //'info', row.original.id) */}
                    <button onClick={() => handleClikedReset(row.original.id)} className="btn btn-warning btn-sm m-r-5">
                      Reset Password
                    </button>
                </div>
              )
            }
          ]
        }]}
      csv edited={teachers} defaultPageSize={10} className="-highlight" 
      />
      <SweetAlert 
        showCancel
        show={resetNotify} 
        onConfirm={()=> handleResetPassword()}
        confirmBtnText="Yes, Reset password!"
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="error"
        title="Are you sure?"
        onCancel={() => setResetNotify(false)}
      >
        Are you sure? resetting this password!
      </SweetAlert>
    </>
  )
}
