import { useState } from 'react';
import {
  FileText, CupSoda, Box, Wine, Smartphone,
  Droplets, Clock, Calendar as CalendarIcon
} from 'lucide-react';
import './ModalSolicitarColeta.css';
import Swal from "sweetalert2"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalSolicitarColeta({ isOpen, onClose }: ModalProps) {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [peso, setPeso] = useState('');
  const [dataColeta, setDataColeta] = useState('');
  const [horario, setHorario] = useState('');
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<string[]>([]);



  const handleSubmit = () => {
  if (!cep || !rua || !peso || !dataColeta || !horario || materiaisSelecionados.length === 0) {
    alert('Por favor, preencha todos os campos e selecione pelo menos um tipo de material.');
    return;
  }

    const idLogado = localStorage.getItem('usuarioLogadoId');
    const usuariosRaw = localStorage.getItem('usuarios');

    if (!idLogado || !usuariosRaw) {
      alert('Usuário não encontrado. Faça login.');
      return;
    }

    const usuarios = JSON.parse(usuariosRaw);

    const novaColeta = {
      id: Date.now().toString(),
      material: materiaisSelecionados.join(', '),
      quantidade: `${peso} kg`,
      status: 'Pendente',
      data: dataColeta,
      horario: horario
    };

    const usuariosAtualizados = usuarios.map((u: any) => {
      if (u.id === idLogado) {
        return {
          ...u,
          historico: [...(u.historico || []), novaColeta]
        };
      }
      return u;
    });

   localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

Swal.fire({
  title: 'Solicitação Enviada!',
  text: 'Obrigado por colaborar com o meio ambiente. Acompanhe o status no seu histórico.',
  icon: 'success',
  confirmButtonText: 'Entendido'
}).then((result) => {
  if (result.isConfirmed) {
      onClose(); 
  }
});

    setPeso('');                  
    setDataColeta('');            
    setHorario('');              
    setMateriaisSelecionados([]);
    onClose();
  };


  const handleCepBlur = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
        }
      } catch (error) {
        console.error('Erro no CEP', error);
      }
    }
  };

  if (!isOpen) return null;

  const listaMateriais = [
    { id: 'papel', nome: 'Papel', icone: <FileText size={20} />, cor: '#A78BFA' },
    { id: 'plastico', nome: 'Plástico', icone: <CupSoda size={20} />, cor: '#F472B6' },
    { id: 'metal', nome: 'Metal', icone: <Box size={20} />, cor: '#F87171' },
    { id: 'vidro', nome: 'Vidro', icone: <Wine size={20} />, cor: '#4ADE80' },
    { id: 'eletronicos', nome: 'Eletrônicos', icone: <Smartphone size={20} />, cor: '#6366F1' },
    { id: 'oleo', nome: 'Óleo', icone: <Droplets size={20} />, cor: '#0EA5E9' },
  ];

  const toggleMaterial = (nome: string) => {
    setMateriaisSelecionados(prev =>
      prev.includes(nome)
        ? prev.filter(m => m !== nome)
        : [...prev, nome]
    );
  };

  return (
    <div className="modal-overlay-morador">
      <div className="modal-container-refinado">
        <div className="modal-scroll-area">

          <div className="grid-duplo-endereco">
            <div className="campo-grupo">
              <label className="label-teal">CEP</label>
              <input
                type="text" placeholder='00000-000'
                className="input-custom"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
              />
            </div>

            <div className="campo-grupo">
              <label className="label-teal">Estado</label>
              <input type="text" className="input-custom" value={estado} readOnly />
            </div>
          </div>

          <div className="campo-grupo">
            <label className="label-teal">Rua e Número</label>
            <input
              type="text"
              className="input-custom"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className="grid-duplo-endereco">
            <div className="campo-grupo">
              <label className="label-teal">Bairro</label>
              <input
                type="text"
                className="input-custom"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>

            <div className="campo-grupo">
              <label className="label-teal">Cidade</label>
              <input type="text" className="input-custom" value={cidade} readOnly />
            </div>
          </div>

          <div className="campo-grupo">
            <label className="label-teal">
              Tipos de Material ({materiaisSelecionados.length})
            </label>

            <div className="grid-materiais-colorida">
              {listaMateriais.map(m => (
                <div
                  key={m.id}
                  className={`card-material-vibrante ${materiaisSelecionados.includes(m.nome) ? 'active' : ''}`}
                  onClick={() => toggleMaterial(m.nome)}
                >
                  <span style={{ color: m.cor }}>{m.icone}</span>
                  <span>{m.nome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-duplo-endereco">
            <div className="campo-grupo">
              <label className="label-teal">Peso Estimado (kg)</label>
              <input
                type="text" placeholder='5.5'
                className="input-custom"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>

            <div className="campo-grupo">
              <label className="label-teal">Data</label>
              <div className="input-wrapper-icon">
                <input
                  type="date"
                  className="input-custom"
                  value={dataColeta}
                  onChange={(e) => setDataColeta(e.target.value)}
                />
                <CalendarIcon size={18} className="icon-absolute" />
              </div>
            </div>
          </div>

          <div className="campo-grupo">
            <label className="label-teal">Horário</label>
            <div className="input-wrapper-icon">
              <select
                className="input-custom"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                <option value="">Selecione</option>
                {["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]
                  .map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <Clock size={18} className="icon-absolute" />
            </div>
          </div>
        </div>

        <div className="modal-btns-footer">
          <button className="btn-cancel-border" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-submit-solid" onClick={handleSubmit}>
            Solicitar Coleta
          </button>
        </div>
      </div>
    </div>
  );
}
