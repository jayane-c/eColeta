import './CadastroCooperativa.css';
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaBuilding,
  FaRecycle
} from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroCooperativa() {
  const navigate = useNavigate();

  // Dados principais
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Endereço
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  // Materiais
  const [papel, setPapel] = useState(false);
  const [papelao, setPapelao] = useState(false);
  const [plastico, setPlastico] = useState(false);
  const [metal, setMetal] = useState(false);
  const [vidro, setVidro] = useState(false);
  const [eletronicos, setEletronicos] = useState(false);
  const [oleoDeCozinha, setOleoDeCozinha] = useState(false);

  const [erro, setErro] = useState('');

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(res => res.json())
        .then(dados => {
          if (!dados.erro) {
            setRua(dados.logradouro);
            setBairro(dados.bairro);
            setCidade(dados.localidade);
          }
        });
    }
  }, [cep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não conferem');
      return;
    }

    const novaCooperativa = {
      id: Date.now().toString(),
      tipo: 'cooperativa',
      nome: nomeEmpresa,
      responsavel: nomeResponsavel,
      email,
      cnpj,
      telefone,
      endereco: { cep, rua, numero, complemento, bairro, cidade },
      materiais: { papel, papelao, plastico, metal, vidro, eletronicos, oleoDeCozinha },
      senha
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(novaCooperativa);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioLogadoId', novaCooperativa.id);

    navigate('/dashboard-cooperativa');
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <h2><FaBuilding /> Cadastro de Cooperativa</h2>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          {/* Identificação */}
          <div className="section">
            <label><FaUser /> Nome da Empresa</label>
            <input value={nomeEmpresa} onChange={e => setNomeEmpresa(e.target.value)} required />
          </div>

          <div className="section">
            <label><FaUser /> Responsável</label>
            <input value={nomeResponsavel} onChange={e => setNomeResponsavel(e.target.value)} />
          </div>

          <div className="row">
            <div className="section">
              <label><FaIdCard /> CNPJ</label>
              <input value={cnpj} onChange={e => setCnpj(e.target.value)} />
            </div>
            <div className="section">
              <label><FaPhone /> Telefone</label>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
          </div>

          <div className="section">
            <label><FaEnvelope /> Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
         
          <h3><FaMapMarkerAlt /> Endereço</h3>
          <div className="endereco-grid">
            <div className="section">
              <label>CEP</label>
              <input value={cep} onChange={e => setCep(e.target.value)} />
            </div>
            <div className="section">
              <label>Número</label>
              <input value={numero} onChange={e => setNumero(e.target.value)} />
            </div>
            <div className="section full">
              <label>Rua</label>
              <input value={rua} readOnly />
            </div>
            <div className="section">
              <label>Bairro</label>
              <input value={bairro} readOnly />
            </div>
            <div className="section">
              <label>Cidade</label>
              <input value={cidade} readOnly />
            </div>
            <div className="section full">
              <label>Complemento</label>
              <input value={complemento} onChange={e => setComplemento(e.target.value)} />
            </div>
          </div>

          {/* Materiais Aceitos */}
          <h3><FaRecycle /> Materiais Aceitos</h3>
          <div className="checkbox-group">
            <label><input type="checkbox" checked={papel} onChange={() => setPapel(!papel)} /> Papel</label>
            <label><input type="checkbox" checked={papelao} onChange={() => setPapelao(!papelao)} /> Papelão</label>
            <label><input type="checkbox" checked={plastico} onChange={() => setPlastico(!plastico)} /> Plástico</label>
            <label><input type="checkbox" checked={metal} onChange={() => setMetal(!metal)} /> Metal</label>
            <label><input type="checkbox" checked={vidro} onChange={() => setVidro(!vidro)} /> Vidro</label>
            <label><input type="checkbox" checked={eletronicos} onChange={() => setEletronicos(!eletronicos)} /> Eletrônicos</label>
            <label><input type="checkbox" checked={oleoDeCozinha} onChange={() => setOleoDeCozinha(!oleoDeCozinha)} /> Óleo</label>
          </div>

          {/* Segurança */}
          <h3><FaLock /> Segurança</h3>
          <div className="row">
            <div className="section">
              <label>Senha</label>
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
            </div>
            <div className="section">
              <label>Confirmar senha</label>
              <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
            </div>
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="btn-criar" type="submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroCooperativa;