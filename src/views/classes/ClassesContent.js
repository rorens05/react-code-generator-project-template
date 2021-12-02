import React from 'react'
import ClassSideNavigation from './components/ClassSideNavigation'
import MainContainer from '../../components/layouts/MainContainer'
import ClassBreedCrumbs from './components/ClassBreedCrumbs'

function ClassesContent(props) {
  // get class information by id
  
  return (
    <div>
      
      <MainContainer>
        <p>id: {props.match.params.id}</p>
        <ClassBreedCrumbs />
        <ClassSideNavigation />
      </MainContainer>
    </div>
  )
}

export default ClassesContent
