
import './BotaoDescarte.css';

interface BotaoDescarteProps {
    onClick?: () => void;
    texto?: string;
}

export default function BotaoDescarte({ onClick, texto = "Guia de Separação" }: BotaoDescarteProps) {
    return (
        <button className="botao-descarte" onClick={onClick}>
            
            {texto}
        </button>
    );
}