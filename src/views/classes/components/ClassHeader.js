import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import CreateClassModal from '../modals/CreateClassModal'


function ClassHeader() {

    const [modal, setModal] = useState(false)

    const toggle = () =>{
        setModal(!modal)
    }

    return (
            <div>
               
                    <div className="row m-b-20">
                            <div className="col-md-10"><h3>Classes <Button Button variant="outline-warning" onClick={() => setModal(true) }> <b> + Create Course </b> </Button></h3>
                            </div>
                    </div>
                    <Form>
                    <Form.Group className="mb-3">
                            <Form.Control className='search'  placeholder="Search here for available classes" />
                    </Form.Group>
                    </Form>
                
                <CreateClassModal toggle={toggle} modal={modal} />

             
            </div>
        )
}
export default ClassHeader

