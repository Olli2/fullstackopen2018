import React from 'react';
import ReactDOM from 'react-dom'

const Numero = (props) => {
  return (
     <tr>
      <td>{props.info.name}</td>
      <td>{props.info.number}</td>
     </tr>
  )
}

const Filtteri = (props) => {
  return (
    <div>
    Rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: 34 }
      ],
      filter: '',
      newName: '',
      newNumber: '',
    }


  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleNewNumber = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleNewName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNameSubmit = (event) => {
    event.preventDefault()
    if(!this.state.persons.find(a => a.name === this.state.newName)) {
      const persons = this.state.persons.concat({name: this.state.newName, number: this.state.newNumber})
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }else {
      alert(`Nimi '${this.state.newName}' on jo listalla`)
      this.setState({
        newName: ''
      })
    }
    
  }

  render() {
    const personsToShow = 
      this.state.filter === '' ?
            this.state.persons :
            this.state.persons.filter(a => a.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filtteri filter={this.state.filter} handleFilterChange={this.handleFilterChange}/>

        <form onSubmit={this.handleNameSubmit}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNewName} />
          </div>
          <div>
            numero: <input type="number" value={this.state.newNumber} onChange={this.handleNewNumber} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          <table>
            <thead>
            <tr>
              <th> Nimi </th>
              <th> Numero </th>
            </tr>
            </thead>
            <tbody>
              {personsToShow.map(e => <Numero key={e.name} info={e}/>)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)