import classes from './DisciplinaCard.module.css'

const disciplinaCard = () =>{
    return(
    <div className = {classes.DisciplinaCard}>
        <p>Titulo da Disciplina <button>+</button></p>
        <p>Dificuldade Estimada: </p>
        <p>Taxa de reprovação/desistência: </p>
    </div>

    );
}

export default disciplinaCard