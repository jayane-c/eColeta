import { MapPin, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import "./ColetasAndamento.css";

function ColetasAndamento({ coleta, onFinalizar, onCancelar }: any) {
  return (
    <div className="coleta-card card-andamento-container"> 
      {/* Barra lateral azul que identifica a coleta ativa */}
      <div className="accent-bar-blue" />
      
      <div className="card-body">
        <div className="info-section">
          <div className="header-coleta">
            <span className="material-nome">{coleta.material}</span>
            <span className="badge-andamento">EM ANDAMENTO</span>
          </div>

          <div className="detalhes-horizontal">
            <div className="detalhe-item">
              <MapPin size={22} className="icon-blue" />
              <span>{coleta.endereco}</span>
            </div>
            <div className="detalhe-item">
              <Calendar size={22} className="icon-blue" />
              <span>{coleta.data || "08/01/2026"}</span>
            </div>
            <div className="detalhe-item">
              <Clock size={22} className="icon-blue" />
              <span>{coleta.horario || "14:00"}</span>
            </div>
          </div>
        </div>

        <div className="actions-section-vertical">
          <button className="btn-finalizar" onClick={onFinalizar}>
            <CheckCircle size={20} />
            Finalizar Coleta
          </button>

          <button className="btn-cancelar-agendamento" onClick={() => onCancelar(coleta.id)}>
            <XCircle size={18} />
            Cancelar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColetasAndamento;