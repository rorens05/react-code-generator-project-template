import React, { useState, useEffect, useContext } from 'react'
import {Card, InputGroup, FormControl, Row, Col,Button, Form} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';
import EditAnnouncement from './components/Feed/EditAnnouncement';
import moment from 'moment';
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-toastify';

function ClassFeed() {
  const [title, setTitle] = useState('Feed')
  const [content, setContent] = useState('')
  const [announcementItem, setAnnouncementItem] = useState([])
  const id = window.location.pathname.split('/')[2];
  const [referenceIds, setReferenceIds] = useState([id])
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')
  const [addNotify, setAddNotity] = useState(false)
  const [editAnnouncementModal, setEditAnnouncementModal] = useState(false)
  const [editAnnouncementItem, setEditAssignAssignmentItem] = useState()
  const [feedClass, setFeedClass] = useState([])
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  const closeNotify = () =>{
    setAddNotity(false)
  }

  const openEditAnnouncementToggle = (item) =>{
    setEditAssignAssignmentItem(item)
    setEditAnnouncementModal(!editAnnouncementModal)
  }
 const params = window.location.pathname.split('/')[2];
  console.log('openedit:', id, params.split('/')[2], params, '//////////////')
  
  const createAnnouncementClass = async (e) => {
    e.preventDefault()
    let typeId = 3
    let useraccountId = 0
    let status = true
    let response = await new ClassesAPI().createAnnouncementClass(typeId, {announcement:{content, title, useraccountId, status}, referenceIds:referenceIds})
      if(response.ok){
        // alert('wawawee')
        setAddNotity(true)
        setContent('')
        getFeedClass()
      }else{
        alert(response.data.errorMessage)
      }
  }



  const getFeedClass = async () => {
    console.log(id, 'classssssssss')
    let response = await new ClassesAPI().getFeedClass(id)
    if(response.ok){
    setFeedClass(response.data)
  }else{
    alert(response.data.errorMessage)
   }
  }
  useEffect(() => {
    getFeedClass();
  }, [])

  console.log('feed:', feedClass)

  const deleteAnnouncement = async (item) => {
    let response = await new ClassesAPI().deleteAnnouncement(item)
    if(response.ok){
      // alert('Deleted')
      getFeedClass()
      setDeleteNotify(false)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const handleDeleteNotify = (item) =>{
    setDeleteNotify(true)
    setItemId(item)
  }

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  console.log('this is announcement:', announcementItem)

  return (
    <div>
      <SweetAlert
          warning
          showCancel
          show={deleteNotify}
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => deleteAnnouncement(itemId)}
          onCancel={cancelSweetAlert}
          focusCancelBtn
            >
              You will not be able to recover this imaginary file!
        </SweetAlert>
        {(user?.teacher === null)?(
        <></>
        ):(
        <>
          <Card className='calendar-card'>
            <Card.Body>
            <Form onSubmit={createAnnouncementClass}>
            <InputGroup  size="lg">
              <InputGroup.Text id="basic-addon2" className="feed-button"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
                <FormControl onChange={(e) => setContent(e.target.value)} value={content} className='feed-box'  aria-label="small" aria-describedby="inputGroup-sizing-sm" placeholder="Type an Announcement for the class here" type="text"/> 
            </InputGroup>
            <div style={{textAlign:'right', paddingTop:'15px'}}>
            <Button className='tficolorbg-button' type='submit' >POST</Button>
            </div>
            </Form>
            </Card.Body>
        </Card>
        </>
        )}
    
    {}
    {feedClass?.map(item => {
      return(
        <>
        <div className='post-date' style={{paddingButton:''}}>
        <p>{moment(item?.dateUpdated).format('LL')}&nbsp;</p> 
         </div>

        {item?.feedInformations.map(feedItem =>{
          return(
          <>{(feedItem.type === 1)?(
          <>
          <Card className='post-card'>
            <Card.Body>
            {/* <div className='inline-flex'>
              <div>
              <InputGroup.Text id="basic-addon2" className="feed-logo"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
              </div>
              <div className='inline-flex' style={{paddingTop:'12px', fontSize:'18px', color: "#7D7D7D"}}>
              <b>{feedItem?.updatedBy}</b> &nbsp; has Post an <div style={{color:'#EE9337'}} > &nbsp; <b>Announcement </b> </div>
              </div>
              {(user?.teacher === null)?(
                <>
                </>):(
                <>
                  <div className='inline-flex' style={{paddingTop:'20px', paddingTop:'6px', float:'right', paddingLeft:'685px'}}>
                    <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}>            
                      <Button onClick={() => openEditAnnouncementToggle(feedItem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-pencil-alt"></i>&nbsp; Edit Post</Button>
                      </div>
                      <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
                      <Button onClick={() => handleDeleteNotify(feedItem?.referenceId)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="far fa-trash-alt"></i>&nbsp; Remove Post</Button>
                    </div> 
                  </div>
                </>)}
            </div> */}
            <Row>  
                <Col className='icon-post'>
                  <div className='inline-flex' >
                  <InputGroup.Text id="basic-addon2" className="feed-logo"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
                 </div>
                 <div className='inline-flex' style={{paddingTop:'1px', fontSize:'18px', color: "#7D7D7D"}}>
              <b>{feedItem?.updatedBy}</b> &nbsp; has Post an <div style={{color:'#EE9337'}} > &nbsp; <b>Announcement </b> </div>
              </div>
            
              {(user?.teacher === null)?(<></>):(<>
                <div className='inline-flex' style={{paddingTop:'20px', paddingTop:'6px', float:'right', }}>
                    <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}>            
                      <Button onClick={() => openEditAnnouncementToggle(feedItem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-pencil-alt"></i>&nbsp; Edit Post</Button>
                      </div>
                      <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
                      <Button onClick={() => handleDeleteNotify(feedItem?.referenceId)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="far fa-trash-alt"></i>&nbsp; Remove Post</Button>
                    </div> 
                  </div>
              </>)}
              </Col>
              </Row>
            <div style={{paddingBottom:'20px', color:'#00000029'}} >
                _____________________________________________________________________________________________________________________________________________________________________________________________________________
              </div>
              <Row>  
                <Col className='icon-post' sm={1}>
                  <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px',}}></i>
                </Col>
                <Col sm={11} style={{fontSize:'20px', color:'#707070'}}>
                 <p>{feedItem.description}</p>
                </Col>
              </Row>
              <Row>
              <div style={{paddingBottom:'10px', color:'#00000029'}} >
              _____________________________________________________________________________________________________________________________________________________________________________________________________________
              </div>
                <Col style={{textAlign:'center'}} onClick={() => toast.error("Feature under development")}>
                  <div className='inline-flex' >
                    <div style={{color:'#EE9337', fontSize:'25px',}}>
                    <i class="far fa-thumbs-up"></i>&nbsp;
                      </div>
                      <div style={{color:'#EE9337', fontSize:'20px', paddingTop:'6px'}}>
                      <p>Like</p>
                      </div>
                  </div>
                </Col>
                <Col style={{textAlign:'center'}}>
                <div className='inline-flex'>
                  <div style={{color:'#EE9337', fontSize:'25px',}}>
                    <i class="far fa-comment-alt"></i>&nbsp;
                    </div>
                    <div style={{color:'#EE9337', fontSize:'20px',paddingTop:'5px'}}>
                    <p>Comment</p>
                    </div>
                </div>
                </Col>
              </Row>

            </Card.Body>
          </Card>
          </>
          ):
          <>

          <Card className='post-card'>
            <Card.Body>
            <div className='inline-flex'>
              <div>
              <InputGroup.Text id="basic-addon2" className="feed-logo"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
              </div>
              <div  className='inline-flex' style={{paddingTop:'12px', fontSize:'18px', color: "#7D7D7D"}}>
                {(feedItem.type === 2)?(<><b>{feedItem?.updatedBy}</b> &nbsp; has Post an &nbsp; <div style={{color:'#EE9337'}} > <b>Assignment </b> </div></>):<></>}
                {(feedItem.type === 3)?(<><b>{feedItem?.updatedBy}</b> &nbsp; has Post an &nbsp; <div style={{color:'#EE9337'}} > <b>Task </b> </div></>):<></>}
                {(feedItem.type === 4)?(<><b>{feedItem?.updatedBy}</b> &nbsp; has Post an &nbsp; <div style={{color:'#EE9337'}} > <b>Exam </b> </div></>):<></>}
                {(feedItem.type === 5)?(<><b>{feedItem?.updatedBy}</b> &nbsp; has Post an &nbsp; <div style={{color:'#EE9337'}} > <b>Interactive </b> </div> </>):<></>}
              
              </div>
            </div>
            <div style={{paddingBottom:'20px', color:'#00000029'}} >
                      _____________________________________________________________________________________________________________________________________________________________________________________________________________
              </div>
              <Row>  
                <Col className='icon-post' sm={1}>
                  <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px', paddingTop:'30px'}}></i>
                  
                </Col>
                <Col sm={7} style={{fontSize:'20px', color:'#EE9337', paddingTop:'30px'}}>
                  <p>{feedItem.title}</p>
                  
                </Col>
                <Col  sm={4} style={{fontSize:'20px', color:'#707070', textAlign:'right'}} >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start Date:&nbsp;
                  </div>
                <div className='text-color-707070'>
                <p>{moment(feedItem?.startDate).format('ll')}&nbsp;</p> 
                </div>
                  <div className='text-color-707070'>
                   / {feedItem?.startTime}
                  </div>
                </div>
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start End:&nbsp;
                  </div>
                <div className='text-color-707070'>
                <p>{moment(feedItem?.endDate).format('ll')}&nbsp;</p> 
                </div>
                  <div className='text-color-707070'>
                  /  {feedItem?.endTime}
                  </div>
                </div>
              </Col>
                {/* <Col >
                <div className='inline-flex' style={{paddingTop:'20px'}}>
                <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}>            
                <Button onClick={() => openEditAnnouncementToggle(item)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-pencil-alt"></i>&nbsp; Edit Post</Button>
                </div>
                   <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
               <Button onClick={() => handleDeleteNotify(item?.id)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="far fa-trash-alt"></i>&nbsp; Remove Post</Button>
                </div> 
              </div>
                </Col> */}
              </Row>
              <Row>
                <Col>
                <div style={{paddingBottom:'10px', color:'#00000029'}} >
                _____________________________________________________________________________________________________________________________________________________________________________________________________________
              </div>
                </Col>
  
                <Col style={{textAlign:'center'}}>
                  <div className='inline-flex' onClick={() => toast.error("Feature under development")}>
                    <div style={{color:'#EE9337', fontSize:'25px',}}>
                    <i class="far fa-thumbs-up"></i>&nbsp;
                      </div>
                      <div style={{color:'#EE9337', fontSize:'20px', paddingTop:'6px'}}>
                      <p>Like</p>
                      </div>
                  </div>
                </Col>
                <Col style={{textAlign:'center'}}>
                <div className='inline-flex' onClick={() => toast.error("Feature under development")}>
                  <div style={{color:'#EE9337', fontSize:'25px',}}>
                    <i class="far fa-comment-alt"></i>&nbsp;
                    </div>
                    <div style={{color:'#EE9337', fontSize:'20px',paddingTop:'5px'}}>
                    <p>Comment</p>
                    </div>
                </div>
                </Col>
              </Row>

            </Card.Body>
          </Card>
          </>
          }
            </>
          )
        })}
        </>
      )
    })}

    {/* {(announcementItem?.createdDate ===announcementItem?.createdDate)?(<>{announcementItem?.map(item =>{
      
    })}</>):<></>} */}
    {/* {announcementItem?.map(item => {
      if(item?.createdDate === item?.createdDate){
        return(
          <>{item?.createdDate}</>
        )

      }
    })} */}
{/* <div className='post-date'>
        <p>{moment(item?.createdDate).format('LL')}&nbsp;</p> 
         </div>
         <Card className='post-card'>
          <Card.Body>
            <Row>  
              <Col sm={1}>
                <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px', paddingRight:'15px'}}></i>
              </Col>
              <Col sm={11} style={{fontSize:'20px', color:'#707070'}}>
                {item?.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.createdDate}
              </Col>
          </Row>
          </Card.Body>
        </Card> */}
        <SweetAlert 
          success
          show={addNotify} 
          title="Done!" 
          onConfirm={closeNotify}>
        </SweetAlert>
        <EditAnnouncement getFeedClass={getFeedClass} editAnnouncementItem={editAnnouncementItem} editAnnouncementModal={editAnnouncementModal} openEditAnnouncementToggle={openEditAnnouncementToggle} />
    </div>
  )
}
export default ClassFeed
