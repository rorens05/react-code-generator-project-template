import React from 'react'
import { Accordion, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import ClassesAPI from '../../../../api/ClassesAPI'

function AccordionConference({conference, getConfe, setOpenEditModal, setEditLinks}) {
  const {id} = useParams()
  console.log(conference)

  const handleOpeEditModal = (e, item) => {
    e.preventDefault()
    setEditLinks(item)
    setOpenEditModal(true)
    
  }

  const deleteConference = async(e, item) => {
    let response = await new ClassesAPI().deleteLinks(id, item)
    if(response.ok){
      alert('Conference Deleted')
      getConfe()
    }else{
      alert("Something went wrong while fetching all Conference")
      
    }
  }

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className='unit-exam'>
            Conference 
          </div>
        </Accordion.Header>
        <Accordion.Body>
        {conference.map(item => {
          return ( 
            <Row>
              <Col sm={9}>
                <div className='title-exam'>
                  <Link style={{color:'#EE9337', textDecoration:'none'}} to={item?.url}>  {item?.description} </Link>
                </div>
              </Col>
              <Col sm={3} className='icon-exam'>
                  <Button onClick={(e) => handleOpeEditModal(e, item)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-edit"></i></Button>
                  <Button onClick={(e) => deleteConference(e, item?.classLink.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i> </Button>
              </Col>
              <Col sm={9}>
              </Col>
                <Col sm={3} style={{textAlign:'right'}} className='due-date-discusstion' >
                  <div className='inline-flex'>
                    <div className='text-color-bcbcbc'>
                      Post Date: {item?.classLink.createdDate}
                    </div>
                  </div>
                </Col>
                <div className='text-color-bcbcbc' >
                ___________________________________________________________________________________________________________________________________________________________________________________________________________
                </div>
            </Row>)
          })}
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default AccordionConference
