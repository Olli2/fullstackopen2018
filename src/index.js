import React from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'

const Ilmoitus = ({msg}) => {
  if (msg === null) {
    return null
  }
  return (
    <div className="error">
      {msg}
    </div>
  )
}


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
      msg: null,
    }
  }

  handleRemove = (personObject) => () => {
    if(window.confirm(`Poistetaanko ${personObject.name}?`)) {
      personService.remove(personObject.id)
      const auxPersons = this.state.persons.filter(obj => obj.id !== personObject.id)
      this.setState({
        persons: auxPersons,
        msg: `Poistettiin ${personObject.name}`
      })
      this.clearMsg()
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

  clearMsg = () => {
    setTimeout(() => {
      this.setState({msg: null})
    }, 4000)
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
                newNumber: '',
                msg: `Lisättiin ${personObject.name}`
              })
            })
      this.clearMsg()
    } else {
      const personObject = this.state.persons.find(a => a.name === this.state.newName)
      const changedPersonObject = {...personObject, number: this.state.newNumber}

      if(window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
       personService.update(changedPersonObject).then(updated => {
       const persons = this.state.persons.filter(a => a.id !== changedPersonObject.id).concat(changedPersonObject)
       this.setState({
         persons,
         newName: '',
         newNumber: '',
         msg: `Päivitettiin ${changedPersonObject.name}`
       })})
       .catch(error => {
          this.setState({msg: `Muutettavan henkilön ${changedPersonObject.name} tiedot on jo poistettu`})
       })
      } else {
        this.setState({
          newName: '',
          newNumber: '',
        })
      }

      this.clearMsg()
      
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

        <Ilmoitus msg={this.state.msg}/>

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
