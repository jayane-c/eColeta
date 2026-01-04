import { LogOut } from "lucide-react";
import "./BotaoSair.css";

interface BotaoSairProps {
  onSair?: () => void;
  texto?: string;
}

export default function BotaoSair({ onSair, texto = "Sair" }: BotaoSairProps) {
  return (
    <button className="botao-sair-universal" onClick={onSair}>
      <LogOut size={18} />
      {texto}
    </button>
  );
}