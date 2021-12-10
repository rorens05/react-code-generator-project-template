import React, {useState, useEffect} from 'react'
import { Form, Row, Col, NavItem } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'

export default function ClassLearnHeader({classInfo}) {
  const courseId = classInfo?.classInformation?.courseId
  const [selectedModuleId, setSelectedModuleId] = useState(null)
  const [modules, setModules] = useState([])
  const [pageId, setPageId] = useState([])
  const {id} = useParams()

  const [Pages, setPages] = useState([])
  const [content, setContent] = useState([])
  const [selectedUnit, setSelectedUnit] = useState([])
  
  const getModules = async() => {
    let response = await new ClassesAPI().getModule(courseId)
    if(response.ok){
      setModules(response.data)
    }else{
      alert("Something went wrong while fetching all modules")
    }
  }

  useEffect(() => {
    getModules()
  }, [])

  const handleSelectedUnit = (e, item) => {
      e.preventDefault()
      setSelectedUnit(item)
  }

  const getPages = async(moduleId) => {
    let response = await new ClassesAPI().getPages(id, moduleId)
    if(response.ok){
      setPages(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }


  const onModuleChange = (e) => {
    setSelectedModuleId(e.target.value)
    if(e.target.value == null || e.target.value == ""){
      setPages([])
    }else{
      getPages(e.target.value)
      
    }
  }

  const onShowPage = (e) => {
    setPageId(e.target.value)
    if(e.target.value == null || e.target.value == ""){
      setPageId([])
    }else{
     
      getContent(e.target.value)
      
    }
  }

  console.log('moduleId:',selectedModuleId)

  const getContent = async(pageId) => {
    let mId = selectedModuleId
    console.log('pageId:',pageId)
    let response = await new ClassesAPI().getContent(id, mId, pageId)
    if(response.ok){
      setContent(response.data)
      console.log(response.data)
    }else{
      
    }
  }

  useEffect(() => {
    getContent()
  }, [])
console.log('this is Content:', content)
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
        <Form.Select onChange={onModuleChange} aria-label="Default select example">
        <option value="">--SELECT UNIT--</option>
          {modules.map(item =>{
            return (<option value={item?.id} > {item?.moduleName}</option>)
          })}
        </Form.Select>
        </Col>
        <Col sm={1} style={{textAlign:'center', fontSize:'20px', paddingTop:'4px', color:'#7D7D7D'}}>
        <Form.Label>Pages</Form.Label>
        </Col>
        <Col>
        <Form.Select onChange={onShowPage} aria-label="Default select example">
        <option value=""></option>
          {Pages.map(item =>{
            return (<option value={item?.id}> {item?.pageName}</option>)
          })}
        </Form.Select>
        </Col>
      </Row>{content.content?(
        
        <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:content.content + '<br>' }} />
      ):<span></span>
      }
      
    </div>
  )
}