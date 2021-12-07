import React, {useState, useEffect} from 'react'
import { Form, Row, Col, NavItem } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'

export default function ClassLearnHeader({classInfo}) {
  console.log(classInfo?.classInformation?.courseId)
  const [Learn, setlearn] = useState([])
  const [moduleId, setModuleId] = useState('')
  const {id} = useParams()

  const getLearn = async() => {
    let response = await new ClassesAPI().getLearn(classInfo?.classInformation?.courseId)
    if(response.ok){
      setlearn(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getLearn()
  }, [])

  const [Pages, setPages] = useState([])
  const [selectedUnit, setSelectedUnit] = useState([])
  const handleSelectedUnit = (e, item) => {
      e.preventDefault()
      setSelectedUnit(item)
  }

  const getPages = async(e) => {
    let response = await new ClassesAPI().getPages(id,Learn.id)
    if(response.ok){
      setPages(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getPages()
  }, [])

  return (
    <div>
      <div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Learn </h1>
				</div>
			</div>
      <Row>
        <Col sm={1} style={{textAlign:'center', fontSize:'20px', paddingTop:'4px', color:'#7D7D7D'}}>
        <Form.Label>Unit 1</Form.Label>
        </Col>
        <Col>
        <Form.Select  aria-label="Default select example">
        <option>--SELECT UNIT--</option>
          {Learn.map(item =>{
            return (<option value={item?.id}> {item?.moduleName}</option>)
          })}
        </Form.Select>
        </Col>
        <Col sm={1} style={{textAlign:'center', fontSize:'20px', paddingTop:'4px', color:'#7D7D7D'}}>
        <Form.Label>Pages</Form.Label>
        </Col>
        <Col>
        <Form.Select aria-label="Default select example">
          <option></option>
          {Pages.map(item =>{
            return (<option value={item?.courseId}> {item?.id}</option>)
          })}
        </Form.Select>
        </Col>
      </Row>
    </div>
  )
}