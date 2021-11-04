import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import EditClassModal from '../modals/EditClassModal'

function ClassCard() {

    const [modal, setModal] = useState(false)

    const toggle = () =>{
        setModal(!modal)
    }


    return (
           
              <div>  
                    <Card style={{borderRadius:'0.9rem', boxShadow:'1px 2px 5px 1px #eeeeee', marginRight: '55px', marginBottom: '25px'}} >
                        <Card.Header style={{backgroundColor:"#ee9337", height:"125px", borderRadius: '15px 15px 0px 0px', }}>
                            <div className="row" style={{color:"white"}}>
                                <div className="col-md-6" style={{paddingTop:'10px'}}>
                                    FXC57
                                </div>
                                <div className="col-md-6" style={{textAlign:"right", paddingTop: '10px'}}>
                                   <i className="fa fa-ellipsis-v fa-2x">  <Button onClick={() => setModal(true)} variant="warning" size="sm"> Edit</Button> </i>
                                </div>
                                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '5px'}}>
                                   <h6><b> Grade 1 - Faith</b> </h6>
                                   <h7>Math 1 </h7>
                                </div>
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-6" style={{textAlign:"center", marginTop:20}}>
                                    <i className="fa fa-book-open fa-7x"></i>
                                </div>
                                <div className="col-md-3">
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title tag="h5" style={{color: '#7D7D7D'}}>
                                Due Tomorrow
                            </Card.Title>
                            <Card.Subtitle
                                
                                tag="h6"
                                style={{color: '#BCBCBC'}}
                            >
                               <p> Oct 01 2021 </p>
                            </Card.Subtitle>
                            <Card.Text style={{ color: '#EE9337'}} >
                                <p>Assignment #1 <br />
                                Test #1</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>




                    
                  
                    <EditClassModal modal={modal} toggle={toggle} />
                    </div> 
    )
}

export default ClassCard
