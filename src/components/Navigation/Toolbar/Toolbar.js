import React from 'react' 
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import {NavLink} from 'react-router-dom'

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <NavLink to = {'/'} className = {classes.Link}>{props.name}
        <div><Logo type = 'toolbar'/></div>
        </NavLink>
        <NavLink to = {'/login'} className = {classes.Link}>{props.name}
        <div><p className={classes.Link}>LOGIN</p></div>
        </NavLink>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;