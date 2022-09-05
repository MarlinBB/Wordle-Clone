import React from 'react'
import Row from './Row'

export default function grid({currentGuess, guesses ,turn }) {
  return (
    <div>
        {guesses.map((g, i) => {
           if(turn === i){
            return <Row key={i}  currentGuess={currentGuess}  />
           }
        
          return <Row  key={i} guess ={g}/>
        })}
    </div>
  )
}
