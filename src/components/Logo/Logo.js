import React from 'react';
import burgerLogo from '../../assets/images/cover.png'
import classes from './Logo.module.css'

const logo = (props) => {
    if (props.type == 'toolbar'){
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="help-cc"/>
        </div>
        )
    }
    if (props.type == 'medio'){
        return(
            <div className = {classes.Logo2}>
                <img src={burgerLogo} alt="help-cc"/>
            </div>
            )
        }
}

export default logo;