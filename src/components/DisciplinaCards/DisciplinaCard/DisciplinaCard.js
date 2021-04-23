import classes from './DisciplinaCard.module.css'
import React, {Component} from 'react'


class DisciplinaCard extends Component{
    
    render(){
        return(
        <div className = {classes.DisciplinaCard}>
            <p>{this.props.name} <button>+</button></p>
            <p>Dificuldade Estimada: {this.props.dificuldade}</p>
            <p>Taxa de reprovação/desistência: {this.props.taxaReprovacao} </p>
        </div>
        )
    }
//{id: "11500", name: "Calculo 1", dificuldade: 3, taxaReprovacao: "18%"}

}

export default DisciplinaCard