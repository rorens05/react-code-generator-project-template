import React, {useState, useEffect, useContext} from 'react'
import {Form, InputGroup, FormControl, Card, Button} from 'react-bootstrap'
import { toast } from "react-toastify";
import { useParams } from 'react-router';
import ClassesAPI from '../../../../api/ClassesAPI';
import { UserContext } from '../../../../context/UserContext'
import moment from 'moment';

const AnnouncementComment = ({refId, typeId, getFeedClass, commentInfo}) => {
  const [comment, setComment] = useState('')
  const [commentAnnouncementItem, setAnnouncementItem] = useState([])
  const {id} = useParams();
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [loading, setLoading] = useState(true);


  const commentAnnouncement = async (e) => {
    e.preventDefault()
    if(comment === ''){
      toast.warning("Please fill out this Field")
    }else{
      let response = await new ClassesAPI().commentAnnouncement(id, refId, typeId, {comment:comment})
      if(response.ok){
        toast.success("Comment was successfully Created")
        setComment('')
        getFeedClass()
        getComment()
      }else{
        alert(response.data.errorMessage)
      }
    }

  }
 useEffect(() => {
   console.log(commentInfo)
    getFeedClass();
  }, [commentInfo])


  const getComment = async () => {
    setLoading(true);
    let response = await new ClassesAPI().getComment(id, refId, typeId,)
    setLoading(false);
      if(response.ok){
        setAnnouncementItem(response.data)
      }else{
        alert(response.data.errorMessage)
      }
  }

  console.log('refId:', refId)

  useEffect(() => {

    getComment();
  }, [])

  const commentDelete = async (e, item) => {
    e.preventDefault()
    let commentId = item
    let response = await new ClassesAPI().deleteCommentfeed(id, commentId)
      if(response.ok){
        getFeedClass()
        getComment()
        toast.success("Comment was successfully deleted")
      }else{
        alert(response.data.errorMessage)
      }
  }

  console.log('commentInfo:', commentInfo)

  return (
    <div>
        {/* <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}>            
          <Button onClick={() => refreshComment()} className="m-r-5 color-white tficolorbg-button" size="sm"> Refresh</Button>
        </div> */}
      {commentAnnouncementItem?.map(item => {
        return(
          <>
      <Card style={{margin:'20px'}}>
        <Card.Header>
          <div className='inline-flex' style={{color: "#7D7D7D"}}>
          <i class="fas fa-user-circle fas-1x comment-log" ></i> 
          <b><p style={{paddingLeft:'8px', paddingTop:'5px', color:'#EE9337'}}>{item?.commentedBy}</p></b> <p style={{fontSize:'14px', paddingLeft:'8px', paddingTop:'8px', color:'#707070'}}>  {moment(item?.createdDate).format('ll')}&nbsp; </p>
          </div> 
          <div style={{color:'#EE9337', fontSize:'15px',paddingTop:'4px', float:'right'}}>
          {user.isTeacher && <Button onClick={(e) => commentDelete(e, item?.id)} className='btn-like' size="sm" Button variant="link">&nbsp;Delete</Button>}  
          {(user?.userId === item?.createdById && user?.teacher === null)?(<><Button onClick={(e) => commentDelete(e, item?.id)} className='btn-like' size="sm" Button variant="link">&nbsp;Delete</Button></>):(<></>)}       
          </div>
          </Card.Header>
        <Card.Body>
          <Card.Text>
            {item?.comment}
          </Card.Text>
        </Card.Body>
      </Card>
          </>
        )
      })}

      <Form>  
        <InputGroup size="sm">
          <FormControl value={comment} onChange={(e) => setComment(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Write your comment here..." />
          <InputGroup.Text  onClick={(e) => commentAnnouncement(e)} id="basic-addon2" className="comment-btn"><i className="fas fa-paper-plane"></i></InputGroup.Text>
        </InputGroup><br />
      </Form> 
    </div>
  )
}

export default AnnouncementComment