import classes from './Comentario.module.css'
import React from 'react'

const Comentario = (props) =>{
    return(
        <div className = {classes.Comentario}>
            <div className = {classes.Nome}>Autor: {props.autor}</div>
            {props.type?(<div className = {classes.Nome}>Docente: {props.professorNome}</div>):null}
            <div className = {classes.Conteudo}>{props.conteudo}</div>         
        </div>
    )
}

export default Comentario;