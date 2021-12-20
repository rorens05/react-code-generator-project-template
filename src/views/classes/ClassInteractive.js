import React, { useState, useEffect } from 'react'
import ClassInteractiveHeader from './components/Interactive/ClassInteractiveHeader'
import { Row, Col, Accordion, Button} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function ClassInteractive({classInfo}) {
  const [module, setModule] = useState([])
  const [interactive, setInteractive] = useState([])
  const courseId = classInfo?.classInformation?.courseId
  const {id} = useParams()

  const getModule = async() =>{
    let response = await new ClassesAPI().getModule(courseId)
    if(response.ok){
        setModule(response.data)
    }else{
      
    }
  }

  useEffect(() => {
    getModule() 
  }, [])

  const getIndteractive = async (e, item) =>{
    let response = await new ClassesAPI().getInteractive(id, item)
    if(response.ok){
      setInteractive(response.data)
    }else{
      
    }
  }

  useEffect(() => {
    getIndteractive()
    
  }, [])

  return (
    <div>
      <ClassInteractiveHeader />
      <Accordion>
        {module.map((item, index) => {
          return ( <Accordion.Item eventKey={index} onClick={(e) => getIndteractive(e, item?.id)} >
          <Accordion.Header>
            <div className='unit-exam'>{item.moduleName}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {interactive.map(interItem =>{
              return( <Row>
                <Col sm={8}>
                  <div className='title-exam'>
                    <Link style={{color:'#EE9337', textDecoration:'none'}} to={interItem?.interactive?.path} >{interItem?.interactive?.interactiveName}</Link>
                  </div>
                </Col>
                <Col sm={9} className='instruction-exam' >
                  <div className='inline-flex'>
                    <div className='text-color-bcbcbc' >
                      Instruction:&nbsp;
                    </div>
                    <div className='text-color-707070' >
                      Count the object. Type the number in the box
                    </div>
                  </div>
                </Col>
                  <Col sm={3} className='icon-exam'>
                    <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                    <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                  </Col>
                  <Col sm={7} className='due-date-discusstion' >
                    <div className='inline-flex'>
                      <div className='text-color-bcbcbc'>
                        Start Date:&nbsp;
                      </div>
                      <div className='text-color-707070'>
                        November 11/10:30AM
                      </div>
                    </div>
                  </Col>
                  <div className='text-color-bcbcbc' >
                  ___________________________________________________________________________________________________________________________________________________________________________________________________________
                  </div>
              </Row>)
            })}
           
          </Accordion.Body>
          </Accordion.Item>)
        })}
       
      </Accordion>
    </div>
  )
}

export default ClassInteractive
