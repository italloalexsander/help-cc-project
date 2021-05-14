import React from 'react'
import classes from './DadosDisplay.module.css'


const DadosDisplay = (props) =>{
    let auxDif = props.Dificuldade
    let auxProj = null
    let auxPontos = null

    if(props.ProjetoFinal == 1){
        auxProj = 'Sim'
    }

    else{
        auxProj = 'Não'
    }

    if(props.Pontos >= 11){
        auxPontos = 'Muito Díficil'
    }

    else if(props.Pontos >= 8){
        auxPontos = 'Díficil'
    }

    else if(props.Pontos >= 5){
        auxPontos = 'Médio'
    }

    else{
        auxPontos = 'Fácil'
    }



    if(auxDif >= 3.5){
        auxDif = '\u2b50\u2b50\u2b50\u2b50'

    }
    else if(auxDif >= 2.5){
        auxDif = '\u2b50\u2b50\u2b50'
    }
    else if(auxDif >= 1.5){
        auxDif = '\u2b50\u2b50'
    }
    else if(auxDif == 1){
        auxDif = '\u2b50'
    }

    return(
        <div>
            <h2 className = {classes.Title}>{props.Nome}</h2>
            <p className = {classes.ButtonParagraph}><button className = {classes.Button}>Meu Feedback</button></p>
                
            <div className = {classes.Box}>
                <p>Classificação: {auxPontos}</p>
                <p>Dificuldade: {auxDif}</p>
                <p>Número de Avaliações: {props.Avaliacoes}</p>
                <p>Projeto Final: {auxProj}</p>
                <p>Taxa NC: {props.TaxaNC}</p>
                <p>Comentários:</p>
            </div>
            {//<Comentarios/>
            }
        </div>
    )

}

export default DadosDisplay