import React from 'react'
import classes from './DadosDisplay.module.css'


const DadosDisplay = (props) =>{
    let auxDif = props.Dificuldade
    let auxProj = null
    let auxPontos = null

    if(props.ProjetoFinal >= 0.5){
        auxProj = 'Sim'
    }

    else{
        auxProj = 'Não'
    }

    if(props.Pontos >= 20){
        auxPontos = 'Muito Pesada'
    }

    else if(props.Pontos >= 15){
        auxPontos = 'Pesada'
    }

    else if(props.Pontos >= 10){
        auxPontos = 'Normal'
    }

    else{
        auxPontos = 'Leve'
    }



    if(auxDif >= 3.5){
        auxDif = '\uD83D\uDCA3\uD83D\uDCA3\uD83D\uDCA3\uD83D\uDCA3'

    }
    else if(auxDif >= 2.5){
        auxDif = '\uD83D\uDCA3\uD83D\uDCA3\uD83D\uDCA3'
    }
    else if(auxDif >= 1.5){
        auxDif = '\uD83D\uDCA3\uD83D\uDCA3'
    }
    else if(auxDif == 1){
        auxDif = '\uD83D\uDCA3'
    }

    return(
        <div>
            <h2 className = {classes.Title}>{props.Nome}</h2>
            <p className = {classes.ButtonParagraph}><button onClick = {props.clicked} className = {classes.Button}>Meu Feedback</button></p>
                
            <div className = {classes.Box}>
                <p>Classificação: {auxPontos}</p>
                <p>Dificuldade: {auxDif}</p>
                <p>Número de Avaliações: {props.Avaliacoes}</p>
                <p>Projeto Final: {auxProj}</p>
                <p>Taxa NC: {props.TaxaNC}%</p>
                <p>Nível de Satisfação Geral: {props.Satisfacao * 100}%
                <p>Feedbacks recebidos: {(props.Respostas)}</p>
                <p className = {classes.Aviso}><br></br>*Todos esses dados com exceção da taxa NC(não completude), foram calculados por média simples a partir do feedback
                dos usuários</p></p>
                
            </div>
            {//<Comentarios/>
            }
        </div>
    )

}

export default DadosDisplay