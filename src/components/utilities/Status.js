import React from 'react'

export default function Status({children}) {
  let color = "gray";
  switch (children) {
    case "Completed":
      color ="#5cb85c";
      break;
    case "Not Started":
      color = "red";
      break
    case "Test is Ongoing..":
      color = "orange";
      break
    default:
      break;
  }
  return (
    <div>
      <p className={`my-3 status-text`} style={{color}}>{children}</p>
    </div>
  )
}
