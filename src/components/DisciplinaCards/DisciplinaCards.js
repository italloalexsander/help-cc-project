import axios from 'axios';
import React, {Component} from 'react';
import DisciplinaCard from './DisciplinaCard/DisciplinaCard'

class DisciplinaCards extends Component{
    state = {
        disciplinas: []
    }

    componentDidMount(){
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json')
        .then(res => {
            const fetchedDisc = [];
            for (let key in res.data)
            {
                fetchedDisc.push({
                    ...res.data[key],
                id: key})
            };
            this.setState({disciplinas: fetchedDisc})
        })
        
    }
    render(){
        return (
            <div>
                {this.state.disciplinas.map(disc =>(
                <DisciplinaCard
                    key={disc.id.concat("jf")} 
                    name={disc.id}
                    dificuldade={disc.Dificuldade}
                    NC={disc.NC}
                />) )}
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