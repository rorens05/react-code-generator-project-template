import React, {useState, useEffect} from 'react'
import {Form, InputGroup, FormControl, Card, Button} from 'react-bootstrap'
import { useParams } from 'react-router';
import ClassesAPI from '../../../../api/ClassesAPI';

const AnnouncementComment = ({refId, typeId, getFeedClass, commentInfo}) => {
  const [comment, setComment] = useState('')
  const {id} = useParams();
  const [commentAnnouncementItem, setCommentAnnouncementItem] = useState([])

 console.log('commentInfo:', commentInfo)

  const commentAnnouncement = async (e) => {
    e.preventDefault()
    let response = await new ClassesAPI().commentAnnouncement(id, refId, typeId, {comment:comment})
      if(response.ok){
        setComment('')
        getComment()
        getFeedClass()
      }else{
        alert(response.data.errorMessage)
      }
  }

  const getComment = async () => {
    let response = await new ClassesAPI().getComment(id, refId, typeId,)
      if(response.ok){
        setCommentAnnouncementItem(response.data)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    getComment();
  }, [])

  const commentDelete = async (e, item) => {
    e.preventDefault()
    let commentId = item
    let response = await new ClassesAPI().deleteCommentfeed(id, commentId)
      if(response.ok){
        getComment()
      }else{
        alert(response.data.errorMessage)
      }
  }

  const refreshComment = () => {
    getComment()
  }

  return (
    <div>
        <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}>            
          <Button onClick={() => refreshComment()} className="m-r-5 color-white tficolorbg-button" size="sm"> Refresh</Button>
        </div>
      {commentAnnouncementItem?.map(item => {
        return(
          <>
      <Card style={{margin:'20px'}}>
        <Card.Header>
          <div className='inline-flex' style={{color: "#7D7D7D"}}>
          <i class="fas fa-user-circle fas-1x comment-log" ></i> 
          <b><p style={{paddingLeft:'8px', paddingTop:'5px', color:'#EE9337'}}>{item?.commentedBy}</p></b>
          </div> 
          <div style={{color:'#EE9337', fontSize:'15px',paddingTop:'4px', float:'right'}}>
            <Button onClick={(e) => commentDelete(e, item?.id)} className='btn-like' size="sm" Button variant="link">&nbsp;Delete</Button>
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