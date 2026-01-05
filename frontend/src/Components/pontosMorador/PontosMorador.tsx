import "./PontosMorador.css";
import { Leaf, Gift, ArrowLeft, Trophy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../../Components/Footer/footer"; 

const PontosMorador = () => {
    const navegar = useNavigate();
    const [meusPontos] = useState(0); 

    const listaEmpresas = [
        { id: 1, nome: "EcoMarket", categoria: "Supermercado", descricao: "Produtos orgânicos e sustentáveis", icone: "🛒", beneficio: "10% de desconto", custoPontos: 100, corFundo: "#dcfce7" },
        { id: 2, nome: "GreenCafé", categoria: "Cafeteria", descricao: "Café orgânico e lanches naturais", icone: "☕", beneficio: "15% de desconto", custoPontos: 50, corFundo: "#ffedd5" },
        { id: 3, nome: "BioBistro", categoria: "Restaurante", descricao: "Culinária orgânica e vegana", icone: "🍴", beneficio: "20% de desconto", custoPontos: 150, corFundo: "#dcfce7" },
        { id: 4, nome: "EcoFashion", categoria: "Moda Sustentável", descricao: "Roupas de materiais reciclados", icone: "👕", beneficio: "25% de desconto", custoPontos: 200, corFundo: "#f3e8ff" },
        { id: 5, nome: "GreenHome", categoria: "Casa e Decoração", descricao: "Produtos eco-friendly para casa", icone: "🏠", beneficio: "15% de desconto", custoPontos: 120, corFundo: "#e0f2fe" },
        { id: 6, nome: "NaturaSpa", categoria: "Bem-estar", descricao: "Tratamentos naturais e orgânicos", icone: "✨", beneficio: "30% de desconto", custoPontos: 250, corFundo: "#fce7f3" },
    ];

    return (
        <div className="container-pontos-geral">
            <header className="cabecalho-pontos">
                <button className="botao-voltar" onClick={() => navegar(-1)}>
                    <ArrowLeft size={18} /> Voltar
                </button>
                <div className="perfil-usuario">
                    <div className="caixa-trofeu"><Trophy size={24} color="#fff" /></div>
                    <div className="texto-pontuacao">
                        <span>Seus Pontos</span>
                        <strong>{meusPontos}</strong>
                    </div>
                </div>
            </header>

            <main className="corpo-pagina">
                <section className="secao-introducao">
                    <div className="circulo-folha"><Leaf size={32} /></div>
                    <h1>Empresas Parceiras</h1>
                    <p>Troque seus pontos por descontos em empresas sustentáveis e amigas do meio ambiente.</p>
                </section>

                <div className="banner-informativo">
                    <div className="caixa-presente"><Gift size={35} /></div>
                    <div className="texto-banner">
                        <h3>Como Funciona?</h3>
                        <p>A cada coleta realizada, você acumula pontos baseados no peso do material reciclado (10 pontos por kg). Use seus pontos para resgatar descontos em empresas parceiras.</p>
                    </div>
                </div>

                <div className="grade-de-parceiros">
                    {listaEmpresas.map(empresa => (
                        <div key={empresa.id} className="cartao-parceiro">
                            <div className="topo-cartao">
                                <div className="fundo-icone-empresa" style={{ backgroundColor: empresa.corFundo }}>
                                    {empresa.icone}
                                </div>
                                <div className="caixa-selo-verde">
                                    <div className="fundo-folha-solida">
                                        <Leaf size={14} color="#fff" fill="#fff" />
                                    </div>
                                    <span>Selo Verde</span>
                                </div>
                            </div>

                            <h3>{empresa.nome}</h3>
                            <span className="rotulo-categoria">{empresa.categoria}</span>
                            <p className="texto-descricao">{empresa.descricao}</p>
                            
                            <div className="etiqueta-beneficio">
                                <span>⭐ Benefício</span>
                                <strong>{empresa.beneficio}</strong>
                            </div>

                            <div className="rodape-cartao">
                                <div className="exibicao-custo"><Trophy size={16} /> {empresa.custoPontos} pts</div>
                                <button className="botao-resgatar" disabled={meusPontos < empresa.custoPontos}>Resgatar</button>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="detalhes-selo-verde">
                    <div className="caixa-explicativa-selo">
                        <div className="icone-selo-grande"><Leaf size={40} /></div>
                        <div className="conteudo-selo">
                            <h2>O que é o Selo Verde?</h2>
                            <p>O Selo Verde eColeta é concedido a empresas que demonstram compromisso real com a sustentabilidade e práticas ambientalmente responsáveis.</p>
                            <div className="grade-requisitos">
                                <span><Check size={18} /> Uso de materiais sustentáveis e reciclados</span>
                                <span><Check size={18} /> Práticas de produção eco-friendly</span>
                                <span><Check size={18} /> Apoio ativo à coleta seletiva e reciclagem</span>
                                <span><Check size={18} /> Compromisso com a redução da pegada de carbono</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PontosMorador;