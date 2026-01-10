import { Check, X, MapPin, Calendar, Clock } from 'lucide-react';
import "./ColetasDisponiveis.css";

function ColetasDisponiveis({ dados, onAceitar, onRecusar, bloquearBotao }: any) {

  const handleAceitar = (coleta: any) => {
    if (bloquearBotao) {
      alert("Você já possui uma coleta em andamento!");
      return;
    }
    if (onAceitar) onAceitar(coleta);
  };

  if (!dados || dados.length === 0) {
    return (
      <div className="sem-dados">
        <MapPin size={48} color="#cbd5e0" />
        <p>Não há coletas disponíveis na sua região no momento.</p>
      </div>
    );
  }

  return (
    <div className="section-main-wrapper">
      <div className="lista-cards-aberta">
        {dados.map((coleta: any) => (
          <div className="coleta-card" key={coleta.id}>
            <div className="accent-bar" />

            <div className="card-body">
              <div className="info-section">
                <div className="header-coleta">
                  <span className="material-nome">{coleta.material}</span>
                  <span className="peso-tag">{coleta.peso}</span>
                </div>

                <div className="detalhes-horizontal">
                  <div className="detalhe-item">
                    <MapPin size={20} className="icon-purple" />
                    <span>{coleta.endereco}</span>
                  </div>
                  <div className="detalhe-item">
                    <Calendar size={20} className="icon-blue" />
                    <span>{coleta.data}</span>
                  </div>
                  <div className="detalhe-item">
                    <Clock size={20} className="icon-orange" />
                    <span>{coleta.horario}</span>
                  </div>
                </div>
              </div>

              <div className="actions-section">
                <button className="btn-aceitar" onClick={() => handleAceitar(coleta)}>
                  <Check size={20} /> Aceitar
                </button>
                <button
                  className="btn-recusar"
                  onClick={() => onRecusar && onRecusar(coleta.id)}>
                  <X size={20} /> Recusar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColetasDisponiveis;