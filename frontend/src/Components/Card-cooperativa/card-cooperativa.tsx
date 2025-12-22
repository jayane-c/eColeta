import './card-cooperativa.css'
import Cooperativa from '../../assets/Logo-cooperativa/cooperativa.png'

export default function Card_cooperativa() {
    return (
        <>
            <div className='card-cooperativa-container'>
                <h3>Cadastro da Cooperativa</h3>
                <div className='card-logo-cooperativa'>
                    <img src={Cooperativa} alt="" />

                </div>
                <p>Receba materias recicláveis de 
                    coletores cadastrados na plataforma.</p>

                <button className='btn-cooperativa'>
                    Cadastar

                </button>


            </div>
        </>
    )

}
