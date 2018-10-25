import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filtteri = (props) => {
  return (
    <div>
    Rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const InfoArea = (props) => {
  // console.log(props.countriesToShow);
  
  if(props.countriesToShow.length === 1) {
    const countryData = props.countriesToShow[0]
    return (
      <div>
        <p> {countryData.name} </p>
        <p>Capital: {countryData.capital}</p>
        <p>Population: {countryData.population}</p>
        <img src={countryData.flag}/>
        
      </div>
    )
  } else if (props.countriesToShow.length === props.originLength){
    return(
      <div>

      </div>
    )
  } else if(props.countriesToShow.length > 9) {
    return (
      <div> 
        <p> Too many matches, specify another filter </p>
      </div>
    )
  } else {
    return (
      <div>
      { props.countriesToShow.map((a, index) => <p key={a.name+index}> {a.name} </p>) }
      </div>
      
    )
  }
  
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
    }
  }

  handleCountriesChange(countries) {
    this.setState({
      countries: countries
    })
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      this.handleCountriesChange(res.data)
    })
    
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    const countriesToShow = this.state.countries.filter(a => a.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Countries</h2>
        <Filtteri filter={this.state.filter} handleFilterChange={this.handleFilterChange}/>
        <InfoArea countriesToShow={countriesToShow} originLength={this.state.countries.length}/>
      </div>
    )
  }
}

// export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)