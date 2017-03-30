import React, { PropTypes } from 'react'
import classes from '../css/core.css'

const Numbers = (props) => {
  const getNumberClass = number => {
    if(props.selectedNumbers.includes(number)){
      return classes.selected;
    }else if(props.usedNumbers.includes(number)){
      return classes.used;
    }
  }

  return (
    <div className="panel panel-default text-center">
      <div className="panel-body">
        {Numbers.list.map((number,index) =>
          <span className={`${classes.number} ${getNumberClass(number)}`}
                key={index} onClick={()=>{props.selectNumber(number)}}>
            {number}
          </span>
        )}
      </div>
    </div>
  )
}

//Create array with range of numbers from 1 to 9
const arrayOfNumbers = Array.from(Array(10).keys());
arrayOfNumbers.splice(0,1); //Remove 0 from the array

Numbers.list = arrayOfNumbers;

export default Numbers
