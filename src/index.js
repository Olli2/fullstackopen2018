import React from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const Numero = (props) => {
  return (
     <tr>
      <td>{props.info.name}</td>
      <td>{props.info.number}</td>
      <td><button onClick={props.handleRemove}>poista</button></td>
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
      persons: [],
      filter: '',
      newName: '',
      newNumber: '',
    }
  }

  handleRemove = (personObject) => () => {
    if(window.confirm(`Poistetaanko ${personObject.name}?`)) {
      personService.remove(personObject.id)
      const auxPersons = this.state.persons.filter(obj => obj.id !== personObject.id)
      this.setState({
        persons: auxPersons
      })
  }
  }

  componentDidMount() {
    personService
      .getAll()
      .then((res) => {
        this.setState({
          persons: res
        })
      })
      
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
      const personObject = {name: this.state.newName, number: this.state.newNumber}
      personService
        .create(personObject)
        .then(res => {
              this.setState({
                persons: this.state.persons.concat(res),
                newName: '',
                newNumber: ''
              })
            })
      
    }else {
      const personObject = this.state.persons.find(a => a.name === this.state.newName)
      const changedPersonObject = {...personObject, number: this.state.newNumber}

      if(window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
       personService.update(changedPersonObject)
       const persons = this.state.persons.filter(a => a.id !== changedPersonObject.id).concat(changedPersonObject)
       this.setState({
         persons,
         newName: '',
         newNumber: '',
       })
      } else {
        this.setState({
          newName: '',
          newNumber: '',
        })
      }

      
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
            nimi: <input value={this.state.newName} onChange={this.handleNewName} />
          </div>
          <div>
            numero: <input type="number" value={this.state.newNumber} onChange={this.handleNewNumber} />
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
              {personsToShow.map(e => <Numero key={e.name} info={e} handleRemove={this.handleRemove(e)}/>)}
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
