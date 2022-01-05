import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col} from 'react-bootstrap'
import ClassesAPI from './../../../api/ClassesAPI'

function ExamReport({classesModules, setClassesModules, selectedClassId}) {

  const [testPerModule, setTestPerModule] = useState([])

  const getClassTestModules = async(e, moduleId) => {
    console.log(selectedClassId)
    sessionStorage.setItem('testModuleId', moduleId)
    let sessionModuleId = sessionStorage.getItem('testModuleId')
    let response = await new ClassesAPI().getClassTestModules(selectedClassId, sessionModuleId)
    if(response.ok){
      setTestPerModule(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const setModuleId = (e, moduleId) => { 
    sessionStorage.setItem('testModuleId', moduleId)
  }

  return (
    <div>
      <Accordion>
      {classesModules.map(item => {
        return(
          <Accordion.Item eventKey={item.id}>
          <Accordion.Header onClick={(e) => getClassTestModules(e, item.id)}><div className='unit-exam'>{item.moduleName} </div></Accordion.Header>
            <Accordion.Body>
              {testPerModule.map((item, index) => { 
              return(
                <Row>
                  <Col sm={8}>
                    <div className='title-exam'>
                      {item.test.testName}
                    </div>
                    <div className='code-exam'>
                      EQF1
                    </div>
                  </Col>
                  <Col sm={9} className='instruction-exam' >
                    <p>{item.test.testInstructions}</p>
                  </Col>
                  <Col sm={3} className='icon-exam'>
                    <i class="fas fa-eye" style={{paddingRight:'10px'}} ></i>{' '}
                    <i class="fas fa-edit"style={{paddingRight:'10px'}}></i>
                    <i class="fas fa-trash-alt" style={{paddingRight:'10px'}}></i>
                  </Col>
                </Row>
                )
              })
            }
            </Accordion.Body>
          </Accordion.Item>
          )
        })
      }
      </Accordion>
    </div>
  )
}
export default ExamReport
