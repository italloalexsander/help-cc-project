import axios from 'axios'
import React, {Component} from 'react'
import Comentario from './Comentario/Comentario'

class Comentarios extends Component{

    state ={
        Dicas: true,
        Sugestao: false,
        Professor: false,
        coment: []
    }

    componentDidMount(){
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Comentarios/' + this.props.id + '.json')
        .then(res=>{
            const fetchedComent = [];
            for (let key in res.data)
            {
                fetchedComent.push({
                    ...res.data[key],
                id: key})
            };
            this.setState({coment: fetchedComent})
        })   
    }


    render(){
        let auxComent = null
        if(this.state.Dicas){
        auxComent = 
            this.state.coment.map((coment) =>(
            <Comentario
                autor={coment.Autor}
                key={coment.id.concat("jf")}
                professorNome={coment.ProfessorNome}
                conteudo={coment.Professor}
                />
            ))
        }
        else if(this.state.Sugestao){
        auxComent =
            this.state.coment.map((coment) =>(
            <Comentario
                autor={coment.Autor}
                key={coment.id.concat("jf")}
                professorNome={coment.ProfessorNome}
                conteudo={coment.Professor}
                />
            )) 
        }
        else if(this.state.Professor){
            this.state.coment.map((coment) =>(
            <Comentario
                autor={coment.Autor}
                key={coment.id.concat("jf")}
                professorNome={coment.ProfessorNome}
                conteudo={coment.Professor}
                />
            ))
        }

        return (
            <div>
                <div>
                <button>Dicas</button>
                <button>Sugestões</button>
                <button>Professores</button>
                </div>
                {auxComent}
            </div>)
    }
}

export default Comentarios