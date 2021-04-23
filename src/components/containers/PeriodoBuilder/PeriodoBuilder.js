import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import DisciplinaCard from '../../DisciplinaCards/DisciplinaCard/DisciplinaCard'
import DisciplinaCards from '../../DisciplinaCards/DisciplinaCards'

class PeriodoBuilder extends Component{
    state = {
        disciplina: [
            {id: "11500", name: "Calculo 1", dificuldade: 3, taxaReprovacao: "18%"},
            {id: "11501", name: "Fisica 1", dificuldade: 4, taxaReprovacao: "28%"},
            {id: "11503", name: "Introdução a Programação", dificuldade: 3, taxaReprovacao: "10%"},
            {id: "11504", name: "Introdução a Computação", dificuldade: 1, taxaReprovacao: "5%"},
            {id: "11505", name: "Calculo Vetorial", dificuldade: 2, taxaReprovacao: "15%"}
        ]
               
    }

    render(){
        return(
            <Aux>
                <div>Periodo</div>
                <DisciplinaCards
                disciplina= {this.state.disciplina}
                />
            </Aux>
        );
    }
}

export default PeriodoBuilder;