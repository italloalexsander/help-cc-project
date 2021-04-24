import classes from './DisciplinaCard.module.css'
import React from 'react'


const DisciplinaCard = (props) =>(
    <div className = {classes.DisciplinaCard}>
        <p>{props.name} <button>+</button></p>
        <p className = {classes.LinhaDivisora}>--------</p>
        <p>Dificuldade: {props.dificuldade}</p>
        <p>Taxa NC: {props.NC} </p>
    </div>
        
)
//{id: "11500", name: "Calculo 1", dificuldade: 3, taxaReprovacao: "18%"}



export default DisciplinaCard