import classes from './DisciplinaCards.module.css';
import axios from 'axios';
import React, {Component} from 'react';
import DisciplinaCard from './DisciplinaCard/DisciplinaCard'
import Tray from  '../Tray/Tray'
import Aux from '../../hoc/Auxiliary'
import Modal from '../UI/Modal/Modal'
import PeriodoSummary from '../PeriodoSummary/PeriodoSummary'
import {NavLink, Route} from 'react-router-dom'
import DisciplinaPage from '../containers/DisciplinaPage/DisciplinaPage'

class DisciplinaCards extends Component{

    

    state = {
        disciplinas: [],
        disciplinas2: [],
        disciplinas3: [],
        disciplinas4: [],
        disciplinas5: [],
        disciplinas6: [],
        disciplinas7: [],
        disciplinas8: [],
        selecao: [],
        cont: 0,
        contDifMed: 0,
        contAval: 0,
        contProjFinal: 0,
        contNCMed: 0,
        Classific: '',
        SelecaoNomes: [],
        periodoMontado: false,
        redirect: false,
        discShow: true,
        disc2Show: true,
        disc3Show: true,
        disc4Show: true,
        disc5Show: true,
        disc6Show: true,
        disc7Show: true,
        disc8Show: true,
        showTray: true,
        trayStatus: '◀'

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
        if(aux == 3){
            aux2 = this.state.disc3Show
            this.setState({disc3Show: !aux2})
        }
        if(aux == 4){
            aux2 = this.state.disc4Show
            this.setState({disc4Show: !aux2})
        }
        if(aux == 5){
            aux2 = this.state.disc5Show
            this.setState({disc5Show: !aux2})
        }
        if(aux == 6){
            aux2 = this.state.disc6Show
            this.setState({disc6Show: !aux2})
        }
        if(aux == 7){
            aux2 = this.state.disc7Show
            this.setState({disc7Show: !aux2})
        }
        if(aux == 8){
            aux2 = this.state.disc8Show
            this.setState({disc8Show: !aux2})
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

    showTrayHandler = () =>{
        let aux = this.state.showTray
        aux = !aux;
        let aux2 = this.state.trayStatus
        if(aux2 === '▶'){
            aux2 = '◀'
        }
        else if(aux2 === '◀'){
            aux2 = '▶'
        }
        this.setState({showTray: aux, trayStatus: aux2})
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
        else if(periodo === 3){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas3[index].id)){
                console.log(this.state.disciplinas3[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas3[index]]
                })
            }
        }
        else if(periodo === 4){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas4[index].id)){
                console.log(this.state.disciplinas4[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas4[index]]
                })
            }
        }
        else if(periodo === 5){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas5[index].id)){
                console.log(this.state.disciplinas5[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas5[index]]
                })
            }
        }
        else if(periodo === 6){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas6[index].id)){
                console.log(this.state.disciplinas7[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas6[index]]
                })
            }
        }
        else if(periodo === 7){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas7[index].id)){
                console.log(this.state.disciplinas7[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas7[index]]
                })
            }
        }
        else if(periodo === 8){
            if(!this.state.selecao.find(element=>element.id===this.state.disciplinas8[index].id)){
                console.log(this.state.disciplinas8[index].id)
                this.setState({
                    selecao: [...this.state.selecao, this.state.disciplinas8[index]]
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
        
        let cont = 0, contPontos = 0, contAvaliacoes = 0, contProjetoFinal = 0, contDificuldade = 0, contNC = 0, Classifica = '', SelecaoNom = [];
        
        cont = this.state.selecao.length
        //console.log(cont)
        for(let i = 0; i < cont; i++){
            contDificuldade = (contDificuldade + this.state.selecao[i].Dificuldade)
            contPontos = contPontos + this.state.selecao[i].Pontos
            contAvaliacoes = contAvaliacoes + this.state.selecao[i].Avaliacoes
            contNC = contNC + this.state.selecao[i].Pontos
            if(this.state.selecao[i].ProjetoFinal >= 0.5){
            contProjetoFinal = contProjetoFinal + 1
            }
            SelecaoNom.push(this.state.selecao[i].Nome)
        }

        contDificuldade = (contDificuldade / cont)
        contDificuldade = +contDificuldade.toFixed(2)
        contNC = (contNC / cont)
        contNC = +contNC.toFixed(2)

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
        this.setState({contDifMed: contDificuldade, contAval: contAvaliacoes, contNCMed: contNC, Classific: Classifica, 
            contProjFinal: contProjetoFinal, SelecaoNomes: SelecaoNom})
    }

    componentDidMount(){
        
        Promise.all([
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas3.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas4.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas5.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas6.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas7.json'),
            axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas8.json')
        ]).then(([res, res2, res3, res4, res5, res6, res7, res8]) => {
            const fetchedDisc = [];
            const fetchedDisc2 = [];
            const fetchedDisc3 = [];
            const fetchedDisc4 = [];
            const fetchedDisc5 = [];
            const fetchedDisc6 = [];
            const fetchedDisc7 = [];
            const fetchedDisc8 = [];
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
            for (let key in res3.data)
            {
                fetchedDisc3.push({
                    ...res3.data[key],
                id: key})
            }
            for (let key in res4.data)
            {
                fetchedDisc4.push({
                    ...res4.data[key],
                id: key})
            }
            for (let key in res5.data)
            {
                fetchedDisc5.push({
                    ...res5.data[key],
                id: key})
            }
            for (let key in res6.data)
            {
                fetchedDisc6.push({
                    ...res6.data[key],
                id: key})
            }
            for (let key in res7.data)
            {
                fetchedDisc7.push({
                    ...res7.data[key],
                id: key})
            }
            for (let key in res8.data)
            {
                fetchedDisc8.push({
                    ...res8.data[key],
                id: key})
            }
            this.setState({disciplinas: fetchedDisc,
                           disciplinas2: fetchedDisc2,
                           disciplinas3: fetchedDisc3,
                           disciplinas4: fetchedDisc4,
                           disciplinas5: fetchedDisc5,
                           disciplinas6: fetchedDisc6,
                           disciplinas7: fetchedDisc7,
                           disciplinas8: fetchedDisc8})
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
                        NC = {this.state.contNCMed}
                        ProjetoFinal = {this.state.contProjFinal}
                        Selecao = {this.state.SelecaoNomes}/>
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
                            name={disc2.Nome}
                            id = {disc2.id}
                            dificuldade={disc2.Dificuldade}
                            NC={disc2.NC}
                            pontos={disc2.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Terceiro Período
                    <button onClick = {() => this.buttonShowHandler(3)} className={classes.Button}>
                        {this.state.disc3Show?('-'):'+'}</button></p>
                    {this.state.disc3Show?(
                        this.state.disciplinas3.map((disc3, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 3)}
                            key={disc3.id.concat("jf")} 
                            name={disc3.Nome}
                            id = {disc3.id}
                            dificuldade={disc3.Dificuldade}
                            NC={disc3.NC}
                            pontos={disc3.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Quarto Período
                    <button onClick = {() => this.buttonShowHandler(4)} className={classes.Button}>
                        {this.state.disc4Show?('-'):'+'}</button></p>
                    {this.state.disc4Show?(
                        this.state.disciplinas4.map((disc4, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 4)}
                            key={disc4.id.concat("jf")} 
                            name={disc4.Nome}
                            id = {disc4.id}
                            dificuldade={disc4.Dificuldade}
                            NC={disc4.NC}
                            pontos={disc4.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Quinto Período
                    <button onClick = {() => this.buttonShowHandler(5)} className={classes.Button}>
                        {this.state.disc5Show?('-'):'+'}</button></p>
                    {this.state.disc5Show?(
                        this.state.disciplinas5.map((disc5, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 5)}
                            key={disc5.id.concat("jf")} 
                            name={disc5.Nome}
                            id = {disc5.id}
                            dificuldade={disc5.Dificuldade}
                            NC={disc5.NC}
                            pontos={disc5.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Sexto Período
                    <button onClick = {() => this.buttonShowHandler(6)} className={classes.Button}>
                        {this.state.disc6Show?('-'):'+'}</button></p>
                    {this.state.disc6Show?(
                        this.state.disciplinas6.map((disc6, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 5)}
                            key={disc6.id.concat("jf")} 
                            name={disc6.Nome}
                            id = {disc6.id}
                            dificuldade={disc6.Dificuldade}
                            NC={disc6.NC}
                            pontos={disc6.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Sétimo Período
                    <button onClick = {() => this.buttonShowHandler(7)} className={classes.Button}>
                        {this.state.disc7Show?('-'):'+'}</button></p>
                    {this.state.disc7Show?(
                        this.state.disciplinas7.map((disc7, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 7)}
                            key={disc7.id.concat("jf")} 
                            name={disc7.Nome}
                            id = {disc7.id}
                            dificuldade={disc7.Dificuldade}
                            NC={disc7.NC}
                            pontos={disc7.Pontos}
                        />
                        ))
                    ):null}
                    <p className = {classes.Breakpoint}>Oitavo Período
                    <button onClick = {() => this.buttonShowHandler(8)} className={classes.Button}>
                        {this.state.disc8Show?('-'):'+'}</button></p>
                    {this.state.disc8Show?(
                        this.state.disciplinas8.map((disc8, index) =>(
                        <DisciplinaCard
                            click = {() => this.addDisciplinaHandler(index, 8)}
                            key={disc8.id.concat("jf")} 
                            name={disc8.Nome}
                            id = {disc8.id}
                            dificuldade={disc8.Dificuldade}
                            NC={disc8.NC}
                            pontos={disc8.Pontos}
                        />
                        ))
                    ):null}
                    
                </div>
                <div className = {classes.SideBar}>
                        {this.state.selecao[0]?<button className = {classes.hideTrayButton} onClick = {() => this.showTrayHandler()}>{this.state.trayStatus}</button>:null}
                        {this.state.showTray && this.state.selecao[0]?<div>
                        {this.state.selecao[0]?<p className = {classes.titleTray}>Período Selecionado</p>:null}
                        {this.state.selecao.map((trayAux, index) =>(
                        <Tray
                        name = {trayAux.Nome}
                        key = {index}
                        click ={() => this.removeDisciplinaHandler(index)}/>
                        ))
                        }
                        {this.state.selecao[0]?(<button className = {classes.Sidebarbutton} onClick = {() => this.clickOkHandler()}>OK</button>):null}
                        </div>:null}    
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