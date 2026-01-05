import "./MateriaisAceitos.css";
import { FileText, Milk, Container, GlassWater, Monitor, Droplets } from "lucide-react";

export default function MateriaisAceitos() {
  const todosOsMateriais = [
    { nome: "Papel/Papelão", icone: <FileText size={28} /> },
    { nome: "Plástico", icone: <Milk size={28} /> },
    { nome: "Metal/Latas", icone: <Container size={28} /> },
    { nome: "Vidro", icone: <GlassWater size={28} /> },
    { nome: "Eletrônicos", icone: <Monitor size={28} /> },
    { nome: "Óleo de Cozinha", icone: <Droplets size={28} /> },
  ];

  return (
    <div className="secao-materiais-laranja">
      <h4 className="titulo-materiais">Materiais Aceitos pela Cooperativa</h4>
      <div className="grade-cards-materiais">
        {todosOsMateriais.map((item, index) => (
          <div key={index} className="cartao-material-item">
            <div className="circulo-branco-icone">
              <div className="icone-laranja">
                {item.icone}
              </div>
            </div>
            <span className="texto-material">{item.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}