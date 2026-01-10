import { Calendar, Package, Clock, XCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import './HistoricoMorador.css';

interface Coleta {
  id: string;
  material: string;
  quantidade: string;
  status: 'Pendente' | 'Em Coleta' | 'Coletado';
  data: string;
  horario: string;
}

interface Usuario {
  id: string;
  historico: Coleta[];
}

interface Props {
  filtroStatus?: 'Pendente' | 'Em Coleta' | 'Coletado';
}

const HistoricoMorador = ({ filtroStatus }: Props) => {
  const [historico, setHistorico] = useState<Coleta[]>([]);

  const carregarDados = () => {
    const idLogado = localStorage.getItem('usuarioLogadoId');
    const usuariosRaw = localStorage.getItem('usuarios');

    if (!idLogado || !usuariosRaw) {
      setHistorico([]);
      return;
    }

    let usuarios: Usuario[] = [];
    try {
      usuarios = JSON.parse(usuariosRaw);
    } catch {
      setHistorico([]);
      return;
    }

    const usuarioAtual = usuarios.find(
      (u) => String(u.id) === String(idLogado)
    );

    if (!usuarioAtual) {
      setHistorico([]);
      return;
    }

    let lista = usuarioAtual.historico ? [...usuarioAtual.historico] : [];

    if (filtroStatus) {
      lista = lista.filter(c => c.status === filtroStatus);
    }

    setHistorico(lista.reverse());
  };

  const handleCancelar = (id: string) => {
    if (!window.confirm('Deseja realmente cancelar este agendamento?')) return;

    const idLogado = localStorage.getItem('usuarioLogadoId');
    const usuariosRaw = localStorage.getItem('usuarios');
    if (!idLogado || !usuariosRaw) return;

    const usuarios: Usuario[] = JSON.parse(usuariosRaw);
    const index = usuarios.findIndex(
      (u) => String(u.id) === String(idLogado)
    );

    if (index === -1) return;

    usuarios[index].historico = usuarios[index].historico.filter(
      (c) => c.id !== id
    );

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    window.dispatchEvent(new Event('storage'));
    carregarDados();
  };

  useEffect(() => {
    carregarDados();
    window.addEventListener('storage', carregarDados);
    return () => window.removeEventListener('storage', carregarDados);
  }, [filtroStatus]); 

  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Sua coleta mudará de status assim que um coletor aceitar.');
  };

  return (
   
     <div className="historico-wrapper" id="secao-historico">
        <h2 className={`titulo-secao ${filtroStatus?.toLowerCase().replace(/\s+/g, '-')}`}>
       {filtroStatus}
      </h2>
      {historico.length > 0 ? (
        <div className="lista-cards">
          {historico.map((coleta) => (
            <div className="coleta-card" key={coleta.id}>
              <div className="accent-bar" />

              <div className="card-body">
                <div className="info-section">
                  <div className="header-coleta">
                    <span className="material-nome">{coleta.material}</span>
                    <span className="peso-tag">{coleta.quantidade}</span>
                  </div>

                  <div className="detalhes-horizontal">
                    <div className="detalhe-item">
                      <Calendar size={18} className="icon-blue" />
                      <span>{coleta.data}</span>
                    </div>

                    <div className="detalhe-item">
                      <Clock size={18} className="icon-orange" />
                      <span>{coleta.horario}</span>
                    </div>

                    <div
                      className="status-badge-inline"
                      onClick={handleInfo}
                      style={{ cursor: 'pointer' }}
                    >
                      {coleta.status}
                      <Info size={14} className="info-icon-status" />
                    </div>
                  </div>
                </div>

                <div className="actions-section">
                  {coleta.status === 'Pendente' && (
                    <button
                      className="btn-cancelar-estilizado"
                      onClick={() => handleCancelar(coleta.id)}
                    >
                      <XCircle size={18} />
                      Cancelar agendamento
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sem-dados">
          <Package size={48} color="#cbd5e0" />
          <p>Nenhuma coleta {filtroStatus?.toLowerCase()} encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default HistoricoMorador;