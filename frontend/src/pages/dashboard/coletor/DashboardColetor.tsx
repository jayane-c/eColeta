import CardResumo from "../../../Components/dashboard-coletor/card-resumo/CardResumo"
import "./DashboardColetor.css"
import NavbarColetor from "../../../Components/dashboard-coletor/navbar/NavbarColetor";
import ColetasDisponiveis from "../../../Components/dashboard-coletor/coletas-disponiveis/ColetasDisponiveis";
import ColetasAndamento from "../../../Components/dashboard-coletor/coletas-andamento/ColetasAndamento";
import ColetasFinalizadas from "../../../Components/dashboard-coletor/coletas-finalizadas/ColetasFinalizadas";
import { useState } from "react";
import DetalheColetas from "../../../Components/dashboard-coletor/detalhe-coletas/DetalheColetas"
import { Package, Truck, CheckCircle } from "lucide-react";
import Footer from "../../../Components/Footer/footer"
import SelecaoCooperativa from "../../../Components/dashboard-coletor/selecao-cooperativa/SelecaoCooperativa";


interface Coleta {
  id: string;
  material: string;
  quantidade: string;
  peso: string;
  endereco: string;
  distancia?: string;
  data?: string;
  horario?: string;
}

function DashboardColetor() {
  const [totalFinalizadas, setTotalFinalizadas] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtro, setFiltro] = useState('disponiveis');
  const [coletaParaModal, setColetaParaModal] = useState<Coleta | null>(null);
  const [coletaIniciada, setColetaIniciada] = useState(false);

  const [listaDisponiveis, setListaDisponiveis] = useState<Coleta[]>([
    { id: '1', material: 'Papelão', quantidade: '1', peso: '25kg', endereco: 'Rua das Flores, 123 - Centro', data: '08/01/2026', horario: '14:00' },
    { id: '2', material: 'Plástico', quantidade: '1', peso: '15kg', endereco: 'Av. Principal, 456 - Jardins', data: '08/01/2026', horario: '16:30' },
  ]);

  const [coletasAceitas, setColetasAceitas] = useState<Coleta[]>([]);
  const [historicoFinalizadas, setHistoricoFinalizadas] = useState<Coleta[]>([]);

  const handleAceitarColeta = (dadosDaColeta: Coleta) => {
    setColetasAceitas(prev => [...prev, dadosDaColeta]);
    setListaDisponiveis(prev => prev.filter(item => item.id !== dadosDaColeta.id));
    setFiltro('andamento');
  };

  const handleRecusarColeta = (id: string) => {
    setListaDisponiveis(prev => prev.filter(item => item.id !== id));
  };

  const handleFinalizarColeta = (id: string) => {
    const coletaConcluida = coletasAceitas.find(c => c.id === id) || coletaParaModal;

    if (coletaConcluida) {
      setHistoricoFinalizadas(prev => [coletaConcluida, ...prev]);
      setColetasAceitas(prev => prev.filter(item => item.id !== id));
      setTotalFinalizadas(prev => prev + 1);
      setMostrarModal(false);
      setFiltro('finalizadas');
    }
  };

  const handleCancelarColeta = (id: string) => {
    const confirmar = window.confirm("Tem certeza que deseja cancelar este agendamento? A coleta voltará para a lista de disponíveis.");

    if (confirmar) {
      const coletaParaVoltar = coletasAceitas.find(item => item.id === id);
      if (coletaParaVoltar) {
        setColetasAceitas(prev => prev.filter(item => item.id !== id));
        setListaDisponiveis(prev => [...prev, coletaParaVoltar]);
        setFiltro('disponiveis');
      }
    }
  };

  const [isSelecaoOpen, setIsSelecaoOpen] = useState(false);
  const [coletaPendente, setColetaPendente] = useState<Coleta | null>(null);

  const handleAbrirSelecao = (coleta: Coleta) => {
    setColetaPendente(coleta);
    setIsSelecaoOpen(true);
  };

  const confirmarSelecao = (coopId: string) => {
    if (coletaPendente) {
      handleAceitarColeta(coletaPendente);
      setIsSelecaoOpen(false);
      console.log("Coleta enviada para cooperativa:", coopId);
    }
  };

  return (
    <>
      <NavbarColetor />

      <main className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-cards">
            <div onClick={() => setFiltro('disponiveis')} className={filtro === 'disponiveis' ? 'card-selecionado' : ''}>
              <CardResumo titulo="Disponíveis" valor={listaDisponiveis.length} icon={<Package size={24} />} colorClass="orange" />
            </div>

            <div onClick={() => setFiltro('andamento')} className={filtro === 'andamento' ? 'card-selecionado' : ''}>
              <CardResumo titulo="Em Andamento" valor={coletasAceitas.length} icon={<Truck size={24} />} colorClass="blue" />
            </div>

            <div onClick={() => setFiltro('finalizadas')} className={filtro === 'finalizadas' ? 'card-selecionado' : ''}>
              <CardResumo titulo="Finalizadas" valor={totalFinalizadas} icon={<CheckCircle size={24} />} colorClass="green" />
            </div>
          </div>

          <div className="dashboard-section-wrapper coletas-container">


            {filtro === 'disponiveis' && (
              <div className="animar-entrada">
                <h2 className="titulo-secao">Coletas Disponíveis</h2>
                <ColetasDisponiveis
                  dados={listaDisponiveis}
                  onAceitar={handleAbrirSelecao} 
                  onRecusar={handleRecusarColeta}
                  bloquearBotao={false}
                />
              </div>
            )}


            {filtro === 'andamento' && (
              <div className="animar-entrada">
                <h2 className="titulo-secao andamento">Coletas em Andamento</h2>

                {coletasAceitas.length > 0 ? (
                  <div className="lista-cards-stack">
                    {coletasAceitas.map(item => (
                      <ColetasAndamento
                        key={item.id}
                        coleta={item}
                        onFinalizar={() => handleFinalizarColeta(item.id)}
                        onCancelar={() => handleCancelarColeta(item.id)}
                        onVerDetalhes={() => {
                          setColetaParaModal(item);
                          setMostrarModal(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="sem-dados">
                    <Truck size={48} color="#cbd5e0" />
                    <p>Nenhuma coleta em andamento.</p>
                  </div>
                )}
              </div>
            )}


            {filtro === 'finalizadas' && (
              <div className="animar-entrada">
                <h2 className="titulo-secao finalizadas">Coletas Finalizadas</h2>
                <ColetasFinalizadas dados={historicoFinalizadas} />
              </div>
            )}
          </div>
        </div>

        {mostrarModal && coletaParaModal && (
          <DetalheColetas
            coleta={coletaParaModal}
            onClose={() => setMostrarModal(false)}
            onFinalizar={() => handleFinalizarColeta(coletaParaModal.id)}
            iniciada={coletaIniciada}
            setIniciada={setColetaIniciada}
          />
        )}
        <SelecaoCooperativa
          isOpen={isSelecaoOpen}
          onClose={() => setIsSelecaoOpen(false)}
          onConfirm={confirmarSelecao}
        />

      </main>
      <Footer />
    </>
  );
}

export default DashboardColetor;