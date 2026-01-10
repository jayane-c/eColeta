import { X, Building2, Check, AlertCircle } from "lucide-react";
import "./SelecaoCooperativa.css";
import { useState } from "react";

interface Cooperativa {
  id: string;
  nome: string;
  endereco: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cooperativaId: string) => void;
}
const COOPERATIVAS_CADASTRADAS: Cooperativa[] = [
  { id: 'c1', nome: 'Cooperativa Recicla Viva', endereco: 'Rua Industrial, 500 - Setor Norte' },
  { id: 'c2', nome: 'Eco-Cooperativa Oeste', endereco: 'Av. das Nações, 1200 - Distrito Green' },
  { id: 'c3', nome: 'União dos Catadores SP', endereco: 'Rua do Comércio, 45 - Centro' },
];

function SelecaoCooperativa({ isOpen, onClose, onConfirm }: Props) {
  const [selecionada, setSelecionada] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmar = () => {
    if (selecionada) {
      onConfirm(selecionada);
      setSelecionada(null); 
    }
  };

  return (
    <div className="coop-overlay">
      <div className="coop-container">
        <div className="coop-header">
          <div className="coop-titulo-grupo">
            <Building2 size={24} className="coop-icon-principal" />
            <h3>Destino da Coleta</h3>
          </div>
          <button onClick={onClose} className="coop-btn-fechar"><X size={20} /></button>
        </div>

        <div className="coop-body">
          <div className="coop-alerta">
            <AlertCircle size={16} />
            <span>Selecione uma cooperativa cadastrada para continuar.</span>
          </div>
          
          <div className="coop-lista">
            {COOPERATIVAS_CADASTRADAS.map((coop) => (
              <div 
                key={coop.id} 
                className={`coop-item-card ${selecionada === coop.id ? 'selecionado' : ''}`}
                onClick={() => setSelecionada(coop.id)}
              >
                <div className="coop-info-box">
                  <div className="coop-avatar">
                    {coop.nome.charAt(0)}
                  </div>
                  <div className="coop-textos">
                    <span className="coop-nome-label">{coop.nome}</span>
                    <span className="coop-endereco-label">{coop.endereco}</span>
                  </div>
                </div>
                <div className={`coop-radio ${selecionada === coop.id ? 'marcado' : ''}`}>
                  {selecionada === coop.id && <Check size={14} color="white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="coop-footer">
          <button className="coop-btn-voltar" onClick={onClose}>Voltar</button>
          <button 
            className="coop-btn-confirmar" 
            disabled={!selecionada}
            onClick={handleConfirmar}
          >
            Confirmar Cooperativa
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelecaoCooperativa;