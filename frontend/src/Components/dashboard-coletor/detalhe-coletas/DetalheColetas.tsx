import React from 'react';
import { Trash2, Weight, MapPin, X, User } from 'lucide-react';
import './DetalheColetas.css';

// Interface flexível que aceita tanto o formato antigo quanto o novo do Backend
interface Props {
  coleta: any; // Usamos 'any' para aceitar a estrutura complexa do backend sem travar o TS
  onClose: () => void;
  onFinalizar: () => void;
  iniciada: boolean;   
  setIniciada: (valor: boolean) => void; 
}

const DetalheColetas: React.FC<Props> = ({ coleta, onClose, onFinalizar, iniciada, setIniciada }) => {

  // --- Funções Auxiliares para extrair dados do Backend ---
  
  // 1. Pega os materiais da lista de itens ou usa o antigo
  const getMateriais = () => {
    if (coleta.itens && Array.isArray(coleta.itens)) {
      return coleta.itens.map((item: any) => item.residuo?.nome).join(', ');
    }
    return coleta.material || "Material não informado";
  };

  // 2. Soma o peso total ou usa o antigo
  const getPeso = () => {
    if (coleta.itens && Array.isArray(coleta.itens)) {
      const total = coleta.itens.reduce((acc: number, item: any) => acc + Number(item.quantidade_estimada || 0), 0);
      return `${total}kg (Estimado)`;
    }
    return coleta.peso || "Peso não informado";
  };

  // 3. Formata o endereço do objeto morador ou usa o antigo
  const getEndereco = () => {
    if (coleta.morador && coleta.morador.endereco) {
      const { rua, numero, bairro, cidade } = coleta.morador.endereco;
      return `${rua}, ${numero} - ${bairro}, ${cidade}`;
    }
    return coleta.endereco || "Endereço indisponível";
  };

  const getGoogleMapsLink = () => {
      const enderecoCompleto = getEndereco();
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="btn-fechar" onClick={onClose}><X size={24} /></button>

        <h1 className="modal-titulo">Detalhes da Coleta</h1>
        
        {/* Mostra nome do Morador se disponível */}
        {coleta.morador && (
            <div className="morador-info" style={{textAlign: 'center', marginBottom: '15px', color: '#555'}}>
                <User size={16} style={{display: 'inline', marginRight: '5px'}}/>
                Solicitado por: <strong>{coleta.morador.nome}</strong>
            </div>
        )}

        <div className="grid-info">
          <div className="card-detalhe">
            <Trash2 size={32} color="#1a5235" />
            <p className="label">Itens:</p>
            <p className="valor">{getMateriais()}</p>
          </div>

          <div className="card-detalhe">
            <Weight size={32} color="#1a5235" />
            <p className="label">Peso Total:</p>
            <p className="valor">{getPeso()}</p>
          </div>

          <div className="card-detalhe">
            <MapPin size={32} color="#1a5235" />
            <p className="label">Endereço:</p>
            <p className="valor" style={{fontSize: '0.9rem'}}>{getEndereco()}</p>
          </div>
        </div>

        {coleta.observacoes && (
            <div className="observacoes-box" style={{background: '#f9f9f9', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '0.9rem'}}>
                <strong>Observações:</strong> {coleta.observacoes}
            </div>
        )}

        <div className="mapa-placeholder">
          <div className="mapa-header">Local da Coleta</div>
          <div className="mapa-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', height: '150px'}}>
             <a href={getGoogleMapsLink()} target="_blank" rel="noreferrer" className="btn-mapa-link" style={{textDecoration: 'none', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <MapPin size={40} color="#e63946" />
                <span style={{marginTop: '10px', fontWeight: 'bold', color: '#007bff'}}>Abrir no Google Maps</span>
             </a>
          </div>
        </div>

        {!iniciada ? (
          <button
            className="btn-finalizar-grande"
            style={{ backgroundColor: '#2196f3' }} 
            onClick={() => setIniciada(true)} 
          >
            INICIAR ROTA
          </button>
        ) : (
          <button
            className="btn-finalizar-grande"
            style={{ backgroundColor: '#6abf4b' }} 
            onClick={onFinalizar}
          >
            FINALIZAR E CONFIRMAR
          </button>
        )}
      </div>
    </div>
  );
};

export default DetalheColetas;