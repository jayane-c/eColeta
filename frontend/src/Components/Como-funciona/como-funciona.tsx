import solicite from '../../assets/Logo/solicite.jpg'
import separe from '../../assets/Logo/separe.jpg'
import colete from '../../assets/Logo/colete.jpg'
import recicle from '../../assets/Logo/recicle.jpg'

import './como-funciona.css'

export default function Como_funciona() {
  return (
    <section className="como-funciona">
      <h2>Como funciona?</h2>

      <div className="card-imagens">

        <div className="item">
          <div className="titulo-item">
            <span>1</span>
            <h3>Separe</h3>
          </div>

          <img src={separe} alt="Separe" />

          <p>
            Separe seus recicláveis <br />
            usando nosso guia
          </p>
        </div>

        <div className="item">
          <div className="titulo-item">
            <span>2</span>
            <h3>Solicite</h3>
          </div>

          <img src={solicite} alt="Solicite" />

          <p>
            Peça a coleta informando tipo <br />
            e peso
          </p>
        </div>

        <div className="item">
          <div className="titulo-item">
            <span>3</span>
            <h3>Coleta</h3>
          </div>

          <img src={colete} alt="Coleta" />

          <p>
            Coletor aceita e vai até a <br />
            sua casa
          </p>
        </div>

        <div className="item">
          <div className="titulo-item">
            <span>4</span>
            <h3>Recicle</h3>
          </div>

          <img src={recicle} alt="Recicle" />

          <p>
            Material vai para a <br />
            cooperativa
          </p>
        </div>

      </div>
    </section>
  )
}
