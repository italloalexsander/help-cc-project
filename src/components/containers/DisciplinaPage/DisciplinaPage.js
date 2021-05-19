import React, {Component} from 'react';
import axios from 'axios';
import DadosDisplay from '../../DadosDisplay/DadosDisplay'
import classes from './DisciplinaPage.module.css'
import Comentarios from './Comentarios'
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

class DisciplinaPage extends Component{
    state = {
        disciplinaAtual: [],
        meuFeedbackOpen: false,
        feedback: {
            Dificuldade_est: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: ''},
                        {value: '1', displayValue: 'Fácil'},
                        {value: '2', displayValue: 'Normal'},
                        {value: '3', displayValue: 'Dificil'},
                        {value: '4', displayValue: 'Muito Dificil'}
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
                        {value: '1', displayValue: 'Uma'},
                        {value: '2', displayValue: 'Duas'},
                        {value: '3', displayValue: 'Três'},
                        {value: '4', displayValue: 'Quatro ou mais'}
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
                        {value: null, displayValue: ''},
                        {value: '1', displayValue: 'Sim'},
                        {value: '2', displayValue: 'Não'}
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
                        {value: null, displayValue: ''},
                        {value: '1', displayValue: 'Sim'},
                        {value: '2', displayValue: 'Não'}
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
            <Modal show={this.state.meuFeedbackOpen} modalClosed={() => this.closeFeedbackHandler()}>
                <form className = {classes.Form}>
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
                Você se sentiu satisfeito com a disciplina:
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
            </Modal>
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
            <Comentarios/>
        </div>

        )

    }
}

export default DisciplinaPage

