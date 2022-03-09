import EquationEditor from "equation-editor-react";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FroalaEditor from "react-froala-wysiwyg";

const Field = (props) => {
  const {inputType, value, onChange} = props
  switch (inputType) {
    case "equation":
      return (
        <EquationEditor
          className='custom-input'
          size='lg'
          value={value}
          placeholder='Enter equation'
          autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
          autoOperatorNames="sin cos tan"
          onChange={onChange}
        />
      );
    case "rich-text":
      return <FroalaEditor value={value} onModelChange={onChange}/>;
    default:
      return (
        <Form.Control
          size='lg'
          value={value}
          type='text'
          placeholder='Enter test instructions'
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

export default function ContentField(props) {
  const [inputType, setInputType] = useState("text");
  
  return (
    <div className={props.className}>

    <div key={`inline-radio`} className="mb-3" >
      <Form.Check
        inline
        label="Text Editor"
        name="inputType"
        type={"radio"}
        value=""
        onChange={e => setInputType(e.target.value)}
      />
      <Form.Check
        inline
        label="Equation Editor"
        name="inputType"
        type={"radio"}
        value="equation"
        onChange={e => setInputType("equation")}
      />
      <Form.Check
        inline
        label="Rich Text Editor"
        name="inputType"
        type={"radio"}
        value="rich-text"
        onChange={e => setInputType("rich-text")}
      />
    </div>

      <Field {...props} inputType={inputType}/>
    </div>
  )
}
