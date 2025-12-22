import '../Card-coletor/card-coletor.css'
import Coletor from '../../assets/Logo-coletor/coletor.png'

export default function Card_coletor() {
    return (
        <>
            <div className='card-coletor-container'>
                <h3>Cadastro de Coletor</h3>
                <div className='card-logo-coletor'>
                    <img src={Coletor} alt="" />

                </div>
                <p>Aceite corridas de coletas e leve os
                    recicláveis para cooperativas parceiras.</p>

                <button className='btn-coletor'>
                    Cadastar

                </button>


            </div>
        </>
    )

}
