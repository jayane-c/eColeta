import { Clock, Box, CheckCircle, Trophy, Gift} from 'lucide-react';
import './DashboardContentMorador.css';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import ModalSolicitarColeta from '../modalSolicitarColeta/ModalSolicitarColeta';
import HistoricoMorador from '../HistoricoMorador/HistoricoMorador';

export default function DashboardContentMorador() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtroAtivo, setFiltroAtivo] = useState<'Pendente' | 'Em Coleta' | 'Coletado'>('Pendente');
    const navigate = useNavigate(); 
    
    const [stats, setStats] = useState({ 
        pendentes: 0, 
        emColeta: 0, 
        coletadas: 0, 
        totalKg: 0, 
        pontos: 0 
    });

    const carregarEstatisticas = () => {
        const idLogado = localStorage.getItem('usuarioLogadoId');
        const usuariosRaw = localStorage.getItem('usuarios');
        
        if (idLogado && usuariosRaw) {
            const usuarios = JSON.parse(usuariosRaw);
            const usuarioAtual = usuarios.find((u: any) => String(u.id) === String(idLogado));

            if (usuarioAtual && usuarioAtual.historico) {
                const calculo = usuarioAtual.historico.reduce((acc: any, item: any) => {
                    if (item.status === 'Pendente') acc.pendentes++;
                    else if (item.status === 'Em Coleta') acc.emColeta++;
                    else if (item.status === 'Coletado') {
                        acc.coletadas++;
                        acc.totalKg += Number(item.quantidade?.replace('kg', '') || 0);
                    }
                    return acc;
                }, { pendentes: 0, emColeta: 0, coletadas: 0, totalKg: 0 });

                setStats({
                    ...calculo,
                    pontos: Math.floor(calculo.totalKg * 10)
                });
            }
        }
    };

    useEffect(() => {
        carregarEstatisticas();
        window.addEventListener('storage', carregarEstatisticas);
        return () => window.removeEventListener('storage', carregarEstatisticas);
    }, []);

   const handleFecharModal = () => {
    setIsModalOpen(false);
    carregarEstatisticas(); 
    setFiltroAtivo('Pendente');
    
    // Avisa os outros componentes
    window.dispatchEvent(new Event('storage'));

    // ✨ ROLAGEM AUTOMÁTICA
    setTimeout(() => {
        const elemento = document.getElementById('secao-historico');
        if (elemento) {
            elemento.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'      
            });
        }
    }, 300); 
};

    return (
        <div className="conteudo-principal-recipiente">
            <div className="container-botao-topo">
                <button className="botao-solicitar-coleta" onClick={() => setIsModalOpen(true)}>
                    <span className="icone-mais">+</span> Solicitar Nova Coleta
                </button>
            </div>

            <div className="cartao-pontos-destaque">
                <div className="painel-pontos-esquerda">
                    <div className="cabecalho-principal">
                        <div className="caixa-trofeu"><Trophy size={32} /></div>
                        <div className="texto-pontos-grande">
                            <span style={{fontSize: '0.9rem', opacity: 0.9}}>Seus Pontos eColeta</span>
                            <h1>{stats.pontos}</h1>
                        </div>
                    </div>
                    <div className="grade-estatisticas-internas">
                        <div className="mini-card-transparente">
                            <span>Coletas Realizadas</span>
                            <strong>{stats.coletadas}</strong>
                        </div>
                        <div className="mini-card-transparente">
                            <span>Total Coletado</span>
                            <strong>{stats.totalKg} kg</strong>
                        </div>
                    </div>
                </div>
                <button className="botao-troca-lateral" onClick={() => navigate('/pontos-morador')}>
                    <Gift size={24} color="#FF9100" />
                    <div className="texto-botao-lateral">
                        <strong>Trocar Pontos</strong>
                        <br /><small>Ver parceiros</small>
                    </div>
                </button>
            </div>

            <div className="grade-cartoes-status">
                {/* CARD PENDENTE */}
                <div 
                    className={`cartao-status-individual pendente-click ${filtroAtivo === 'Pendente' ? 'ativo' : ''}`}
                    onClick={() => setFiltroAtivo('Pendente')}
                >
                    <div className="icone-status fundo-laranja"><Clock size={24} color="#ff9800" /></div>
                    <div className="texto-status">
                        <span className="titulo-status">Pendentes</span>
                        <strong className="valor-status">{stats.pendentes}</strong>
                    </div>
                </div>

                {/* CARD EM COLETA */}
                <div 
                    className={`cartao-status-individual coleta-click ${filtroAtivo === 'Em Coleta' ? 'ativo' : ''}`}
                    onClick={() => setFiltroAtivo('Em Coleta')}
                >
                    <div className="icone-status fundo-azul"><Box size={24} color="#2196f3" /></div>
                    <div className="texto-status">
                        <span className="titulo-status">Em Coleta</span>
                        <strong className="valor-status">{stats.emColeta}</strong>
                    </div>
                </div>

                {/* CARD COLETADO */}
                <div 
                    className={`cartao-status-individual coletado-click ${filtroAtivo === 'Coletado' ? 'ativo' : ''}`}
                    onClick={() => setFiltroAtivo('Coletado')}
                >
                    <div className="icone-status fundo-verde"><CheckCircle size={24} color="#10b981" /></div>
                    <div className="texto-status">
                        <span className="titulo-status">Coletadas</span>
                        <strong className="valor-status">{stats.coletadas}</strong>
                    </div>
                </div>
            </div>

            {/* O histórico agora recebe o filtro e renderiza com animação interna */}
            <HistoricoMorador filtroStatus={filtroAtivo} />

        <ModalSolicitarColeta isOpen={isModalOpen} onClose={handleFecharModal} />
        </div>
    );
}