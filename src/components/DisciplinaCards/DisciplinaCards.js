import classes from './DisciplinaCards.module.css';
import axios from 'axios';
import React, {Component} from 'react';
import DisciplinaCard from './DisciplinaCard/DisciplinaCard'
import Tray from  '../Tray/Tray'
import Aux from '../../hoc/Auxiliary'
import Modal from '../UI/Modal/Modal'
import PeriodoSummary from './PeriodoSummary'
import {NavLink, Route} from 'react-router-dom'
import DisciplinaPage from '../containers/DisciplinaPage/DisciplinaPage'

class DisciplinaCards extends Component{

    

    state = {
        disciplinas: [],
        disciplinas2: [],
        selecao: [],
        cont: 0,
        contDifMed: 0,
        contAval: 0,
        contProjFinal: 0,
        contNCMed: 0,
        Classific: '',
        periodoMontado: false,
        redirect: false,
        discShow: true,
        disc2Show: true

    }

    //fazer um genérico da função que irá adicionar no array certo
    
    buttonShowHandler = (aux) =>{
        let aux2 = null;
        if(aux == 1){
            aux2 = this.state.discShow
            this.setState({discShow: !aux2})
        }
        if(aux == 2){
            aux2 = this.state.disc2Show
            this.setState({disc2Show: !aux2})
        }
    }

    clickOkHandler = () => {
        this.periodoMontadoHandler();
        this.geraPeriodoHandler();
    }
    periodoMontadoHandler = () => {
        this.setState({periodoMontado: true})
    }

    periodoMontadoCancelHandler = () => {
        this.setState({periodoMontado: false})
    }

    addDisciplinaHandler(index, periodo){
        if(periodo === 1){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas[index].id)){
                console.log(this.state.disciplinas[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas[index]]
                })
            }
        }
        else if(periodo === 2){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas2[index].id)){
                console.log(this.state.disciplinas2[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas2[index]]
                })
            }
        }
        /*console.log(this.state.disciplinas[index])
        this.setState({
            selecao: [...this.state.selecao, this.state.disciplinas[index]]
        })*/
    }

    removeDisciplinaHandler(index){
        const selecaoAux = this.state.selecao
        selecaoAux.splice(index, 1)
        this.setState({
            selecao: selecaoAux
        }
        )
        
    }

    geraPeriodoHandler(){
        
        let cont = 0, contPontos = 0, contAvaliacoes = 0, contProjetoFinal = 0, contDificuldade = 0, contNC = 0, Classifica = '';
        
        cont = this.state.selecao.length
        //console.log(cont)
        for(let i = 0; i < cont; i++){
            contDificuldade = (contDificuldade + this.state.selecao[i].Dificuldade)
            contPontos = contPontos + this.state.selecao[i].Pontos
            contAvaliacoes = contAvaliacoes + this.state.selecao[i].Avaliacoes
            contNC = contNC + this.state.selecao[i].Pontos
            //contProjetoFinal = contProjetoFinal + selecaoAux[i].Projeto_Final
        }

        contDificuldade = (contDificuldade / cont)
        contNC = (contNC / cont)

        //console.log(contDificuldade)
        if (contPontos > 66){
            console.log("Seu periodo vai ser bem pesado com " + contAvaliacoes + "avaliacoes, e com dificuldade média de" + contDificuldade)
            Classifica = 'Muito Pesado'
        }
        else if (contPontos > 48){
            console.log("Seu periodo vai ser pesado com " + contAvaliacoes + "avaliacoes, e com dificuldade média de" + contDificuldade)
            Classifica = 'Pesado'
        }
        else if (contPontos > 30){
            console.log("Seu periodo vai ser normal com " + contAvaliacoes + "avaliacoes, e com dificuldade média de" + contDificuldade)
            Classifica = 'Normal'
        }
        else{
            console.log("Seu periodo vai ser leve com " + contAvaliacoes + "avaliacoes, e com dificuldade média de" + contDificuldade)
            Classifica = 'Leve'
        }
        this.setState({contDifMed: contDificuldade, contAval: contAvaliacoes, contNCMed: contNC, Classific: Classifica})
    }

    componentDidMount(){
        
        Promise.all([
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2.json')
        ]).then(([res, res2]) => {
            const fetchedDisc = [];
            const fetchedDisc2 = [];
            for (let key in res.data)
            {
                fetchedDisc.push({
                    ...res.data[key],
                id: key})
            };
            for (let key in res2.data)
            {
                fetchedDisc2.push({
                    ...res2.data[key],
                id: key})
            }
            this.setState({disciplinas: fetchedDisc,
                                disciplinas2: fetchedDisc2})
        })

        /*
        const fetchedDisc = [];
        const fetchedDisc2 = [];
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json')
        .then(res => {
            
            for (let key in res.data)
            {
                fetchedDisc.push({
                    ...res.data[key],
                id: key})
            };
            this.setState({disciplinas: fetchedDisc})
        })
        //axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2.json')
        /*.then(res2 => {
            for (let key in res2.data)
            {
                fetchedDisc2.push({
                    ...res2.data[key],
                id: key})
            }
            //this.setState({disciplinas2: fetchedDisc2})
        })*/
        
    }

    
    render(){
        return (
            <Aux>
                <div className = {classes.DisciplinaCards}>
                    <Modal show={this.state.periodoMontado} modalClosed={this.periodoMontadoCancelHandler}>
                        <PeriodoSummary
                        DificuldadeMed = {this.state.contDifMed}
                        Classificacao = {this.state.Classific}
                        Avaliacoes = {this.state.contAval}
                        NC = {this.state.contNCMed}/>
                    </Modal>
                    <p className = {classes.Breakpoint}>Primeiro Período 
                    <button onClick={() => this.buttonShowHandler(1)} className={classes.Button}>
                        {this.state.discShow?('-'):'+'}</button>
                    </p>
                    {this.state.discShow?(
                        this.state.disciplinas.map((disc, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 1)}
                            key={disc.id.concat("jf")} 
                            name={disc.Nome}
                            id = {disc.id}
                            dificuldade={disc.Dificuldade}
                            NC={disc.NC}
                            pontos={disc.Pontos}
                        />
                        
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Segundo Período
                    <button onClick = {() => this.buttonShowHandler(2)} className={classes.Button}>
                        {this.state.disc2Show?('-'):'+'}</button></p>
                    {this.state.disc2Show?(
                        this.state.disciplinas2.map((disc2, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 2)}
                            key={disc2.id.concat("jf")} 
                            name={disc2.id}
                            dificuldade={disc2.Dificuldade}
                            NC={disc2.NC}
                            pontos={disc2.Pontos}
                        />
                        
                        ))
                    ):null}
                    
                </div>
                <div className = {classes.SideBar}>
                        {this.state.selecao.map((trayAux, index) =>(
                        <Tray
                        name = {trayAux.Nome}
                        key = {index}
                        click ={() => this.removeDisciplinaHandler(index)}/>
                        ))
                        }
                        <button onClick = {() => this.clickOkHandler()}>OK</button>       
                </div>            
            </Aux>

        )
        /*return this.props.disciplinas.map(disciplina =>()
            return <DisciplinaCard
            name = {disc.getOwnPropertyNames}
            key = {disc.id}
            dificuldade = {disc.dificuldade}
            taxaReprovacao = {disc.taxaReprovacao}

            />
        }*/
    }
    
}

export default DisciplinaCards;