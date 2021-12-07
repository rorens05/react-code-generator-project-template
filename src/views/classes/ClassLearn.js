import React from 'react'
import ClassLearnHeader from './components/Learn/ClassLearnHeader'



function ClassLearn({classInfo}) {
  console.log(classInfo?.classInformation?.courseId)
  return (
    <div>
      <ClassLearnHeader classInfo={classInfo}/>
    </div>
  )
}

export default ClassLearn
