import React, {Component} from 'react';
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import classes from './Auth.module.css';
import Spinner from '../../UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'
import {connect} from 'react-redux'
import Logo from '../../Logo/Logo'

class Auth extends Component{
    state = {
        controls: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'Nome',
                    placeholder: 'Nome de Usuário'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Seu Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
                },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Senha'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
                }
            },
        isSignup: true
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,
            this.state.isSignup, this.state.controls.name);
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

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,[controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = [] 
         
        if(this.state.isSignup){
            form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))
            }
        else{
            form =
            <div>
                <Input
                    key={formElementsArray[1].id}
                    elementType={formElementsArray[1].config.elementType}
                    elementConfig={formElementsArray[1].config.elementConfig}
                    value={formElementsArray[1].config.value}
                    invalid={!formElementsArray[1].config.valid}
                    shouldValidate={formElementsArray[1].config.validation}
                    touched={formElementsArray[1].config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElementsArray[1].id)}
                />
                <Input
                    key={formElementsArray[2].id}
                    elementType={formElementsArray[2].config.elementType}
                    elementConfig={formElementsArray[2].config.elementConfig}
                    value={formElementsArray[2].config.value}
                    invalid={!formElementsArray[2].config.valid}
                    shouldValidate={formElementsArray[2].config.validation}
                    touched={formElementsArray[2].config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElementsArray[2].id)}
                />
            </div>
        }
        

        if(this.props.loading){
            form = <Spinner></Spinner>
        }
        
        let errorMessage = null;

        if (this.props.error){
            if(this.props.error.message === 'INVALID_EMAIL'){
            errorMessage = (
                <p>Email Inválido</p>
            )
            }
            if (this.props.error.message === 'EMAIL_EXISTS'){
                errorMessage = (
                    <p>Email já Cadastrado</p>
                )
            }
        }

        


        return(
            <div className = {classes.Auth}>
                <Logo type = 'medio'/>
                <form onSubmit ={this.submitHandler}>  
                    {form}
                    {errorMessage}
                    <Button btnType="Sucess">{this.state.isSignup? 'Registrar':'Fazer Login'}</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} 
                btnType="Danger">Mudar para {this.state.isSignup? 'Login':'Registro'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return{
        loading: state.loading,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        
        onAuth: (email, password, isSignup, name) => dispatch(actions.auth(email, password, isSignup, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);