import React, { PropTypes } from 'react'
import classes from '../css/core.css'

const Stars = (props) => {
  return (
    <div className="col-md-5">
      {Array.from(Array(props.numberOfStars).keys()).map(index =>
      <i key={index} className={`fa fa-star ${classes.star}`}></i>
      )}
    </div>
  )
}

export default Stars
