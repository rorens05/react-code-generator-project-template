import React, {useState} from 'react'
import {Form, InputGroup, FormControl, Card} from 'react-bootstrap'
import { useParams } from 'react-router';
import ClassesAPI from '../../../../api/ClassesAPI';

const AnnouncementComment = ({refId}) => {
  const [comment, setComment] = useState('')
  const {id} = useParams();



  const commentAnnouncement = async (e) => {
    e.preventDefault()
    let typeId = 1
    let response = await new ClassesAPI().commentAnnouncement(id, refId, typeId, {comment:comment})
      if(response.ok){
        setComment('')
      }else{
        alert(response.data.errorMessage)
      }
  }


  return (
    <div>
      <Card style={{margin:'20px'}}>
  <Card.Header>
    <div className='inline-flex'>
    <i class="fas fa-user-circle fas-1x comment-log" ></i> 
    <b><p style={{paddingLeft:'8px', paddingTop:'5px'}}>Kent Placia</p></b>
    </div> 
     </Card.Header>
  <Card.Body>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
  </Card.Body>
</Card>
<Card style={{margin:'20px'}}>
  <Card.Header>
    <div className='inline-flex'>
    <i class="fas fa-user-circle fas-1x comment-log" ></i> 
    <b><p style={{paddingLeft:'8px', paddingTop:'5px'}}>Kent Placia</p></b>
    </div> 
     </Card.Header>
  <Card.Body>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
  </Card.Body>
</Card>
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