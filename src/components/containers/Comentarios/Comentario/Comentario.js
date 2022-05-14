import classes from './Comentario.module.css'
import React from 'react'

const Comentario = (props) =>{
    console.log('Conteudo' + props.conteudo)
    let post = null;
    if(props.conteudo){
        post =  <div className = {classes.Comentario}>
                <div className = {classes.Nome}>Autor: {props.autor}</div>
                {props.type?(<div className = {classes.Nome}>Docente: {props.professorNome}</div>):null}
                <div className = {classes.Conteudo}>{props.conteudo}</div>         
                </div>
    }
    return(
    <div>
        {post}
    </div>
    )
}

export default Comentario;