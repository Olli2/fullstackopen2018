import React from 'react'
import ReactDOM from 'react-dom'

  const Header = (props) => {
      return (
        <div>
          <h2>{props.header}</h2>
        </div>
      )
    }

  const Statistic = (props) => {
    return (
        <tr> 
          <td>{props.text}</td>
          <td>{props.val}</td>
        </tr>
    )
  }

  const Btn = (props) => {
    return (
      <div> 
        <button onClick={props.handleClick}> {props.text} </button>
      </div>
    )
  }

  class Statistics extends React.Component {

    render() {
      const total = this.props.stats.good + this.props.stats.neutral + this.props.stats.bad
      
      if(total !== 0) {
        return (
          <div>
          <table>
            <tbody>
          <Statistic text="hyvä"         val={this.props.stats.good}/>
          <Statistic text="neutraali"    val={this.props.stats.neutral}/>
          <Statistic text="huono"        val={this.props.stats.bad}/>
          <Statistic text="keskiarvo"    val={(this.props.stats.good - this.props.stats.bad) / total}/>
          <Statistic text="positiivisia" val={(this.props.stats.good / total * 100)+' %'}/>
            </tbody>
          </table>
          </div>
        )
      } else {
        return <div> Ei yhtään palautetta annettu </div>
      }
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good: 0,
        neutral: 0,
        bad: 0,    
      }
    }

    setValue = (value, field) => () => {
      switch(field) {
        case 'good': this.setState({good: value}); break
        case 'neutral': this.setState({neutral: value}); break
        case 'bad': this.setState({bad: value}); break
        default: console.log('Error adding a value')
      }
    }
    
  render() {
    return (
      <div>
        <Header header={'anna palautetta'} />
        <Btn handleClick={this.setValue(this.state.good + 1, 'good')} text="hyvä"/>
        <Btn handleClick={this.setValue(this.state.neutral + 1, 'neutral')} text="neutraali"/>
        <Btn handleClick={this.setValue(this.state.bad + 1, 'bad')} text="huono"/>
        <Header header={'statistiikka'}/>
        <Statistics stats={this.state}/>
      </div>
    )
  }
}   

ReactDOM.render(
  <App />,
  document.getElementById('root')
)