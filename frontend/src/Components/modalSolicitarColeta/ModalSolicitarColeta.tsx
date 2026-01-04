import { useState } from 'react'; // Resolve erro ts(2304)
import { FileText, CupSoda, Box, Wine, Smartphone, Droplets, Clock, Calendar as CalendarIcon } from 'lucide-react';
import './ModalSolicitarColeta.css';

interface ModalProps { 
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalSolicitarColeta({ isOpen, onClose }: ModalProps) {
    const [endereco, setEndereco] = useState('Rua das Flores, 123');
    const [materiaisSelecionados, setMateriaisSelecionados] = useState<string[]>([]);
    const [peso, setPeso] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [horario, setHorario] = useState('');

    if (!isOpen) return null;


    const opcoesHorario = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    const listaMateriais = [
        { id: 'papel', nome: 'Papel/Papelão', icone: <FileText size={20} />, cor: '#A78BFA' }, // Roxo
        { id: 'plastico', nome: 'Plástico', icone: <CupSoda size={20} />, cor: '#F472B6' }, // Rosa
        { id: 'metal', nome: 'Metal/Latas', icone: <Box size={20} />, cor: '#F87171' }, // Vermelho
        { id: 'vidro', nome: 'Vidro', icone: <Wine size={20} />, cor: '#4ADE80' }, // Verde
        { id: 'eletronicos', nome: 'Eletrônicos', icone: <Smartphone size={20} />, cor: '#6366F1' }, // Azul Escuro
        { id: 'oleo', nome: 'Óleo de Cozinha', icone: <Droplets size={20} />, cor: '#0EA5E9' }, // Azul Claro
    ];

    const toggleMaterial = (nome: string) => {
        setMateriaisSelecionados(prev => 
            prev.includes(nome) ? prev.filter(m => m !== nome) : [...prev, nome]
        );
    };

    return (
        <div className="modal-overlay-morador">
            <div className="modal-container-refinado">
                <div className="modal-scroll-area">
                    <div className="campo-grupo">
                        <label className="label-teal">Endereço da Coleta</label>
                        <input type="text" className="input-custom" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                    </div>

                    <div className="campo-grupo">
                        <label className="label-teal">Tipos de Material</label>
                        <div className="grid-materiais-colorida">
                            {listaMateriais.map(item => (
                                <div 
                                    key={item.id} 
                                    className={`card-material-vibrante ${materiaisSelecionados.includes(item.nome) ? 'active' : ''}`}
                                    onClick={() => toggleMaterial(item.nome)}
                                >
                                    <input type="checkbox" checked={materiaisSelecionados.includes(item.nome)} readOnly />
                                    <span className="icon-lucide-color" style={{ color: item.cor }}>{item.icone}</span>
                                    <span className="label-item">{item.nome}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="campo-grupo">
                        <label className="label-teal">Peso Estimado (kg)</label>
                        <input type="text" placeholder="Ex: 5.5" className="input-custom" value={peso} onChange={(e) => setPeso(e.target.value)} />
                    </div>

                    <div className="campo-grupo">
                        <label className="label-teal">Data da Coleta</label>
                        <div className="input-wrapper-icon">
                            <input type="date" className="input-custom" value={dataColeta} onChange={(e) => setDataColeta(e.target.value)} />
                            <CalendarIcon size={20} className="icon-absolute" />
                        </div>
                    </div>

                    <div className="campo-grupo">
                        <label className="label-teal">Horário Preferido</label>
                        <div className="input-wrapper-icon">
                            <select className="input-custom select-horario" value={horario} onChange={(e) => setHorario(e.target.value)}>
                                <option value="">Selecione um horário...</option>
                                {opcoesHorario.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <Clock size={20} className="icon-absolute" />
                        </div>
                    </div>
                </div>

                <div className="modal-btns-footer">
                    <button className="btn-cancel-border" onClick={onClose}>Cancelar</button>
                    <button className="btn-submit-solid" onClick={() => onClose()}>Solicitar Coleta</button>
                </div>
            </div>
        </div>
    );
}