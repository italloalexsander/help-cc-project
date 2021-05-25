import axios from 'axios'
import React, {Component} from 'react'

class Comentarios extends Component{

    state ={
        Dicas: true,
        Sugestao: false,
        Professor: false,
        coment: []
    }

    /*componentDidMount(){
        axios.get().then(response=>{

        })   
    }Ajeitar depois*/


    render(){



        return (
            <div>
                <p>Comentários/Dicas/Sugestões:</p>
            </div>)
    }
}

export default Comentarios