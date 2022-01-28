import React, { useState } from "react";

export default function ViewTask({selectedDiscussion, setShowDiscussion}) {

  const [loading, setLoading] = useState(false)
  
  const modulename = sessionStorage.getItem('modulename')

  const backToDiscussion = () => {
    setShowDiscussion(false)
  }

  return (
    <React.Fragment>
      <span className="content-pane-title">
        {selectedDiscussion?.discussion.discussionName}
      </span>
      <br></br>
      <span className="course-subtitle"><small>{modulename}</small></span>
      <hr></hr>
      <div dangerouslySetInnerHTML={{__html: selectedDiscussion.discussion.instructions}} />
    </React.Fragment>
  )
}
