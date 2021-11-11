import React from 'react'
import ClassSideNavigation from './components/ClassSideNavigation'
import MainContainer from '../../components/layouts/MainContainer'
import ClassBreedCrumbs from './components/ClassBreedCrumbs'

function ClassesContent() {
  return (
    <div>
      <MainContainer>
        <ClassBreedCrumbs />
        <ClassSideNavigation />
      </MainContainer>
    </div>
  )
}

export default ClassesContent
