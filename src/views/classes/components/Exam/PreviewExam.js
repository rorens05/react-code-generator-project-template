import React from 'react';
import { Button, Form, Modal, InputGroup } from "react-bootstrap";

function PreviewExam({showPreviewExamModal, setShowPreviewExamModal, testItem, questionPartDto}) {

  console.log('testItem:', testItem)

  return (
  <>
   <Modal
      size='lg'
      className='modal-all'
      show={showPreviewExamModal}
      onHide={() => setShowPreviewExamModal(false)}
    >
      <Modal.Header className='modal-header' closeButton>
       Preview Exam
      </Modal.Header>
      <Modal.Body className='modal-label b-0px'>
      <Form.Group className='m-b-20'>
      <Form.Label style={{color:'#EE9337'}}><b>{testItem?.test?.testName}</b></Form.Label>
      </Form.Group>
        {questionPartDto?.map(item1 => {
          return(<>
        
          <Form.Label ><b>{item1?.questionPart?.instructions}</b></Form.Label>
      
         {(item1?.questionPart?.questionTypeId == 1)?(
         <>
         {item1?.questionDtos?.map((item2, index) =>{
            let number = index + 1
          return(<>
          <Form.Group className='m-b-15'>
          <Form.Label >{number}. {item2?.question?.testQuestion}</Form.Label>
          </Form.Group>
          {item2.choices?.map(item3 => {
            return(<>
              <Form.Group className='m-b-20'>
                <Form.Check type="radio" label={item3?.testChoices} disabled/>
              </Form.Group>
            </>)
          })}
          </>)
         })}</>):(<></>
         )}
        {(item1?.questionPart?.questionTypeId == 2)?(
         <>
         {item1?.questionDtos?.map((item2, index) =>{
           let number = index + 1
          return(<>
          <Form.Group className='m-b-15'>
          <Form.Label >{number}. {item2?.question?.testQuestion}</Form.Label>
          </Form.Group>
          {item2.choices?.map(item3 => {
            return(<>
              <Form.Group className='m-b-20'>
                <Form.Check type="radio" label={item3?.testChoices} disabled />
              </Form.Group>
            </>)
          })}
          </>)
         })}</>):(<></>
         )}

        {(item1?.questionPart?.questionTypeId == 3)?(
         <>
         {item1?.questionDtos?.map((item2, index) =>{
           let number = index + 1
          return(<>
          <Form.Group className='m-b-15'>
          <Form.Label >{number}. {item2?.question?.testQuestion}</Form.Label>
          </Form.Group>
          {item2.choices?.map(item3 => {
            return(<>
              <Form.Group className='m-b-20'>
              <Form.Control  className='custom-input'size='lg'type='text' disabled />
              </Form.Group>
            </>)
          })}
          </>)
         })}</>):(<></>
         )}

        {(item1?.questionPart?.questionTypeId == 4)?(
         <>
         {item1?.questionDtos?.map((item2, index) =>{
           let number = index + 1
          return(<>
          <Form.Group className='m-b-15'>
          <Form.Label >{number}. {item2?.question?.testQuestion}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-20">
            <Form.Control  as="textarea" rows={4} disabled style={{resize:'none'}} disabled />
          </Form.Group>
          </>)
         })}</>):(<></>
         )}

        {(item1?.questionPart?.questionTypeId == 5)?(
         <>
         {item1?.questionDtos?.map((item2, index) =>{
           let number = index + 1
          return(<>
          <Form.Group className='m-b-15'>
          <Form.Label >{number}. {item2?.question?.testQuestion}</Form.Label>
          </Form.Group>
          {item2.choices?.map(item3 => {
            return(<>
              <Form.Group className='m-b-20'>
              <Form.Control  className='custom-input'size='lg'type='text' disabled />
              </Form.Group>
            </>)
          })}
          </>)
         })}</>):(<></>
         )}
        
          </>)
        })}
      </Modal.Body>
    </Modal>
  
  </>);
}

export default PreviewExam;