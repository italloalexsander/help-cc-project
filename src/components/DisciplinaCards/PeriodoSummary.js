import React from 'react'

const periodoSummary = (props) =>{
    return(
    <div>
        <h1>Seu Período</h1>
        <p>Você selecionou:</p>
        <p>{props.Selecao}</p>
        <p>Seu período terá:</p>
        <p>{props.DificuldadeMed} de 4 de Dificuldade</p>
        <p>{props.Avaliacoes} Avaliacoes</p>
        <p>{props.ProjetoFinal} Projetos Finais</p>
        <p>{props.NC}% de Taxa de Não Completude Média</p>
        <p>A classificação dele é: {props.Classificacao}</p>
    </div>
    )
}

export default periodoSummary