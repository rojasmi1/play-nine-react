import React, { PropTypes } from 'react'
import classes from '../css/core.css'

const DoneFrame = (props) => {
  return (
    <div className="panel panel-default text-center">
      <div className="panel-body">
        <span style={{fontSize:'28px',fontWeight:'bold'}}>{props.doneStatus}</span>
        <br/>
          <button className="btn btn-info"
                  onClick={props.reset}>
            Reset
          </button>
      </div>
    </div>
  )
}


export default DoneFrame
