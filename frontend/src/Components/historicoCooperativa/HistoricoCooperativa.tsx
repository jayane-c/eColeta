import "./HistoricoCooperativa.css";
import { Package, Filter } from "lucide-react";

const nomesFiltro = {
  papel: "Papel / Papelão",
  plastico: "Plástico",
  metal: "Metal / Latas",
  vidro: "Vidro",
  eletronicos: "Eletrônicos",
  oleo: "Óleo de Cozinha",
};

interface HistoricoProps {
  // O '?' torna a propriedade opcional para não dar erro no Dashboard
  materiaisSelecionados?: string[];
}

export default function HistoricoCooperativa({ 
  // Se não vier nada, ele usa as chaves do dicionário acima por padrão
  materiaisSelecionados = Object.keys(nomesFiltro) 
}: HistoricoProps) {
  return (
    <div className="quadro-historico-coop">
      <div className="cabecalho-historico">
        <h3 className="titulo-historico">Histórico de Recebimentos</h3>
        
        <div className="area-filtros">
          <Filter size={20} className="icone-filtro-verde" />
          <select className="seletor-estilizado">
            <option value="todos">Todos os materiais</option>
            {materiaisSelecionados.map((chave) => (
              <option key={chave} value={chave}>
                {nomesFiltro[chave as keyof typeof nomesFiltro]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="conteudo-vazio-historico">
        <div className="circulo-central-vazio">
          <Package size={45} />
        </div>
        <p className="texto-vazio">Nenhuma coleta recebida ainda</p>
      </div>
    </div>
  );
}