import React from 'react';
import Game from './Game.jsx';

export default class App extends React.Component {

  constructor(props){
  super(props);
  this.reset = this.reset.bind(this)
  this.state = {
    game: () => <Game reset={this.reset}/>
  }
  }

  reset () {
    this.setState(({game: () => <Game reset={this.reset}/>}));
  }
  render() {
    const ActiveGame = this.state.game;

    return (
     <div>
        <ActiveGame/>
     </div>
    );
  }
}
