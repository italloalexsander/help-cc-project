import React from 'react';
import classes from '../Tray/Tray.module.css'

const tray = (props) =>{
    
    return(
        <div>
            <p className = {classes.Tray}>{props.name}<button className={classes.Button} onClick = {props.click}>x</button></p>
        </div>
    )
}

export default tray;