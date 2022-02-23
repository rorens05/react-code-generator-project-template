import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Row,Col} from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';
import ActivitiesPortFolio from './ActivitiesPortFolio'
import GeneralInfoPortfolio from './GeneralInfoPortfolio'
import ClassesPortfolio from './ClassesPortfolio'

function StudentPortfolio({openPortfolioModal, openPortfolioToggle}) {
  const [openPortfolioActivities, setOpenPortfolioActivities] = useState(true)
  const [openPortfolioGeneral, setOpenPortfolioGenera] = useState(false)
  const [openPortfolioClasses, setOpenPortfolioClasses] = useState(false)

  const handleOpenPortfolioGeneral = () =>{
    setOpenPortfolioGenera(true)
    setOpenPortfolioActivities(false)
    setOpenPortfolioClasses(false)
  }
  const handleOpenPortfolioActivety = () =>{
    setOpenPortfolioActivities(true)
    setOpenPortfolioGenera(false)
    setOpenPortfolioClasses(false)
  }

  const handleOpenPortfolioClasses = () =>{
    setOpenPortfolioClasses(true)
    setOpenPortfolioGenera(false)
    setOpenPortfolioActivities(false)
  }

  return (
    <div>
      <Modal  size="lg" show={openPortfolioModal} onHide={openPortfolioToggle} aria-labelledby="example-modal-sizes-title-lg">
        <div className='portfolio-profile'> 
          <i class="fas fa-user-circle fas-1x" ></i><br />
        </div>
         <div className='portfolio-name'>
         <p><b>Gil Christian Parayno</b></p>
         </div>
          
          <p style={{fontSize:'24px', textAlign:'center', color:'#EE9337', fontFamily:'Segou UI'}}>Grade 1 - Faith</p>
        <Modal.Body>
        <Row>
        <Col style={{textAlign:'center', paddingBottom:'20px'}}>
          <Button onClick={() => handleOpenPortfolioActivety()} className='btn-portfolio'  size='lg' variant="outline-warning">Activities</Button>
          <Button onClick={() => handleOpenPortfolioGeneral()}  className='btn-portfolio'   size='lg' variant="outline-warning">General Information</Button>
          <Button onClick={() => handleOpenPortfolioClasses()}  className='btn-portfolio'   size='lg' variant="outline-warning">Classes</Button>
        </Col>
          {openPortfolioActivities === false?(<></>):<ActivitiesPortFolio />}
          {openPortfolioGeneral === false?(<></>):<GeneralInfoPortfolio />}
          {openPortfolioClasses === false?(<></>):<ClassesPortfolio />}
        </Row>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default StudentPortfolio