import React, {Component} from 'react';
import axios from 'axios';
import DadosDisplay from '../../DadosDisplay/DadosDisplay'
import classes from './DisciplinaPage.module.css'
import Comentarios from '../Comentarios/Comentarios'
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class DisciplinaPage extends Component{
    state = {
        disciplinaAtual: [],
        dataAuxiliar: [],
        meuFeedbackOpen: false,
        feedback: {
            Dificuldade_est: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: ''},
                        {value: 1, displayValue: 'Fácil'},
                        {value: 2, displayValue: 'Normal'},
                        {value: 3, displayValue: 'Dificil'},
                        {value: 4, displayValue: 'Muito Dificil'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            Avaliacoes_est: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: ''},
                        {value: 1, displayValue: 'Uma'},
                        {value: 2, displayValue: 'Duas'},
                        {value: 3, displayValue: 'Três'},
                        {value: 4, displayValue: 'Quatro ou mais'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            Projeto_Final: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'NADA', displayValue: ''},
                        {value: 1, displayValue: 'Sim'},
                        {value: 0, displayValue: 'Não'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            Satisfacao_est: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'NADA', displayValue: ''},
                        {value: 1, displayValue: 'Sim'},
                        {value: 0, displayValue: 'Não'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            Dica:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'Comentário',
                    placeholder: 'Como estudar/Se preparar/Etc...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
                },
            Sugestao:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'Comentário',
                    placeholder: 'Possíveis melhoras na ementa/Forma de avaliação/Etc...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
             },
             Experiencia:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'Comentário',
                    placeholder: 'Se era acessivel/Tinha boa didática/Etc...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
             },
            NomeDoProfessor:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome do Docente'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },

        } 
    }
    
            
    

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFeedback = {
            ...this.state.feedback
        };
        const updatedFormElement = { 
            ...updatedFeedback[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFeedback[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedFeedback) {
            formIsValid = updatedFeedback[inputIdentifier].valid && formIsValid;
        }
        this.setState({feedback: updatedFeedback, formIsValid: formIsValid});
    }

    componentDidMount(){
        this.getDataHandler();
        
    }

    

    getDataHandler(){
        if(this.props.match.params.id < 1006 && this.props.match.params.id >= 1001)
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas/' + this.props.match.params.id + '.json').
            then(response =>{

                this.setState({disciplinaAtual: response.data})
            })
        else if(this.props.match.params.id < 1012 && this.props.match.params.id >= 1006)
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2/' + this.props.match.params.id + '.json').
            then(response =>{
                this.setState({disciplinaAtual: response.data})
            })  
    }
    
    openFeedbackHandler = () =>{
        this.setState({meuFeedbackOpen: true})
    }

    closeFeedbackHandler = () => {
        this.setState({meuFeedbackOpen: false})
    }

    commentDataHandler(data){
        axios.put('https://help-cc-default-rtdb.firebaseio.com/Comentarios/' + this.props.match.params.id + '/' + this.props.username + '.json?auth=' + this.props.token,
        {
            Dicas: data[4].config.value,
            Sugestao: data[5].config.value,
            Professor: data[6].config.value,
            ProfessorNome: data[7].config.value,
            Autor: this.props.username
        })
    }
    

    auxDataHandler(data){
    
        let auxDif = 0, auxAva = 0, auxProj = 0, auxSatisf = 0, tam = 0, auxPontos = 0;
        tam = this.state.dataAuxiliar.length;
        console.log('tam = ' + tam)
        console.log('auxDif = ' + auxDif + ' auxAva = ' + auxAva + ' auxProj = ' + ' auxSatisf = ' + auxSatisf)
        for(let i = 0; i < tam; i++){
            auxDif = auxDif + parseFloat(this.state.dataAuxiliar[i].Dificuldade)
            auxAva = auxAva + parseFloat(this.state.dataAuxiliar[i].Avaliacoes)
            auxProj = auxProj + parseFloat(this.state.dataAuxiliar[i].ProjetoFinal)
            auxSatisf = auxSatisf + parseFloat(this.state.dataAuxiliar[i].Satisf)
        }

        console.log('auxDif = ' + auxDif + ' auxAva = ' + auxAva + ' auxProj = ' + ' auxSatisf = ' + auxSatisf)

        auxDif = parseFloat((auxDif))/tam
        auxAva = parseFloat((auxAva))/tam
        auxProj =  parseFloat((auxProj))/tam
        auxSatisf = parseFloat((auxSatisf))/tam


        auxPontos = (3*auxDif) + (2*auxAva) + 3*(auxProj)
        if(this.props.match.params.id < 1006 && this.props.match.params.id >= 1001){
            axios.put('https://help-cc-default-rtdb.firebaseio.com/Disciplinas/' + this.props.match.params.id + '.json?auth=' + this.props.token,

                {
                    NomeCompleto: this.state.disciplinaAtual.NomeCompleto,
                    Nome: this.state.disciplinaAtual.Nome,
                    NC: this.state.disciplinaAtual.NC,
                    Apr: this.state.disciplinaAtual.Apr,
                    Dificuldade: auxDif,
                    Avaliacoes: auxAva,
                    ProjetoFinal: auxProj,
                    Satisf: auxSatisf,
                    id: this.state.disciplinaAtual.id,
                    Pontos: auxPontos,
                    Periodo: 1,
                    Respostas: tam
                }
            
            )
        }
        else if(this.props.match.params.id < 1012 && this.props.match.params.id >= 1006){
            axios.put('https://help-cc-default-rtdb.firebaseio.com/Disciplinas2/' + this.props.match.params.id + '.json?auth=' + this.props.token,        
                {
                    NomeCompleto: this.state.disciplinaAtual.NomeCompleto,
                    Nome: this.state.disciplinaAtual.Nome,
                    NC: this.state.disciplinaAtual.NC,
                    Apr: this.state.disciplinaAtual.Apr,
                    Dificuldade: auxDif,
                    Avaliacoes: auxAva,
                    ProjetoFinal: auxProj,
                    Satisf: auxSatisf,
                    id: this.state.disciplinaAtual.id,
                    Pontos: auxPontos,
                    Periodo: 2,
                    Respostas: tam
                }
            
            )
        }
        this.commentDataHandler(data);
    
    }

    updateDataHandler = (data) => {
        let auxDif = 0, auxAva = 0, auxProj = 0, auxSatisf = 0, tam = 0;
        console.log('Hi there')
        let fetchedData = [], auxData = [];
        axios.get('https://help-cc-default-rtdb.firebaseio.com/Feedback/' + this.props.match.params.id + '.json')
        .then((res) => {
            
            for (let key in res.data)
            {
                fetchedData.push({
                    ...res.data[key],
                id: key})
            }
            this.setState({dataAuxiliar: fetchedData});
        })
        .then((res)=>{
            this.auxDataHandler(data)
        })

    }



    submitButtonHandler = (event,data) => {
        event.preventDefault();
        //const updateData = this.updateDataHandler(data);
        if(this.state.disciplinaAtual.Periodo == 1){
            axios.put('https://help-cc-default-rtdb.firebaseio.com/Feedback/' + this.props.match.params.id + '/' + this.props.userId + '.json?auth=' + this.props.token, {
                /*
                DifCount: updateData[0],
                Dificuldade: updateData[1],
                AvaCount: updateData[2],
                Avaliacoes: updateData[3],
                ProjCount: updateData[4],
                ProjetoFinal: updateData[5],
                SatisfCount: updateData[6],
                Satisf: updateData[7]*/
                Dificuldade: data[0].config.value,
                Avaliacoes: data[1].config.value,
                ProjetoFinal: data[2].config.value,
                Satisf: data[3].config.value
            }).then((res)=>{
                this.updateDataHandler(data)
            })
        }
        else if(this.state.disciplinaAtual.Periodo == 2){
            
            axios.put('https://help-cc-default-rtdb.firebaseio.com/Feedback/' + this.props.match.params.id + '/' + this.props.userId + '.json?auth=' + this.props.token, { /*  
                DifCount: updateData[0],
                Dificuldade: updateData[1],
                AvaCount: updateData[2],
                Avaliacoes: updateData[3],
                ProjCount: updateData[4],
                ProjetoFinal: updateData[5],
                SatisfCount: updateData[6],
                Satisf: updateData[7]
            */
                Dificuldade: data[0].config.value,
                Avaliacoes: data[1].config.value,
                ProjetoFinal: data[2].config.value,
                Satisf: data[3].config.value
            
            })
        .then((res)=>{
            this.updateDataHandler();
        })
        }
        this.setState({meuFeedbackOpen: false}) 
    }


    /*submitButtonHandler = (event, data) =>{
        event.preventDefault();
        this.submitHandler(data);
        this.updateDataHandler();
        this.auxDataHandler()
    }*/


    render(){

        const formElementsArray = [];
        for (let key in this.state.feedback){
            formElementsArray.push({
                id: key,
                config: this.state.feedback[key]
            });
        }

        /*let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))*/
        


        return(
        <div className = {classes.DisciplinaPage}>
            {this.props.token?<Modal show={this.state.meuFeedbackOpen} modalClosed={() => this.closeFeedbackHandler()}>
                <form onSubmit = {(e) => this.submitButtonHandler(e, formElementsArray)} className = {classes.Form}>
                Em qual dificuldade você classificaria essa disciplina:
                <Input 
                key={formElementsArray[0].id}
                elementType={formElementsArray[0].config.elementType}
                elementConfig={formElementsArray[0].config.elementConfig}
                value={formElementsArray[0].config.value}
                invalid={!formElementsArray[0].config.valid}
                shouldValidate={formElementsArray[0].config.validation}
                touched={formElementsArray[0].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[0].id)} />
                Quantas avaliações(tirando projeto final) foram feitas no período que você pagou:
                <Input 
                key={formElementsArray[1].id}
                elementType={formElementsArray[1].config.elementType}
                elementConfig={formElementsArray[1].config.elementConfig}
                value={formElementsArray[1].config.value}
                invalid={!formElementsArray[1].config.valid}
                shouldValidate={formElementsArray[1].config.validation}
                touched={formElementsArray[1].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[1].id)} />
                Você teve que fazer algum Projeto Final:
                <Input 
                key={formElementsArray[2].id}
                elementType={formElementsArray[2].config.elementType}
                elementConfig={formElementsArray[2].config.elementConfig}
                value={formElementsArray[2].config.value}
                invalid={!formElementsArray[2].config.valid}
                shouldValidate={formElementsArray[2].config.validation}
                touched={formElementsArray[2].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[2].id)} />
                Você gostou da disciplina no geral:
                <Input 
                key={formElementsArray[3].id}
                elementType={formElementsArray[3].config.elementType}
                elementConfig={formElementsArray[3].config.elementConfig}
                value={formElementsArray[3].config.value}
                invalid={!formElementsArray[3].config.valid}
                shouldValidate={formElementsArray[3].config.validation}
                touched={formElementsArray[3].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[3].id)} />
                Em poucas palavras você poderia deixar uma dica para quem vai cursar essa disciplina:
                <Input 
                key={formElementsArray[4].id}
                elementType={formElementsArray[4].config.elementType}
                elementConfig={formElementsArray[4].config.elementConfig}
                value={formElementsArray[4].config.value}
                invalid={!formElementsArray[4].config.valid}
                shouldValidate={formElementsArray[4].config.validation}
                touched={formElementsArray[4].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[4].id)} />
                Em poucas palavras você poderia deixar uma sugestão para essa disciplina:
                <Input 
                key={formElementsArray[5].id}
                elementType={formElementsArray[5].config.elementType}
                elementConfig={formElementsArray[5].config.elementConfig}
                value={formElementsArray[5].config.value}
                invalid={!formElementsArray[5].config.valid}
                shouldValidate={formElementsArray[5].config.validation}
                touched={formElementsArray[5].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[5].id)} />
                Em poucas palavras como você descreveria a experiência com o Docente da disciplina:
                <Input 
                key={formElementsArray[6].id}
                elementType={formElementsArray[6].config.elementType}
                elementConfig={formElementsArray[6].config.elementConfig}
                value={formElementsArray[6].config.value}
                invalid={!formElementsArray[6].config.valid}
                shouldValidate={formElementsArray[6].config.validation}
                touched={formElementsArray[6].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[6].id)} />
                Nome do Docente(OPCIONAL, será adicionado ao seu comentário)
                <Input
                key={formElementsArray[7].id}
                elementType={formElementsArray[7].config.elementType}
                elementConfig={formElementsArray[7].config.elementConfig}
                value={formElementsArray[7].config.value}
                invalid={!formElementsArray[7].config.valid}
                shouldValidate={formElementsArray[7].config.validation}
                touched={formElementsArray[7].config.touched}
                changed={(event) => this.inputChangedHandler(event, formElementsArray[7].id)} />
                <Button>OK</Button>
                </form>
            </Modal>:<Modal show={this.state.meuFeedbackOpen} modalClosed={() => this.closeFeedbackHandler()}>
                <NavLink to = {'/login'} className = {classes.Link}>
                <div><p>Fazer Login</p></div>
                </NavLink>
                </Modal>}
            <DadosDisplay
            clicked = {() => this.openFeedbackHandler()}
            Nome = {this.state.disciplinaAtual.NomeCompleto}
            Dificuldade = {this.state.disciplinaAtual.Dificuldade}
            Avaliacoes = {this.state.disciplinaAtual.Avaliacoes}
            TaxaNC = {this.state.disciplinaAtual.NC}
            Pontos = {this.state.disciplinaAtual.Pontos}
            ProjetoFinal = {this.state.disciplinaAtual.ProjetoFinal}
            Satisfacao = {this.state.disciplinaAtual.Satisf}
            />
            <Comentarios id={this.props.match.params.id}/>
        </div>

        )

    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        username: state.username
    }
}

export default connect(mapStateToProps, null)(DisciplinaPage);

