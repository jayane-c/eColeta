import "./CadastroMorador.css";
import {
    FaUser,
    FaIdCard,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaLock
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CadastroMorador() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    const [erroDados, setErroDados] = useState("");
    const [erroEndereco, setErroEndereco] = useState("");
    const [erroSenha, setErroSenha] = useState("");

    const handleCPF = (value: string) => {
        const x = value
            .replace(/\D/g, "")
            .match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
        if (!x) return;
        const val =
            !x[2]
                ? x[1]
                : x[1] +
                "." +
                x[2] +
                (x[3] ? "." + x[3] : "") +
                (x[4] ? "-" + x[4] : "");
        setCpf(val.substring(0, 14));
    };

    const handlePhone = (value: string) => {
        const x = value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (!x) return;
        const val =
            !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
        setTelefone(val.substring(0, 15));
    };

    const handleCEP = (value: string) => {
        const val = value
            .replace(/\D/g, "")
            .replace(/^(\d{5})(\d)/, "$1-$2");
        setCep(val.substring(0, 9));
    };

    useEffect(() => {
        const cepLimpo = cep.replace(/\D/g, "");
        if (cepLimpo.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                .then((res) => res.json())
                .then((dados) => {
                    if (!dados.erro) {
                        setRua(dados.logradouro || "");
                        setBairro(dados.bairro || "");
                        setCidade(dados.localidade || "");
                        setErroEndereco("");
                    } else {
                        setErroEndereco("CEP não encontrado.");
                    }
                })
                .catch(() =>
                    setErroEndereco("Erro ao buscar servidor de CEP.")
                );
        }
    }, [cep]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setErroDados("");
        setErroEndereco("");
        setErroSenha("");

        if (!nome || !cpf || !email || !telefone) {
            setErroDados("Preencha todos os dados pessoais");
            return;
        }

        if (!cep || !rua || !numero || !bairro || !cidade) {
            setErroEndereco("Preencha o endereço completo");
            return;
        }

        if (!senha || senha !== confirmarSenha) {
            setErroSenha("As senhas não conferem");
            return;
        }

        localStorage.setItem("usuarioNome", nome);
        localStorage.setItem("usuarioTipo", "morador");

        navigate("/dashboard-morador");
    };

    return (
        <div className="cadastro-page">
            <div className="cadastro-card">
                <h2>Cadastro de morador</h2>
                <p className="subtitle">Preencha seus dados para solicitar coletas</p>

                {erroDados && <p className="erro">{erroDados}</p>}

                <form className="cadastro-form" onSubmit={handleSubmit}>
                    <div className="section">
                        <label className="label-icon">
                            <FaUser /> Nome Completo
                        </label>
                        <input
                            required
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <div className="section">
                            <label className="label-icon">
                                <FaIdCard /> CPF
                            </label>
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => handleCPF(e.target.value)}
                                placeholder="000.000.000-00"
                            />
                        </div>

                        <div className="section">
                            <label className="label-icon">
                                <FaPhone /> Telefone
                            </label>
                            <input
                                type="tel"
                                placeholder="(00) 00000-0000"
                                value={telefone}
                                onChange={(e) => handlePhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <label className="label-icon">
                            <FaEnvelope /> Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <h3 className="section-title">
                        <FaMapMarkerAlt /> Endereço
                    </h3>

                    {erroEndereco && <p className="erro">{erroEndereco}</p>}

                    <div className="row">
                        <div className="section">
                            <label>CEP</label>
                            <input
                                type="text"
                                placeholder="00000-000"
                                value={cep}
                                onChange={(e) => handleCEP(e.target.value)}
                            />
                        </div>

                        <div className="section">
                            <label>Número</label>
                            <input
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <label>Rua/Avenida</label>
                        <input
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                        />
                    </div>

                    <div className="section">
                        <label>Complemento</label>
                        <input
                            type="text"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            placeholder="Apto, Bloco, etc."
                        />
                    </div>

                    <div className="row">
                        <div className="section">
                            <label>Bairro</label>
                            <input
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                        </div>
                        <div className="section">
                            <label>Cidade</label>
                            <input
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                        </div>
                    </div>

                    <h3 className="section-title">
                        <FaLock /> Segurança
                    </h3>
                    {erroSenha && <p className="erro">{erroSenha}</p>}

                    <div className="row">
                        <div className="section">
                            <label>Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <div className="section">
                            <label>Confirmar Senha</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </div>
                    </div>

                   <button className="btn-criar" type="submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroMorador;