import axios from 'axios'
import React, {Component} from 'react'
import Comentario from './Comentario/Comentario'
import classes from './Comentarios.module.css'

class Comentarios extends Component{

    state ={
        Dicas: true,
        Sugestao: false,
        Professor: false,
        coment: [],
        color1: 'lightgreen',
        color2: 'white',
        color3: 'white'
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
        if(modo==='dicas'){
            this.setState({Dicas: true, Sugestao: false, Professor: false, color1: 'lightgreen', color2: 'white', color3: 'white'})

        }
        else if(modo==='sugestao'){
            classes.Selecao2 = classes.Selecao
            this.setState({Dicas: false, Sugestao: true, Professor: false, color2: 'lightgreen', color1: 'white', color3: 'white'})
        }
        else if(modo==='professor'){
            this.setState({Dicas: false, Sugestao: false, Professor: true, color3: 'lightgreen', color1: 'white', color2: 'white'})
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
            <div className = {classes.Comentarios}>
                <div >
                <p className = {classes.TituloSecao}>Comentários</p>
                <button style = {{backgroundColor: this.state.color1}} onClick={() => this.switchTypeHandler('dicas')}>Dicas</button>
                <button style = {{backgroundColor: this.state.color2}} onClick={() => this.switchTypeHandler('sugestao')}>Sugestões</button>
                <button style = {{backgroundColor: this.state.color3}} onClick={() => this.switchTypeHandler('professor')}>Professores</button>
                </div>
                <br></br>
                {auxComent}
            </div>)
    }
}

export default Comentarios