import React, {Component} from 'react';
import axios from 'axios';
import DadosDisplay from '../../DadosDisplay/DadosDisplay'
import classes from './DisciplinaPage.module.css'
import Comentarios from './Comentarios'

class DisciplinaPage extends Component{
    state = {
        disciplinaAtual: []

    }

    componentDidMount(){
        if(this.props.match.params.id < 1006 && this.props.match.params.id >= 1001)
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas/' + this.props.match.params.id + '.json').
            then(response =>{
                this.setState({disciplinaAtual: response.data})
            })
        else if(this.props.match.params.id < 1012 && this.props.match.params.id >= 1006)
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2/' + this.props.match.params.id + '.json').
            then(response =>{
                this.setState({disciplinaAtual: response.data})
            })
    }
    
    render(){
        return(
        <div className = {classes.DisciplinaPage}>
            <DadosDisplay
            Nome = {this.state.disciplinaAtual.NomeCompleto}
            Dificuldade = {this.state.disciplinaAtual.Dificuldade}
            Avaliacoes = {this.state.disciplinaAtual.Avaliacoes}
            TaxaNC = {this.state.disciplinaAtual.NC}
            Pontos = {this.state.disciplinaAtual.Pontos}
            ProjetoFinal = {this.state.disciplinaAtual.ProjetoFinal}
            Satisfacao = {this.state.disciplinaAtual.Satisf}
            />
            <Comentarios/>
        </div>

        )

    }
}

export default DisciplinaPage

