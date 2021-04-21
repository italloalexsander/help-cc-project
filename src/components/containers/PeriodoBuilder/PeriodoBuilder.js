import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import DisciplinaCard from '../../DisciplinaCard/DisciplinaCard'

class PeriodoBuilder extends Component{
    render(){
        
        return(
            <Aux>
                <div>Periodo</div>
                <DisciplinaCard></DisciplinaCard>
                <DisciplinaCard></DisciplinaCard>  
            </Aux>
        );
    }
}

export default PeriodoBuilder;