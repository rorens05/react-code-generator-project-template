import React, {useState, useEffect, useContext} from 'react'
import { CardGroup } from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import MainContainer from '../../components/layouts/MainContainer'
import ClassCard from './components/Classes/ClassCard'
import ClassHeader from './components/Classes/ClassHeader'
import EditClassModal from './components/Classes/EditClassModal'
import { UserContext } from '../../context/UserContext'

export default function Classes() {
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [seletedClass, setSeletedClass] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  const getClasses = async() => {
    setLoading(true)
    let response = await new ClassesAPI().getClasses(user.isTeacher ? user?.teacher?.id : user?.student?.id)
    setLoading(false)
    if(response.ok){
      setClasses(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getClasses()
  }, [])
  
  return (
    <MainContainer activeHeader={'classes'} loading={loading}>
      <div className='page-container'>
        <div className='containerpages'>
        <ClassHeader getClasses={getClasses} />
          <CardGroup className='card-group2'>
            {classes.length?
              classes.map(item => {
                return(<ClassCard getClasses={getClasses}  item={item} setOpenEditModal={setOpenEditModal} setSeletedClass={setSeletedClass} />)
                  }):<span></span>
                }
          </CardGroup>
        </div>
      </div>
      <EditClassModal getClasses={getClasses} seletedClass={seletedClass} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
    </MainContainer>
  )
}
