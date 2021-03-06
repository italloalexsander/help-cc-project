//import axios from 'axios';
import React, {Component} from 'react';
//import Aux from '../../../hoc/Auxiliary';
//import DisciplinaCard from '../../DisciplinaCards/DisciplinaCard/DisciplinaCard'
import DisciplinaCards from '../../DisciplinaCards/DisciplinaCards'
import classes from './PeriodoBuilder.module.css'

class PeriodoBuilder extends Component{
    state = {
        /*disciplina: [
            {id: "11500", name: "Calculo 1", dificuldade: 3, taxaReprovacao: "18%"},
            {id: "11501", name: "Fisica 1", dificuldade: 4, taxaReprovacao: "28%"},
            {id: "11503", name: "Introdução a Programação", dificuldade: 3, taxaReprovacao: "10%"},
            {id: "11504", name: "Introdução a Computação", dificuldade: 1, taxaReprovacao: "5%"},
            {id: "11505", name: "Calculo Vetorial", dificuldade: 2, taxaReprovacao: "15%"}
        ],
        disciplina2: [{ala: "24", pop: "25"},
                        {ala: "25", pop:"26"}]
         */      
    }

    /*componentDidMount(){
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas/Calculo%20Vetorial.json')
        .then(response => {this.setState({disciplina2: response.data})}
        )
    }*/

    objectHandler(disc){
        return disc[0];
    }

    render(){
        return(
            <div className = {classes.PeriodoBuilder}>
                    <p className = {classes.Info}>Obs: Taxa NC refere-se a soma de reprovação, trancamento e desistência de cada cadeira em primeiras tentativas</p>
                    <p className = {classes.Info}>*: Dificuldade média estimada pela votação dos alunos</p>
                    <div className = {classes.Legenda}>
                        <span className = {classes.Legenda}>Legenda: </span>
                        <span className = {classes.Legenda1}>■ Fácil </span>
                        <span className = {classes.Legenda2}>■ Média </span>
                        <span className = {classes.Legenda3}>■ Pesada </span>
                        <span className = {classes.Legenda4}>■ Muito pesada</span>
                    </div>
                    <DisciplinaCards/>
            </div>
        );
    }
}

export default PeriodoBuilder;