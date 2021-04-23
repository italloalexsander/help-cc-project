import React, {Component} from 'react';
import DisciplinaCard from './DisciplinaCard/DisciplinaCard'

class DisciplinaCards extends Component{
    render(){
        return this.props.disciplina.map((disc, index)=>{
            return <DisciplinaCard
            name = {disc.name}
            key = {disc.id}
            dificuldade = {disc.dificuldade}
            taxaReprovacao = {disc.taxaReprovacao}

            />
        }
        );
    }
    
}

export default DisciplinaCards;