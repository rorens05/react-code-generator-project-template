import React from "react";

export default function ExamTimer({ remainingTime }) {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime - minutes * 60;
  return (
    <div>
      <p className='secondary-title'>Remaining Time: {minutes > 0 && `${minutes} minute(s)`} {seconds} second(s)</p>
    </div>
  );
}
