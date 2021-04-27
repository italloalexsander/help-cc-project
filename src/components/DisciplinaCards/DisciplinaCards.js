import classes from './DisciplinaCards.module.css';
import axios from 'axios';
import React, {Component} from 'react';
import DisciplinaCard from './DisciplinaCard/DisciplinaCard'
import Tray from  '../Tray/Tray'

class DisciplinaCards extends Component{
    state = {
        disciplinas: [],
        disciplinas2: [],
        selecao: []
    }

    addDisciplinaHandler(index){
        console.log(this.state.disciplinas[index])
        this.setState({
            selecao: [...this.state.selecao, this.state.disciplinas[index]]
        })
    }

    addDisciplinaHandler2(index){
        console.log(this.state.disciplinas2[index])
        this.setState({
            selecao: [...this.state.selecao, this.state.disciplinas2[index]]
        })
    }

    componentDidMount(){
        
        Promise.all([
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2.json')
        ]).then(([res, res2]) => {
            const fetchedDisc = [];
            const fetchedDisc2 = [];
            for (let key in res.data)
            {
                fetchedDisc.push({
                    ...res.data[key],
                id: key})
            };
            for (let key in res2.data)
            {
                fetchedDisc2.push({
                    ...res2.data[key],
                id: key})
            }
            this.setState({disciplinas: fetchedDisc,
                                disciplinas2: fetchedDisc2})
        })

        /*
        const fetchedDisc = [];
        const fetchedDisc2 = [];
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json')
        .then(res => {
            
            for (let key in res.data)
            {
                fetchedDisc.push({
                    ...res.data[key],
                id: key})
            };
            this.setState({disciplinas: fetchedDisc})
        })
        //axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2.json')
        /*.then(res2 => {
            for (let key in res2.data)
            {
                fetchedDisc2.push({
                    ...res2.data[key],
                id: key})
            }
            //this.setState({disciplinas2: fetchedDisc2})
        })*/
        
    }
    render(){
        return (
            <div>
                <p className = {classes.Breakpoint}>Primeiro Período</p>
                {this.state.disciplinas.map((disc, index) =>(
                <DisciplinaCard
                    click = {() => this.addDisciplinaHandler(index)}
                    key={disc.id.concat("jf")} 
                    name={disc.id}
                    dificuldade={disc.Dificuldade}
                    NC={disc.NC}
                    pontos={disc.Pontos}
                />) )
                }
                <p className = {classes.Breakpoint}>Segundo Período</p>
                {this.state.disciplinas2.map((disc2, index) =>(
                <DisciplinaCard
                    click = {() => this.addDisciplinaHandler2(index)}
                    key={disc2.id.concat("jf")} 
                    name={disc2.id}
                    dificuldade={disc2.Dificuldade}
                    NC={disc2.NC}
                    pontos={disc2.Pontos}
                />))
                }
                {this.state.selecao.map((trayAux, index) =>(
                <Tray
                name = {trayAux.id}
                key = {index}/>
                ))}       
            </div>

        )
        /*return this.props.disciplinas.map(disciplina =>()
            return <DisciplinaCard
            name = {disc.getOwnPropertyNames}
            key = {disc.id}
            dificuldade = {disc.dificuldade}
            taxaReprovacao = {disc.taxaReprovacao}

            />
        }*/
    }
    
}

export default DisciplinaCards;