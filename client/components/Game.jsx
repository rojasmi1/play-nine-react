import React, { PropTypes } from 'react'
import Stars from './Stars.jsx'
import Button from './Button.jsx'
import Answer from './Answer.jsx'
import Numbers from './Numbers.jsx'
import DoneFrame from './DoneFrame.jsx'

const Game = React.createClass({


  getInitialState () {
    return {
      selectedNumbers: [],
      numberOfStars : Game.randomNumber(),
      answerIsCorrect : null,
      usedNumbers: [],
      redraws:5,
      doneStatus: null,
    }
  },

  selectNumber (clickedNumber) {
    if(!this.state.selectedNumbers.includes(clickedNumber) && !this.state.usedNumbers.includes(clickedNumber)){
      this.setState( prevState => ({
        answerIsCorrect:null,
        selectedNumbers: [...prevState.selectedNumbers,clickedNumber]
      })
      );
    }
  },

  unselectNumber (clickedNumber) {
      const index = this.state.selectedNumbers.indexOf(clickedNumber);
      if(index<0){return;}
      this.setState( prevState => ({
        answerIsCorrect:null,
        selectedNumbers: [...prevState.selectedNumbers.slice(0,index)
                          ,...prevState.selectedNumbers.slice(index+1)]
      })
      );
  },

  checkAnswer () {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars ===
          prevState.selectedNumbers.reduce((acc,n) => acc+n,0)
    }));
  },
  acceptAnswer () {
    this.setState(prevState => ({
      usedNumbers: [...prevState.usedNumbers,...prevState.selectedNumbers],
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars : Game.randomNumber(),
    }), this.updateDoneStatus);

  },

  redraw (){
    if(this.state.redraws===0) return;
    this.setState(prevState => ({
      numberOfStars : Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers:[],
      redraws: prevState.redraws-1
    }),this.updateDoneStatus);
  },

  possibleSolutions({numberOfStars, usedNumbers}){
    //Create array with range of numbers from 1 to 9
    const arrayOfNumbers = Array.from(Array(10).keys());
    arrayOfNumbers.splice(0,1); //Remove 0 from the array

    const possibleNumbers = arrayOfNumbers.filter(number => !usedNumbers.includes(number));

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  },

  updateDoneStatus (){
    this.setState(prevState => {
      if(prevState.usedNumbers.length === 9){
        return {doneStatus: 'Done. Nice!'}
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
        return {doneStatus: 'Game Over!'}
      }
    });
  },

  reset () {
    this.props.reset();
  },

  render () {
    const {
          selectedNumbers,
          numberOfStars,
          answerIsCorrect,
          usedNumbers,
          redraws,
          doneStatus
          } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  answerIsCorrect={answerIsCorrect}
                  redraw={this.redraw}
                  redraws={redraws}/>

          <Answer selectedNumbers={selectedNumbers}
                   unselectNumber={this.unselectNumber}/>
        </div>
        <br/>
        {doneStatus?
          <DoneFrame reset={this.reset} doneStatus={doneStatus}/>
          :
          <Numbers selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}/>
        }
      </div>
    )
  }
})

Game.randomNumber = function() {
  return 1 + Math.floor(Math.random()*9);
}

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

export default Game
