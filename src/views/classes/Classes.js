import React, {useState, useEffect} from 'react'
import { CardGroup } from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import MainContainer from '../../components/layouts/MainContainer'
import ClassCard from './components/ClassCard'
import ClassHeader from './components/ClassHeader'
import EditClassModal from './components/EditClassModal'


export default function Classes() {
  const [classes, setClasses] = useState([])
  const [seletedClass, setSeletedClass] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const getClasses = async() => {
    let response = await new ClassesAPI().getClasses()
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
    <MainContainer>
      <div className='page-container'>
        <div className='containerpages'>
        <ClassHeader />
          <CardGroup className='card-group2'>
            {classes.length?
              classes.map(item => {
                return(<ClassCard  item={item} setOpenEditModal={setOpenEditModal} setSeletedClass={setSeletedClass} />)
                  }):<span></span>
                }
          </CardGroup>
        </div>
      </div>
      <EditClassModal seletedClass={seletedClass} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
    </MainContainer>
  )
}
