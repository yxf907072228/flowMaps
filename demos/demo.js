import React from 'react'
import ReactDom from 'react-dom'
import WorkFlow from '../src/workflow'


class App extends React.Component{
	
	render(){
		console.log(WorkFlow)
		return (
			<WorkFlow></WorkFlow>
		)
	}
}

ReactDom.render(<App />, document.getElementById('paper'));