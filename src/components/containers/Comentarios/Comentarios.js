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


    switchTypeHandler = (modo) =>{
        console.log('hello my baby, hello my honey')
        if(modo=='dicas'){
            this.setState({Dicas: true, Sugestao: false, Professor: false})
        }
        else if(modo=='sugestao'){
            this.setState({Dicas: false, Sugestao: true, Professor: false})
        }
        else if(modo=='professor'){
            this.setState({Dicas: false, Sugestao: false, Professor: true})
        }
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
                conteudo={coment.Dicas}
                type={null}
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
                conteudo={coment.Sugestao}
                type ={null}
                />
            )) 
        }
        else if(this.state.Professor){
        auxComent = this.state.coment.map((coment) =>(
            <Comentario
                autor={coment.Autor}
                key={coment.id.concat("jf")}
                professorNome={coment.ProfessorNome}
                conteudo={coment.Professor}
                type = {true}
                />
            ))
        }


        return (
            <div>
                <div>
                <button onClick={() => this.switchTypeHandler('dicas')}>Dicas</button>
                <button onClick={() => this.switchTypeHandler('sugestao')}>Sugestões</button>
                <button onClick={() => this.switchTypeHandler('professor')}>Professores</button>
                </div>
                {auxComent}
            </div>)
    }
}

export default Comentarios