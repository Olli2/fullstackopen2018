import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0}
    }
  }

  setRandom = () => {
    this.setState({
      selected: Math.floor(Math.random() * Math.floor(anecdotes.length-1))
    })
  }

  setVote = (index) => () => {
    let property = this.state.votes
    property[index] = property[index] + 1
    this.setState({
      votes: property 
    })
  }

  render() {
    const anecdote = anecdotes[this.state.selected]

    let max = 0
    let indexOfMax = null
    for(let a in this.state.votes) {
      if(this.state.votes[a] > max) {
        max = this.state.votes[a]
        indexOfMax = a
      }
    }

    return (
      <div>
        <p>{anecdote}</p>
        <p> has {this.state.votes[this.state.selected]} votes</p>
        <div>
          <button onClick={this.setVote(this.state.selected)}>vote</button>
          <button onClick={this.setRandom}>Next anecdote</button>
        </div>
        <div>
          <h2> anecdote with most votes: </h2>
          <p> { anecdotes[indexOfMax] }</p>
          <p> has {this.state.votes[indexOfMax]} votes</p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)