import React from 'react'

const Kurssi = (props) => {
    return (
      <div>
        <Otsikko otsikko={props.kurssi.nimi}/>
        <Sisalto sisalto={props.kurssi.osat}/>
        <Yhteensa osat={props.kurssi.osat}/>
      </div>
    )
    }

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
    }
    
const Yhteensa = (props) => {
    let summa = props.osat.reduce((acc, curr) => {
        return curr.tehtavia + acc
    }, 0)

    return (
        <div>
        <p> Yhteensä {summa} tehtävää</p>
        </div>
    )
}
    
const Sisalto = (props) => {
    return (
        <div>
        {props.sisalto.map(a => <Osa key={a.id} nimi={a.nimi} tehtavia={a.tehtavia}/>)}
        </div>
    )
}
    
const Otsikko = (props) => {
    return (
        <h1> {props.otsikko} </h1>
    )
}

export default Kurssi