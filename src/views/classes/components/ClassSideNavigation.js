import React, {useState, useEffect, useContext} from 'react'
import {ListGroup, Tab, Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap'
import ClassAssignment from '../ClassAssignment'
import ClassDiscussion from '../ClassDiscussion'
import ClassExam from '../ClassExam'
import ClassFeed from '../ClassFeed'
import ClassLearn from '../ClassLearn'
import ClassLinks from '../ClassLinks'
import ClassTask from '../ClassTask'
import ClassCalendar from './ClassCalendar'
import ClassInteractive from '../ClassInteractive'
import ClassList from '../ClassList'
import ClassFiles from '../ClassFiles'
import DiscussionAPI from '../../../api/DiscussionAPI'
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'

export default function ClassSideNavigation({setLoading}) {
  const userContext = useContext(UserContext)
  const [classInfo, setClassInfo] = useState(null)
  const {id} = useParams()
  const {user} = userContext.data
  const [collapseSide, setCollapseSide] = useState(true)

  const getClassInfo = async() => {
    setLoading(true)
    let response = await new DiscussionAPI().getClassInfo(id)
    if(response.ok){
      setClassInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
    setLoading(false)

  }

  const renderTooltipFeed = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Feed
    </Tooltip>
  )
  const renderTooltipLearn = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Learn
    </Tooltip>
  )
  const renderTooltipExam = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Exam
    </Tooltip>
  )
  const renderTooltipDiscussion = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Discussion
    </Tooltip>
  )
  const renderTooltipAssignment = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Assignment
    </Tooltip>
  )
  const renderTooltipTask = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Task
    </Tooltip>
  )
  const renderTooltipInteractive = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Interactive
    </Tooltip>
  )
  const renderTooltipLink = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Link
    </Tooltip>
  )
  const renderTooltipClassList = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Class List
    </Tooltip>
  )
  const renderTooltipFiles = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Files
    </Tooltip>
  )

  useEffect(() => {
    getClassInfo()
  }, [])

  if(classInfo == null){
    return (<div/>)
  }
  if(classInfo == null) return <div/>

  return (
    <Tab.Container style={{position:'relative'}} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div style={{position:'relative'}} className="row">
          {collapseSide ? <div className="row-course-bg course-widget-font col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
                  <Col className="" sm={9} >
                    <div className="class-subtitle-code" > {classInfo?.classInformation?.classCode}</div>
                    <div className="class-subtitle-section">{classInfo?.classInformation?.className}</div>
                    <div className="class-subtitle-subject">{classInfo?.classInformation?.gradeName}</div>
                    <div className="class-subtitle-name">{classInfo?.classInformation?.teacherName}</div>
                  </Col>
                  <Col className="ellipsis-top-right" sm={3}>
                    {/* <i className="fa fa-ellipsis-v fa-1x cursor-pointer"></i> */}
                    <i className="fas fa-chevron-left cursor-pointer color-black" onClick={()=> setCollapseSide(false)}/>
                    <div className='fa-user-size'>
                    <i className="fas fa-user"></i> {classInfo?.students?.length}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            <ListGroup>
              <ListGroup.Item  className="list-group-item-o " action href="#link1">
                Feed
              </ListGroup.Item>
              <ListGroup.Item style={{position:'relative'}} className="list-group-item-o "action href="#link2">
                Learn
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
               Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                Interactive Exercises
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link8">
                Links
              </ListGroup.Item>
              {(user?.teacher === null)?(
              <>
              </>
              ):
              <>
                <ListGroup.Item className="list-group-item-o " action href="#link9">
                  Class List
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-o " action href="#link10">
                  Files
                </ListGroup.Item>
              </>}
            </ListGroup>
          </div>
          :
          <Col className='row-course-bg course-widget-font' sm={1}>
            <Col className="text-align-right mb-2">
              <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(true)}/>
            </Col>
            <ListGroup>
              <ListGroup.Item  className="list-group-item-o " action href="#link1">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipFeed}>
                <i className='fas fa-comment' />
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item style={{position:'relative'}} className="list-group-item-o "action href="#link2">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipLearn}>
                <i className="fas fa-book" />
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipExam}>
                <i className="fas fa-file-alt" />
              </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipDiscussion}>
                <i className="fas fa-comment-alt" />
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipAssignment}>
               <i className="fas fa-sticky-note" />
               </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipTask}>
                <i className="fas fa-edit" />
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipInteractive}>
                <i className='fas fa-chalkboard-teacher' />
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link8">
              <OverlayTrigger
                placement="right"
                delay={{ show: 1, hide: 1 }}
                overlay={renderTooltipLink}>
                <i className='fa fa-link' />
                </OverlayTrigger>
              </ListGroup.Item>
              {(user?.teacher === null)?(
              <>
              </>
              ):
              <>
                <ListGroup.Item className="list-group-item-o " action href="#link9">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 1, hide: 1 }}
                  overlay={renderTooltipClassList}>
                  <i className="fas fa-users" />
                 </OverlayTrigger>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-o " action href="#link10">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 1, hide: 1 }}
                  overlay={renderTooltipFiles}>
                  <i className="fas fa-folder-open" />
                  </OverlayTrigger>
                </ListGroup.Item>
              </>}
            </ListGroup>
          </Col>
          }
          <Col sm={collapseSide ? 9 : 11} className='scrollable vh-85 pb-5'>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              <Row>
                <Col>
               <ClassFeed />
               </Col>
               <Col md="auto">
               {/* <ClassCalendar /> */}
               </Col>
             </Row>
              </Tab.Pane>
              <Tab.Pane  eventKey="#link2">
                  <ClassLearn classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link3">
                <ClassExam />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link4">
                <ClassDiscussion classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link5">
                <ClassAssignment classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link6">
                <ClassTask classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link7">
                <ClassInteractive classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link8">
                <ClassLinks classInfo={classInfo}  />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link9">
                <ClassList />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link10">
                <ClassFiles id={id}/>
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>
  )
}