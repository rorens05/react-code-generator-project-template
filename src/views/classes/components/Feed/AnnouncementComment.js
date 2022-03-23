import React, {useState, useEffect} from 'react'
import {Form, InputGroup, FormControl, Card} from 'react-bootstrap'
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

  return (
    <div>
      {commentAnnouncementItem?.map(item => {
        return(
          <>
      <Card style={{margin:'20px'}}>
        <Card.Header>
          <div className='inline-flex'>
          <i class="fas fa-user-circle fas-1x comment-log" ></i> 
          <b><p style={{paddingLeft:'8px', paddingTop:'5px'}}>{item?.commentedBy}</p></b>
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