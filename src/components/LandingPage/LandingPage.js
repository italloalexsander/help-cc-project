import classes from './LandingPage.module.css'
import React from 'react'
import Logo from '../Logo/Logo'
import {NavLink} from 'react-router-dom'


const LandingPage = (props) =>{
    return(
    <div className={classes.LandingPage}>
        <Logo type = "medio" />
        <p className = {classes.Breakpoint}>O que é essa aplicação?</p>
        <p className = {classes.Texto}>Olá, essa aplicação é chamada Help-cc. Ela foi desenvolvida por Itallo Alexsander da Fonseca Ribeiro, do curso de Ciência da Computação da
        UFPB. O próposito dela é auxiliar a graduação dos estudantes de CC, provendo um espaço de feedback para que eles possam entender melhor a situação
        de cada disciplina que devem percorrer durante o curso. Na aba disciplinas, é possivel ver todas as disciplinas obrigatórias. Ao clicar no nome de
        qualquer uma delas você vai ser levado para uma página com algumas informações adicionais, comentários de outros estudantes, e a possibilidade de
        deixar seu próprio feedback(ao clicar no botão Meu Feedback). Inicialmente o único dado obtido e utilizado aqui é o da taxa de não completude média,
        que seria a taxa de quantas pessoas se matricularam na cadeira, tentaram pagar(ou sejan não dispensaram) e trancaram ou reprovaram. Essa informação
        foi obtida do Trabalho de Conclusão de Curso de Luiz Fernando de Lima, e o ideal é que no futuro esses dados sejam sempre atualizados ao final de cada
        Período. Os outros dados são justamente os recebidos e calculados através do Feedback dos alunos.
        </p>
        <p className = {classes.Breakpoint}>Qual a motivação por trás dela?</p>
        <p className = {classes.Texto}>Como aluno de CC, eu vi em colegas e em mim mesmo a sensação de falta de informação sobre o que nos esperava ao decorrer do curso, assim como uma
        forma mais clara de expor nossas dificuldades. Ao ver o TCC de Luiz Fernando, eu percebi que mostrar para os alunos mais informações sobre o curso não
        seria uma má ideia. Então um local em que os próprios alunos pudessem trazer essas informações, de forma até definir quais sejam mais relevantes, como
        por exemplo a ideia de saber se uma cadeira tem projeto final ou não, poderia ajudar a clarear a nebulosidade do curso para alguns.
        </p>
        <p className = {classes.Breakpoint}>Funcionalidades</p>
        <p className = {classes.Texto}>Como foi dito mais em cima, essa aplicação tem a funcionalidade principal de expor os dados obtidos, sejam ele através de feedback
        ou não. Feedback também é outra funcionalidade, basta ir na página de uma disciplina específica(na aba disciplinas, clique no titulo de um card de uma disciplina), e ao entrar na página
        clicar em "Meu Feedback", no canto superior esquerdo. Outra funcionalidade é a possibilidade de "montar um período", onde na aba disciplinas ao clicar no botão de + ao lado do nome de uma delas, ela é adicionada
        a um tray, que ao clicar em ok, gera um resumo com as informações relevantes do período selecionado(média de dificuldade das cadeiras, quantas avaliações esperar, quantos
        projetos finais, etc.), e com uma classificação para ele: de leve a muito pesado.</p>
        <p className = {classes.Breakpoint}>Futuro</p>
        <p className = {classes.Texto}>O que está aqui é funcional, mas falta bastante para está pronto para ser integrado a uma plataforma como o SIGAA. O ideal seria criar um middleware que conseguisse
        pegar as informações do SIGAA, passar os dados relevantes para essa aplicação e tratar do Login com o SIGAA. Com isso já seria possivel uma integração mais adequada. O middleware poderia ser responsável por alguns
        cálculos de classificação e gerenciamento do banco de dados também, evitando assim que tantas requisições e processamento fizessem parte do front-end</p>
    </div>
    )
}

export default LandingPage