import EquationEditor from 'equation-editor-react'
import React from 'react'
import { EQUATION_TAG } from './ContentField'

export default function ContentViewer({className = "", children}) {
  console.log({child: children.toString()})
  if(children.toString().includes(EQUATION_TAG)){
    return (
        <div className={`content-viewer ${className}`}>
          <EquationEditor
          className='custom-input'
          size='lg'
          value={children.split(EQUATION_TAG)[1] || ""}
          placeholder='Enter equation'
          autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
          autoOperatorNames="sin cos tan"
          /> 
        </div>
      )
    }
  return (
    <div className={`content-viewer ${className}`} dangerouslySetInnerHTML={{__html: children}} />
  )
}
