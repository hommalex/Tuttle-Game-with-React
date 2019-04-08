var init = {
		n: 5,
		m: 4,
		exit: [5,3],
		mines: [[2,2],[4,2],[4,4]]
	};

class App extends React.Component {
	
	state = {...init}
	
	render() {
		
		var column = [];
		for (var i = 1; i < (this.state.m + 1); i++) {
		
			var rows = [];
			for (var u = 1; u < (this.state.n + 1); u++) {
				
				var insideOb = '';
				
				if (this.props.turtlePos[0] === u && this.props.turtlePos[1] === i ) {
				
					// rotate Turtle
						var deg = (90 * this.props.turtlePos[2]);
						var style = {transform : 'rotate('+ deg +'deg)'};
					insideOb = <span className="abs turtle" style={style}></span>;
				}
				
				if (this.state.exit[0] === u && this.state.exit[1] === i ) {
					insideOb = <span className="abs exit"></span>;
				}

				for (var v = 0; v < this.state.mines.length; v++) {
					if (this.state.mines[v][0] === u && this.state.mines[v][1] === i ) {
						insideOb = <span className="abs mine"></span>;
					}
				}
			
				rows.push(<div className="box" key={u}>{insideOb}</div>);
			}
		
			column.push(<div className="row" key={i}>{rows}</div>);
		}
	
		return (
			<div className="App">
			  {column}
			  <div style={{textAlign:'center'}}>Press 'r' to rotate turtle and 'm' to move forward</div>
			  {this.props.hasWon && <h2 style={{textAlign: 'center', color: 'green'}}>YOU WON!!!</h2>}
			</div>
		)
	}
}

const EnhancedComponent = move(App,init);
const rootElement = document.getElementById("root");
ReactDOM.render(<EnhancedComponent />, rootElement);