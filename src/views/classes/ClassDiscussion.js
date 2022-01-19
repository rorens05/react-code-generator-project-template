import React, { useState, useEffect, useContext } from 'react'
import {Row, Col, Accordion, Button, InputGroup, FormControl} from 'react-bootstrap'
import HeaderDiscussion from './components/Discussion/HeaderDiscussion'
import { useParams } from 'react-router'
import ClassesAPI from '../../api/ClassesAPI'
import EditDiscussion from './components/Discussion/EditDiscussion'
import SweetAlert from 'react-bootstrap-sweetalert';
import AssignedDiscussion from './components/Discussion/AssignedDiscussion'
import moment from 'moment'
import EditAssignDiscussion from './components/Discussion/EditAssignDiscussion'
import { UserContext } from '../../context/UserContext'
import StudentDiscussion from './student/StudentDiscussion'
import DiscussionComments from './components/Discussion/DiscussionComments'

function ClassDiscussion({classInfo}) {
  const [discussionCommentModal, setDiscussionCommentModal] = useState(false)
  const [commentAlert, setCommentAlert] = useState(false)
  const [comments, setComments] = useState([])
  const [reply, setReply] = useState('')
  const [modal, setModal] = useState(false)
  const [module, setModule] = useState([])
  const [discussionModule, setdiscussionModule] = useState([])
  const [editDiscussionItem, setEditDiscussionItem] = useState()
  const [moduleId, setModuleId] = useState(null)
  const [deleteNotify, setDeleteNotify] = useState(false)
  const {id} = useParams()
  const courseId = classInfo?.classInformation?.courseId
  const [itemId, setItemId] = useState('')
  const [assignModal, setAssignModal] = useState(false)
  const [editAssignDiscussionItem, setEditAssignDiscussionItem] = useState()
  const [editAssignModal, setEditAssignModal] = useState(false)
  const [discussionId, setDiscussionId] = useState('')
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  const closeNotify = () =>{
    setCommentAlert(false)
  }

  const submitComment = async (e, item) => {
    e.preventDefault()
    let classId = id
    let userAccountId = user?.userId
    let response = await new ClassesAPI().submitComment(classId, item, {userAccountId, reply})
      if(response.ok){
        setCommentAlert(true)
        setReply('')
        getDiscussionUnit(null, moduleId)
      }else{
        alert('No good')
      }
  }

  const discussionCommentToggle = (item, item1) => {
    setComments(item)
    setDiscussionId(item1)
    setDiscussionCommentModal(!discussionCommentModal)
  }

  const assignToggle = (e, item) =>{
    setDiscussionId(item)
    setAssignModal(!assignModal)
  }

  console.log('discussionModule:', discussionModule)

  const editAssignToggle = (e, item) =>{
    setEditAssignDiscussionItem(item)
    setEditAssignModal(!editAssignModal)
  }

  const toggle = (e, item) =>{
    setEditDiscussionItem(item)
    setModal(!modal)
  }

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const handleDeleteNotify = (item) =>{
    setDeleteNotify(true)
    setItemId(item)
  }

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

  const getDiscussionUnit = async(e, item) =>{
    let response = await new ClassesAPI().getDiscussionUnit(id,item)
    if(response.ok){
      setdiscussionModule(response.data)
      setModuleId(item)
    }else{
      alert("Something went wrong while getDiscussionUnit")
    }
    }

    useEffect(() => {
      if(moduleId !== null){
        return(
          getDiscussionUnit() 
        )
      }
      
    }, [])

  const deleteDiscussion = async(e, item) => {
    let response = await new ClassesAPI().deleteDiscussion(item)
    if(response.ok){
      // alert('delete discussion')
      getDiscussionUnit(null, moduleId)
      setDeleteNotify(false)
    }else{
      alert("Something went wrong while Deleting a deleteDiscussion")
    }
  }

  return (
    <>
      <HeaderDiscussion getDiscussionUnit={getDiscussionUnit} module={module} />
        <Accordion>
        <SweetAlert
            warning
            showCancel
            show={deleteNotify}
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={(e) => deleteDiscussion(e, itemId)}
            onCancel={cancelSweetAlert}
            focusCancelBtn
            >
              You will not be able to recover this imaginary file!
          </SweetAlert>
        {module.map((item, index) =>{
          return (
            <Accordion.Item eventKey={index} onClick={(e) => getDiscussionUnit(e, item?.id)}>
            <Accordion.Header><div style={{fontSize:'20px'}}>{item.moduleName}</div></Accordion.Header>
            <Accordion.Body>
              {(user?.teacher === null)?(
              <>
                <StudentDiscussion moduleId={moduleId} getDiscussionUnit={getDiscussionUnit} discussionModule={discussionModule} />
              </>
              ):(
              <>
              {discussionModule?.map(moduleitem => {
                return (
                  <Row>
                    <Col sm={8}>
                      <div className='title-exam'>
                        {moduleitem?.discussion?.discussionName}
                      </div>
                    </Col>
                    <Col sm={9} className='instruction-exam' >
                      <div className='inline-flex'>
                        <div className='text-color-bcbcbc' >
                          Instruction:&nbsp;{moduleitem?.instructions}
                        </div>
                        <div className='text-color-707070' >
                        <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:moduleitem?.discussion?.instructions }} />
                        </div>
                      </div>
                    </Col>
                    {moduleitem.discussion?.classId?(
                    <Col sm={3} className='icon-exam'>
                        {/* <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button> */}
                        <Button onClick={(e)=> toggle(e, moduleitem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-edit"></i></Button>
                        {moduleitem.discussionAssignment?.startDate?(
                          <>
                            <Button onClick={(e) => editAssignToggle(e, moduleitem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-clock"></i></Button>
                          </>
                        ):
                          <>
                            <Button onClick={(e) => assignToggle(e, moduleitem?.discussion?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                          </>
                        }
                        <Button onClick={() => handleDeleteNotify(moduleitem.discussion?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-trash-alt"></i></Button>
                      </Col>
                      ):
                      <>
                      {moduleitem.discussionAssignment?.startDate?(
                      <>
                      <Col sm={3} className='icon-exam'>
                        {/* <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button> */}
                        <Button onClick={(e) => editAssignToggle(e, moduleitem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-clock"></i></Button>
                      </Col>
                      </>
                      ):
                      <>
                      <Col sm={3} className='icon-exam'>
                        {/* <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button> */}
                        <Button onClick={(e) => assignToggle(e, moduleitem?.discussion?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                      </Col>
                      </>
                      }
                      </>
                    }
                    {moduleitem.discussionAssignment?.startDate?(
                  <div>
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(moduleitem?.discussionAssignment?.startDate + ' ' + moduleitem?.discussionAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&  
                    
                     <div style={{color:'#EE9337', fontSize:'15px'}}><b>Upcoming</b></div>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(moduleitem?.discussionAssignment?.endDate + ' ' + moduleitem?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b></div>
                    }
                    {
                       moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isSame(moment(moduleitem?.discussionAssignment?.startDate + ' ' + moduleitem?.discussionAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                       <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(moduleitem?.discussionAssignment?.startDate + ' ' + moduleitem?.discussionAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(moduleitem?.discussionAssignment?.endDate + ' ' + moduleitem?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <>
                      <div className='inline-flex'>
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing &nbsp; </b></div>
                      <div style={{paddingBottom:'15px'}} >
                      <Button onClick={() => discussionCommentToggle(moduleitem?.responses, moduleitem?.discussionAssignment?.discussionId)} className="m-r-5 color-white tficolorbg-button" size="sm">Comments&nbsp;{moduleitem.responseCount}</Button>
                      </div>
                      
                      </div>
                      <>
                      <br />
                      <InputGroup size="sm">
                        <FormControl onChange={(e) => setReply(e.target.value)} value={reply} aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Reply" />
                        <InputGroup.Text onClick={(e) => submitComment(e, moduleitem?.discussion?.id)}  id="basic-addon2" className="comment-btn"><i className="fas fa-paper-plane"></i></InputGroup.Text>
                      </InputGroup><br />
                      </>
                      </> 
                    }                
                  <Row>
                  <Col sm={7} className='due-date-discusstion' >
                     <div className='inline-flex'>
                       <div className='text-color-bcbcbc'>
                         Start Date:&nbsp;
                       </div>
                       <div className='text-color-707070'>
                         {moment(moduleitem?.discussionAssignment?.startDate).format('LL')}&nbsp;
                       </div>
                       <div className='text-color-bcbcbc'>
                         Start Time:&nbsp;
                       </div>
                       <div className='text-color-707070'>
                         {moduleitem?.discussionAssignment?.startTime}
                       </div>
                     </div>
                   </Col>
                   <Col className='posted-date-discusstion'>
                     <div className='inline-flex'>
                       <div className='text-color-bcbcbc'>
                         End Date:&nbsp;
                       </div>
                       <div className='text-color-707070'>
                       {moment(moduleitem?.discussionAssignment?.endDate).format('LL')}&nbsp;
                       </div>
                       <div className='text-color-bcbcbc'>
                         End Time:&nbsp;
                       </div>
                       <div className='text-color-707070'>
                         {moduleitem?.discussionAssignment?.endTime}
                         
                       </div>
                     </div>
                   </Col>
                   <div className='text-color-bcbcbc' >
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                    </div>
                 </Row>
                 </div>):
                  <div>
                    <div style={{color:'red'}}>
                        <b>Not Assigned</b>
                    </div>
                  <div className='text-color-bcbcbc' >
                  ___________________________________________________________________________________________________________________________________________________________________________________________________________
                  </div>
                </div> 
                    }
              </Row>
                 )})}
              </>
              )}
              </Accordion.Body>
              </Accordion.Item>
            )
          })}
          </Accordion>
          <SweetAlert 
            success
            show={commentAlert} 
            title="Done!" 
            onConfirm={closeNotify}>
        </SweetAlert>
          <DiscussionComments getDiscussionUnit={getDiscussionUnit} moduleId={moduleId} discussionId={discussionId} comments={comments} discussionCommentToggle={discussionCommentToggle} discussionCommentModal={discussionCommentModal} />
          <EditDiscussion editDiscussionItem={editDiscussionItem} toggle={toggle} modal={modal} getDiscussionUnit={getDiscussionUnit} /> 
          <AssignedDiscussion moduleId={moduleId} getDiscussionUnit={getDiscussionUnit} discussionId={discussionId} assignToggle={assignToggle} assignModal={assignModal} />
          <EditAssignDiscussion getDiscussionUnit={getDiscussionUnit} editAssignDiscussionItem={editAssignDiscussionItem} editAssignToggle={editAssignToggle} editAssignModal={editAssignModal} />
       </>
    )
  }
export default ClassDiscussion