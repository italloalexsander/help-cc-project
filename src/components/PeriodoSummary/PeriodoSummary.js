import React from 'react'
import classes from './PeriodoSummary.module.css'

const periodoSummary = (props) =>{

    
    const listItems = props.Selecao.map((number) =>
    <li>{number}</li>)

    return(
    <div className = {classes.PeriodoSummary}>
        <h1 className = {classes.Titulo}>Seu Período</h1>
        <h3 className = {classes.Subtitulo}>Você selecionou:</h3>
        <ul className = {classes.List}>{listItems}</ul>
        <h3 className = {classes.Subtitulo}>Seu período terá:</h3>
        <p>{props.DificuldadeMed} de 4 de Dificuldade média</p>
        <p>{props.Avaliacoes} Avaliacoes</p>
        <p>{props.ProjetoFinal} Projetos Finais</p>
        <p>{props.NC}% de Taxa de Não Completude Média</p>
        <p>A classificação dele é: {props.Classificacao}</p>
    </div>
    )
}

export default periodoSummary