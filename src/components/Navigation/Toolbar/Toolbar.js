import React from 'react' 
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


const toolbar = (props) =>(
    <header className={classes.Toolbar}>      
        <div className={classes.Logo}><Logo type = 'toolbar'/></div>
        <NavLink to = {'/'} className = {classes.Link}>{props.name}
        <div className = {classes.Select}>Início</div>
        </NavLink>
        <NavLink to = {'/disciplinas'} className = {classes.Link}>{props.name}
        <div className = {classes.Select}>Disciplinas</div>
        </NavLink>
        {!props.token?
        <NavLink to = {'/login'} className = {classes.Link}>{props.name}
        <div><p className={classes.Link}>Login</p></div>
        </NavLink>:<p>Você está logado, {props.username}</p>}
    </header>
);

const mapStateToProps = state => {
    return {
        token: state.token,
        username: state.username
    }
}

export default connect(mapStateToProps, null)(toolbar);