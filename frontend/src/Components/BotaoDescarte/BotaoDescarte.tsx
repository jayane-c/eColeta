import { BookOpen } from 'lucide-react';
import './BotaoDescarte.css';

interface BotaoDescarteProps {
    onClick?: () => void;
    texto?: string;
}

export default function BotaoDescarte({ onClick, texto = "Guia de Separação" }: BotaoDescarteProps) {
    return (
        <button className="botao-descarte" onClick={onClick}>
            <BookOpen size={18} />
            {texto}
        </button>
    );
}