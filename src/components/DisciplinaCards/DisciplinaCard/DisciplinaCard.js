import classes from './DisciplinaCard.module.css'
import React from 'react'


const DisciplinaCard = (props) =>{

    let styles = ""

    /*if(props.pontos > 11){
        return(
        <div className = {classes.DisciplinaCard}>
            <p>{props.name} <button onClick={props.click}>+</button></p>
            <p className = {classes.LinhaDivisora}>--------</p>
            <p>Dificuldade: {props.dificuldade}</p>
            <p>Taxa NC: {props.NC} </p>
        </div>)
    }
    else if(props.pontos > 8){
        return(
        <div className = {classes.DisciplinaCard2}>
            <p>{props.name} <button>+</button></p>
            <p className = {classes.LinhaDivisora}>--------</p>
            <p>Dificuldade: {props.dificuldade}</p>
            <p>Taxa NC: {props.NC} </p>
        </div>
        )
    }
    else if(props.pontos > 5){
        return(
        <div className = {classes.DisciplinaCard3}>
            <p>{props.name} <button>+</button></p>
            <p className = {classes.LinhaDivisora}>--------</p>
            <p>Dificuldade: {props.dificuldade}</p>
            <p>Taxa NC: {props.NC} </p>
        </div>
        )
    }
    else if(props.pontos < 5){
        return(
        <div className = {classes.DisciplinaCard4}>
            <p>{props.name} <button>+</button></p>
            <p className = {classes.LinhaDivisora}>--------</p>
            <p>Dificuldade: {props.dificuldade}</p>
            <p>Taxa NC: {props.NC} </p>
        </div>
        )
    }*/

    let assignedClasses = [];

    if (props.pontos > 11){
        assignedClasses = classes.DisciplinaCard
    }

    else if (props.pontos > 8){
        assignedClasses = classes.DisciplinaCard2
    }

    else if (props.pontos > 5){
        assignedClasses = classes.DisciplinaCard3
    }

    else if (props.pontos < 5){
        assignedClasses = classes.DisciplinaCard4
    }

    return(
        <div className = {assignedClasses} onClick = {props.redirect}>
            <p>{props.name} <button onClick={props.click}>+</button></p>
            <p className = {classes.LinhaDivisora}>--------</p>
            <p>Dificuldade: {props.dificuldade}</p>
            <p>Taxa NC: {props.NC} </p>
        </div>)
        
}
//{id: "11500", name: "Calculo 1", dificuldade: 3, taxaReprovacao: "18%"}



export default DisciplinaCard