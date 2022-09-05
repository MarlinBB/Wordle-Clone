import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className='modal'>
     {isCorrect &&
     <div>
        <h1> lol, you win</h1>
        <p className='solution'>{solution}</p>
        <p>you found the soluion in {turn} guesses </p>
     </div>
     }
      {!isCorrect &&
     <div>
        <h1> cunt, you lost!! </h1>
        <p className='solution'>{solution}</p>
        <p>try again </p>
     </div>
     }
    </div>
  )
}
