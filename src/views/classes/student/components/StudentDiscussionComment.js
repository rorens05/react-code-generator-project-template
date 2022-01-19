import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import moment from 'moment'
import ClassesAPI from '../../../../api/ClassesAPI'
import { UserContext } from '../../../../context/UserContext'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';


function StudentDiscussionComment({studentCommentToggle, studentCommentModal, comments, discussionId, moduleId, getDiscussionUnit}) {
  const {id} = useParams()
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')

  const handleDeleteNotify = (item) =>{
    getDiscussionUnit(null, moduleId)
    setDeleteNotify(true)
    setItemId(item)
  }

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const deleteComment = async (item) => {
    let classId = id
    let response = await new ClassesAPI().deleteComment(classId, discussionId, item)
      if(response.ok){
        console.log('moduleId:', moduleId)
        getDiscussionUnit(null, moduleId)
        setDeleteNotify(false)
      }else{
        alert(response.data.errorMessage)
      }
  }

  return (
    <div>
      <SweetAlert
        warning
        showCancel
        show={deleteNotify}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => deleteComment(itemId)}
        onCancel={cancelSweetAlert}
        focusCancelBtn
        >
          You will not be able to recover this imaginary file!
      </SweetAlert>
      <Modal  size="lg" show={studentCommentModal} onHide={studentCommentToggle} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header className='class-modal-header' closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" >
          Discussion Comments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>  
      {(studentCommentModal === true)?(<>
        {(comments.map(item => {
          return(
            <>
        <Row>
        <div className='inline-flex' >
        <Col sm={11} className='inline-flex'>
          <InputGroup.Text id="basic-addon2" className="feed-logo"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
          <div className='inline-flex' style={{paddingTop:'12px', fontSize:'18px', color: "#7D7D7D"}}>
          <b>{item?.user?.firstname}&nbsp;{item?.user?.lastname}</b> &nbsp; {moment(item.createdDate).format('ll')}
        </div>
        </Col>
        
        <Col sm={1} style={{paddingTop:'5px', paddingLeft:'15px'}} >
              {(user?.userId === item?.userAccountId)?(
              <>
              <Button onClick={() => handleDeleteNotify(item?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-trash-alt"></i></Button>
              </>
              ):(
              <></>)}
        </Col>
        </div>
        <Col sm={12}>
          <Form.Group className="mb-2">
            <Form.Control defaultValue={item.reply}  as="textarea" rows={2} disabled style={{resize:'none'}}  />
          </Form.Group>
        </Col>
      </Row>
        </>
          )
        }))}
      </>):(<></>)}
      </Form> 
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default StudentDiscussionComment
