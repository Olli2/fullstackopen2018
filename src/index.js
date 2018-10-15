import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <h2>{props.kurssi.nimi}</h2>
      </div>
    )
  }

  const Yhteensa = (props) => {
    return (
      <div>
        <p>Yhteensä: {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}</p>
      </div>
    )
  }

  const Osa = (props) => {
    return (
        <div>
            <p> {props.osa} </p>
        </div>
    )
  }

  const Sisalto = (props) => {
    return (
      <div>
        <Osa osa={props.osat[0].nimi}/>
        <Osa osa={props.osat[1].nimi}/>
        <Osa osa={props.osat[2].nimi}/>
      </div>
    )
  }

  const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]
    }
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)