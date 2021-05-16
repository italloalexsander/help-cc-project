import React, {Component} from 'react';
import axios from 'axios';
import DadosDisplay from '../../DadosDisplay/DadosDisplay'
import classes from './DisciplinaPage.module.css'

class DisciplinaPage extends Component{
    state = {
        disciplinaAtual: [],
        id: '1001'

    }

    componentDidMount(){
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas/' + this.props.match.params.id + '.json').
            then(response =>{
                this.setState({disciplinaAtual: response.data})
            })
    }
    
    render(){
        return(
        <div className = {classes.DisciplinaPage}>
            <DadosDisplay
            Nome = {this.state.disciplinaAtual.Nome}
            Dificuldade = {this.state.disciplinaAtual.Dificuldade}
            Avaliacoes = {this.state.disciplinaAtual.Avaliacoes}
            TaxaNC = {this.state.disciplinaAtual.NC}
            Pontos = {this.state.disciplinaAtual.Pontos}
            ProjetoFinal = {this.state.disciplinaAtual.ProjetoFinal}
            />
        </div>

        )

    }
}

export default DisciplinaPage

