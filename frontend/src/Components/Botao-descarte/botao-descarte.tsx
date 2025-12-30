import './botao-descarte.css'
import comoReciclar from '../../assets/Logo/como-reciclar.png' 

export default function BotaoDescarte() {
    return (
        <div className="container-botao-descarte">
            <button className="botao-descarte-card">
                <div className="icone-verde">
                    <img src={comoReciclar} alt="Ícone de descarte" className="imagem-icone" />
                </div>
                
                <div className="texto-botao">
                    <strong>Como descartar meus resíduos?</strong>
                    <p>Confira dicas e orientações sobre como separar e destinar corretamente seu lixo para a reciclagem</p>
                </div>

                <div className="seta-dupla">
                    <span>&gt;&gt;</span>
                </div>
            </button>
        </div>
    )
}