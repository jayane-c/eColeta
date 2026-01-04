import React from 'react';
import './CardOrientacao.css';
import comoReciclar from '../../assets/Logo/como-reciclar.png';
export const CardOrientacao: React.FC = () => {
  return (
    <div className="container-orientacao-float">
      <div className="card-branco-orientacao">
        <div className="icon-box-verde">
          <img src={comoReciclar} alt="Ícone de Reciclagem" />
        </div>
        <div className="texto-box">
          <h3>Como descartar meus resíduos?</h3>
          <p>Confira dicas e orientações sobre como separar e destinar corretamente seu lixo para a reciclagem</p>
        </div>
        <span className="setas-link">{'>>'}</span>
      </div>
    </div>
  );
};