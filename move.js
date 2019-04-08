function move(WrappedComponent,otherState) {
	return class extends React.Component {
      state = { turtlePos: [1,2,0], hasWon: false }
	  
	componentWillMount() { 
			document.addEventListener("keypress", this.moveTurtle.bind(this), true);
	}
	
	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
	}
	
	componentWillUnmount() {
			document.removeEventListener("keypress");
	}
	
	checkMoveTurtle() {
	
		var whereTurtleIsGoingNext = [];
		if (this.state.turtlePos[2] == 0) { whereTurtleIsGoingNext = [ this.state.turtlePos[0], (this.state.turtlePos[1]-1) ]; }
		else if (this.state.turtlePos[2] == 1) { whereTurtleIsGoingNext = [ (this.state.turtlePos[0]+1), this.state.turtlePos[1] ]; }
		else if (this.state.turtlePos[2] == 2) { whereTurtleIsGoingNext = [ this.state.turtlePos[0], (this.state.turtlePos[1]+1) ]; }
		else if (this.state.turtlePos[2] == 3) { whereTurtleIsGoingNext = [ (this.state.turtlePos[0]-1), this.state.turtlePos[1] ]; }
		
		
		if (this.outOfBounce(whereTurtleIsGoingNext)) { 
			console.log("Out of Bounce");
			return false;
		}

		if (this.moveToMine(whereTurtleIsGoingNext)) {
			console.log("You cannot move here");
			return false;
		}
		
		if (this.moveToExit(whereTurtleIsGoingNext)) {
			console.log("You Won");
			var hasWon = true;
		}
		
		this.state.turtlePos = [...whereTurtleIsGoingNext, this.state.turtlePos[2]];
		this.setState({turtlePos: [ ...this.state.turtlePos ], hasWon});
		
	}
	
	outOfBounce(whereTurtleIsGoingNext) {
		return ((whereTurtleIsGoingNext[0] > otherState.n) || (whereTurtleIsGoingNext[0] < 1) || (whereTurtleIsGoingNext[1] > otherState.m) || (whereTurtleIsGoingNext[1] < 1)) ? true : false;
	}
	
	moveToMine(whereTurtleIsGoingNext) {
		var moveToMine = otherState.mines.filter( (data) => (data[0] === whereTurtleIsGoingNext[0] && data[1] === whereTurtleIsGoingNext[1]) ); 
		return (moveToMine.length > 0) ? true : false;
	}

	moveToExit(whereTurtleIsGoingNext) { 
		return (otherState.exit[0] === whereTurtleIsGoingNext[0] && otherState.exit[1] === whereTurtleIsGoingNext[1]) ? true : false;
	}
	  
	 moveTurtle(e) {
		if (e.key === 'r') {
			this.state.turtlePos[2] = (this.state.turtlePos[2] === 3) ? 0 : (this.state.turtlePos[2] + 1); 
			this.setState({turtlePos: [ ...this.state.turtlePos ]});
		}
		if (e.key === 'm') {
			this.checkMoveTurtle();
		}
	  }

    render() {
      return <WrappedComponent turtlePos={this.state.turtlePos} hasWon={this.state.hasWon} />;
    }
  };
}