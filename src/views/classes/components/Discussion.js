import React, { useState } from "react";
import CreateDiscussion from "././CreateDiscussion"
import { Button, InputGroup, FormControl, CardGroup } from 'react-bootstrap';
import DiscussionItem from "./DiscussionItem";

export default function Discussion() {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = e => {
      e.preventDefault()
      setOpenModal(true)
  }
  return (
    <MainContainer>
      <div className="page-container">
        <div className="containerpages">
          <div className="row m-b-20">
              <div className="col-md-10 pages-header"><h1>Create Discussion <Button variant="outline-warning" onClick={handleOpenModal}></Button></h1></div>
              <div className="col-md-2">
              </div>
          </div>
          <div className="row m-b-20">
              <div className="col-md-12">
              <InputGroup size="lg">
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
                <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
              </InputGroup>
              </div>
          </div>
          <CardGroup className="card-group-tfi">
              <CreateDiscussion openModal={openModal} setOpenModal={setOpenModal} /> 
          </CardGroup>
        </div>
      </div>
    </MainContainer>
  )
}
