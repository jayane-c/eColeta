import { CheckCircle2, XCircle, Info, FileText, Smartphone, GlassWater, Trash2 } from 'lucide-react';
import './GuiaSeparacao.css';


const categorias = [
  {
    titulo: "Papel e Papelão",
    IconePrincipal: FileText,
    pode: ["Jornais e revistas", "Caixas de papelão", "Papéis de escritório", "Envelopes"],
    naoPode: ["Papel higiênico", "Papéis metalizados", "Papel carbono", "Fita adesiva"],
    dicas: ["Remova clips e grampos", "Papéis podem estar amassados, mas não molhados"],
    corClasse: "papel"
  },
  {
    titulo: "Plástico",
    IconePrincipal: Trash2,
    pode: ["Garrafas PET", "Embalagens de produtos de limpeza", "Potes de margarina e sorvete", "Sacolas plásticas"],
    naoPode: ["Plásticos sujos com restos de comida", "Cabos de panela", "Tomadas", "Adesivos"],
    dicas: ["Lave as embalagens antes de descartar", "Retire os rótulos quando possível", "Amasse as garrafas PET para economizar espaço"],
    corClasse: "plastico"
  },
  {
    titulo: "Metal e Latas",
    IconePrincipal: Trash2, 
    pode: ["Latas de alumínio (refrigerante, cerveja)", "Latas de aço (conservas)", "Tampas de metal", "Ferragens"],
    naoPode: ["Esponjas de aço", "Latas de tinta", "Latas de combustível", "Aerossóis com conteúdo"],
    dicas: ["Lave as latas antes de descartar", "Amasse as latas de alumínio", "Separe tampas de metal de outros materiais"],
    corClasse: "metal"
  },
  {
    titulo: "Vidro",
    IconePrincipal: GlassWater,
    pode: ["Garrafas de vidro", "Potes de conserva", "Frascos de perfume e remédios", "Copos de vidro"],
    naoPode: ["Espelhos", "Vidros de janela", "Lâmpadas", "Cristal"],
    dicas: ["Lave os vidros antes de descartar", "Retire tampas e rótulos", "Cacos devem ser embalados em papel para segurança"],
    corClasse: "vidro"
  },
  {
    titulo: "Eletrônicos",
    IconePrincipal: Smartphone,
    pode: ["Celulares e tablets", "Computadores e notebooks", "Teclados e mouses", "Carregadores"],
    naoPode: ["Pilhas e baterias soltas", "Lâmpadas fluorescentes", "Equipamentos com vazamento"],
    dicas: ["Remova pilhas e baterias antes de descartar", "Apague dados pessoais de dispositivos", "Embale itens frágeis com cuidado"],
    corClasse: "eletronicos"
  }
];

export default function GuiaSeparacao() {
  return (
    <div className="guia-container">
      <div className="card-guia">
        <p className="guia-tag">Guia de Separação de Resíduos</p>
        <h1 className="guia-titulo">Aprenda a separar corretamente seus resíduos recicláveis e contribua para um planeta mais sustentável.</h1>
        
        <div className="card-dicas-gerais">
          <h3>Dicas Gerais</h3>
          <ul>
            <li><CheckCircle2 size={18} /> Lave e seque os materiais antes de separar</li>
            <li><CheckCircle2 size={18} /> Separe os materiais por tipo para facilitar a coleta</li>
            <li><CheckCircle2 size={18} /> Remova tampas, rótulos e outros materiais diferentes</li>
            <li><CheckCircle2 size={18} /> Armazene em local seco até o dia da coleta</li>
          </ul>
        </div>
      </div>

      <div className="lista-cards">
        {categorias.map((cat) => (
          <div key={cat.titulo} className="card-guia">
            <div className="card-guia-header">
              <cat.IconePrincipal size={28} className={`icon-topo ${cat.corClasse}`} />
              <h2>{cat.titulo}</h2>
            </div>

            <div className="card-guia-corpo">
              <div className="coluna">
                <h4 className="txt-pode"><CheckCircle2 size={16} /> Pode reciclar</h4>
                <ul>
                  {cat.pode.map(item => (
                    <li key={item}><CheckCircle2 size={14} className="icon-check" /> {item}</li>
                  ))}
                </ul>
              </div>

              <div className="coluna">
                <h4 className="txt-nao"><XCircle size={16} /> Não pode reciclar</h4>
                <ul>
                  {cat.naoPode.map(item => (
                    <li key={item}><XCircle size={14} className="icon-x" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`box-info ${cat.corClasse}-bg`}>
              <h5><Info size={16} /> Dicas importantes</h5>
              <ul>
                {cat.dicas.map(dica => <li key={dica}>• {dica}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <footer className="guia-footer-acao">
        <p>Faça sua parte!</p>
        <p>A reciclagem começa com a separação correta. Cada material reciclado contribui para um futuro mais sustentável.</p>
        
      </footer>
    </div>
  );
}