import React from 'react' 
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <NavLink to = {'/'} className = {classes.Link}>{props.name}
        <div><Logo type = 'toolbar'/></div>
        </NavLink>
        {!props.token?
        <NavLink to = {'/login'} className = {classes.Link}>{props.name}
        <div><p className={classes.Link}>LOGIN</p></div>
        </NavLink>:<p>Você está logado</p>}
        <nav>
            ...
        </nav>
    </header>
);

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, null)(toolbar);