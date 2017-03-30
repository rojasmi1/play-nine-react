import React, { PropTypes } from 'react'

const Button = (props) => {
  let button;

  switch (props.answerIsCorrect) {
    case true:
    button = <button disabled={props.selectedNumbers.length === 0}
      className="btn btn-success" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i>
    </button>
      break;
    case false:
    button = <button disabled={props.selectedNumbers.length === 0}
      className="btn btn-danger">
      <i className="fa fa-times"></i>
    </button>
      break;
    default:
    button = <button disabled={props.selectedNumbers.length === 0}
      className="btn btn-info" onClick={props.checkAnswer}>
      =
    </button>
    break;

  }

  return (
    <div className="col-md-2">
      {button}
      <br/>
      <br/>
      <button className="btn btn-warning btn-sm"
              disabled={props.redraws===0} onClick={props.redraw}>
        <i style={{marginRight:'0.5em'}} className="fa fa-refresh"></i>{props.redraws}
      </button>
    </div>
  )
}

export default Button
