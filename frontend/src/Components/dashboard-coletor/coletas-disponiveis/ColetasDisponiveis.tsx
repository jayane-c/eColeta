import "./ColetasDisponiveis.css";
import { Check, X, MapPin, Calendar, Clock } from 'lucide-react';
import { useState, useEffect } from "react";

function ColetasDisponiveis({ setTotalDisponiveis, onAceitar, bloquearBotao }: any) {
  const [coletas, setColetas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarColetas = async () => {
      try {
        setCarregando(true);
        const dadosFalsos = [
          {
            id: 1,
            material: "Papelão",
            peso: "25kg",
            endereco: "Rua das Flores, 123 - Centro",
            data: "08/01/2026",
            horario: "14:00"
          },
          {
            id: 2,
            material: "Plástico PET",
            peso: "15kg",
            endereco: "Av. Principal, 456 - Jardins",
            data: "08/01/2026",
            horario: "16:30"
          }
        ];
        setColetas(dadosFalsos);
        if (setTotalDisponiveis) setTotalDisponiveis(dadosFalsos.length);
      } catch (error) {
        console.error("Erro ao carregar coletas:", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarColetas();
  }, [setTotalDisponiveis]);

  const handleAceitar = (coletaClicada: any) => {
    if (bloquearBotao) {
      alert("Você já possui uma coleta em andamento!");
      return;
    }
    const novaLista = coletas.filter(item => item.id !== coletaClicada.id);
    setColetas(novaLista);
    if (setTotalDisponiveis) setTotalDisponiveis(novaLista.length);
    if (onAceitar) onAceitar(coletaClicada);
  };

  const handleRecusar = (id: number) => {
    const novaLista = coletas.filter(coleta => coleta.id !== id);
    setColetas(novaLista);
    if (setTotalDisponiveis) setTotalDisponiveis(novaLista.length);
  };

  if (carregando) return <div className="loading">Carregando coletas...</div>;

return (
    <div className="section-main-wrapper">
      <h2 className="titulo-secao"> Coletas Disponíveis</h2>

      <div className="lista-cards-aberta">
        {coletas.map((coleta) => (
          <div className="coleta-card" key={coleta.id}>
            <div className="accent-bar" />
            
            <div className="card-body">
              <div className="info-section">
                <div className="header-coleta">
                  <span className="material-nome">{coleta.material}</span>
                  <span className="peso-tag">{coleta.peso}</span>
                </div>

                {/* ALTERADO: Esta div agora conterá os itens lado a lado */}
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
                <button className="btn-recusar" onClick={() => handleRecusar(coleta.id)}>
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