import React from 'react';
import classes from '../Tray/Tray.module.css'

const tray = (props) =>{
    const trayAux = []

    return(
        <div>
            <p className = {classes.Tray}>{props.name}<button className={classes.Button} onClick = {props.click}>X</button></p>
        </div>
    )
}

export default tray;