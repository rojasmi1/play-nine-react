import React, { PropTypes } from 'react'
import classes from '../css/core.css'

const Answer = (props) => {
  return (
    <div className="col-md-5">
      {props.selectedNumbers.map((number,index) =>
      <span className={classes.number} key={index} onClick={()=>{props.unselectNumber(number)}}>
        {number}
      </span>
      )}
    </div>
  )
}

export default Answer
