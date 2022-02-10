import React from 'react'

export default function Status({children}) {
  let color = "gray";
  switch (children) {
    case "Completed":
      color ="#28A745";
      break;
    case "Not Completed":
    case "Unassigned":
      color = "#DC3545";
      break
    case "Ongoing":
      color = "#FFC107";
      break
    case "Ended":
      color = "#007BFF";
      break
    case "Upcoming":
      color = "#17A2B8";
      break
    default:
      break;
  }
  return (
    <p className={`status-text`} style={{backgroundColor: color}}>{children}</p>
  )
}
