import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import {Button, Row, Col, Accordion} from 'react-bootstrap'
import FilesContent from './FilesContent'

export default function Files() {
  return (
    <MainContainer activeHeader={'files'}>
        <div className="row">
          <div className="col-md-3 file-sidenav">
          <div style={{textAlign:'center', paddingBottom:'45px', paddingTop:'25px'}}><Button className="file-library" size='lg' variant="outline-warning"><i class="fas fa-folder"></i> File Library</Button></div>
          </div>
          <FilesContent />
        </div>
    </MainContainer>
  )
}
