import React, {useState, useEffect, useContext } from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import HeaderArchive from './components/Archive/HeaderArchive'
import { UserContext } from '../../context/UserContext'
import ClassesAPI from '../../api/ClassesAPI'

export default function Classes() {
  const [archive, setArchive] = useState([])
  const [loading, setLoading] = useState(true)
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  // const getClasses = async() => {
  //   let response = await new ClassesAPI().getClasses(user?.teacher?.id)
  //   if(response.ok){
  //     setClasses(response.data)
  //   }else{
  //     alert("Something went wrong while fetching all courses")
  //   }
  // }

  const getArchive = async() => {
    let response = await new ClassesAPI().getArchive()
    if(response.ok){
      setArchive(response.data)
    }else{
      alert("Something went wrong while fetching all Archive")
    }
    setLoading(false)
  }

  useEffect(() => {
    getArchive()
  }, [])

  console.log('asd teacher', user?.teacher?.id)
  return (
    <MainContainer loading={loading} activeHeader={'classes'}>
      <div className='page-container'>
        <div className='containerpages'>

        <HeaderArchive getArchive={getArchive} archiveItem={archive} />

        </div>
      </div>
    </MainContainer>
  )
}
