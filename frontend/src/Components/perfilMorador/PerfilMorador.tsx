import React from 'react';
import {
    Mail, Phone, CreditCard, User, MapPin, Package, TrendingUp,
    Trophy, Medal, ArrowLeft, Gift, Leaf, Globe, Target, Shield, Zap, Star, Award, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PerfilMorador.css';

const PerfilMorador: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="perfil-app-container">

            <div className="perfil-card-branco">
                <button className="btn-voltar-perfil" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Voltar
                </button>

                <header className="perfil-header-azul">
                    <div className="header-info">
                        <div className="avatar-box">
                            <User size={40} color="#3b82f6" />
                        </div>
                        <div className="usuario-texto">
                            <h1>João Silva</h1>
                            <p>Morador eColeta</p>
                            <span>Membro desde Janeiro de 2024</span>
                        </div>
                    </div>
                </header>

                <div className="stats-resumo-grid">
                    <div className="stat-item">
                        <div className="icon-circle icon-verde"><Package size={22} /></div>
                        <strong>0</strong>
                        <span>Coletas Realizadas</span>
                    </div>
                    <div className="stat-item">
                        <div className="icon-circle icon-azul"><TrendingUp size={22} /></div>
                        <strong>0.0 kg</strong>
                        <span>Reciclado</span>
                    </div>
                    <div className="stat-item">
                        <div className="icon-circle icon-laranja"><Trophy size={22} /></div>
                        <strong>0</strong>
                        <span>Pontos</span>
                    </div>
                    <div className="stat-item">
                        <div className="icon-circle icon-roxo"><Medal size={22} /></div>
                        <strong>0/8</strong>
                        <span>Conquistas</span>
                    </div>
                </div>

                <section className="secao-interna-dados">
                    <h2 className="titulo-secao-verde">Dados Pessoais</h2>
                    <div className="dados-pessoais-grid">
                        <div className="dado-bloco">
                            <label><Mail size={14} /> Email</label>
                            <p>joao.silva@email.com</p>
                        </div>
                        <div className="dado-bloco">
                            <label><Phone size={14} /> Telefone</label>
                            <p>(11) 98765-4321</p>
                        </div>
                        <div className="dado-bloco">
                            <label><CreditCard size={14} /> CPF</label>
                            <p>123.456.789-00</p>
                        </div>
                        <div className="dado-bloco">
                            <label><MapPin size={14} /> CEP</label>
                            <p>01234-567</p>
                        </div>
                    </div>
                    <div className="endereco-destaque">
                        <label><MapPin size={14} /> Endereço Principal</label>
                        <p>Rua das Flores, 123 - Jardim Paulista, São Paulo - SP</p>
                    </div>
                </section>
            </div>

            <div className="perfil-card-laranja">
                <div className="pontos-topo">
                    <div className="icon-bg-branco"><Gift size={24} color="#f59e0b" /></div>
                    <div>
                        <h3>Sistema de Pontos</h3>
                        <p>Ganhe 10 pontos por kg reciclado</p>
                    </div>
                </div>
                <div className="pontos-valores-grid">
                    <div className="valor-box"><span>Pontos Disponíveis</span><strong>0</strong></div>
                    <div className="valor-box"><span>Pontos Ganhos</span><strong>0</strong></div>
                    <div className="valor-box"><span>Pontos Resgatados</span><strong>0</strong></div>
                </div>
                <div className="historico-recente-area">
                    <div className="historico-label"><Target size={16} /> Histórico Recente</div>
                    <div className="lista-atividades">
                        <div className="atividade-row">
                            <div><p>Desconto Supermercado</p><span>15/01/2024</span></div>
                            <span className="badge-pts badge-negativo">-100 pts</span>
                        </div>
                        <div className="atividade-row">
                            <div><p>Coleta de 5kg</p><span>10/01/2024</span></div>
                            <span className="badge-pts badge-positivo">+50 pts</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="perfil-card-branco secao-conquistas">
                <div className="titulo-conquistas">
                    <Medal size={20} color="#0b7a33" />
                    <h3>Conquistas Ambientais</h3>
                </div>

                <div className="conquistas-grid">
                   
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Target color="#ec4899" size={20} /></div>
                        <div><h4>Primeira Coleta</h4><p>Realize sua primeira coleta</p></div>
                    </div>
                    
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Leaf color="#84cc16" size={20} /></div>
                        <div><h4>Eco Iniciante</h4><p>Recicle 10kg de materiais</p></div>
                    </div>
                    
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Trophy color="#cd7f32" size={20} /></div>
                        <div><h4>Reciclador Bronze</h4><p>Realize 5 coletas</p></div>
                    </div>
                 
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Globe color="#3b82f6" size={20} /></div>
                        <div><h4>Guardião do Planeta</h4><p>Recicle 50kg de materiais</p></div>
                    </div>
                  
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Zap color="#f59e0b" size={20} /></div>
                        <div><h4>Super Eficiente</h4><p>3 coletas em uma semana</p></div>
                    </div>
                    
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Star color="#a855f7" size={20} /></div>
                        <div><h4>Doador Master</h4><p>Doe 1000 pontos acumulados</p></div>
                    </div>
                  
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Shield color="#06b6d4" size={20} /></div>
                        <div><h4>Eco Protetor</h4><p>Complete 1 mês de eColeta</p></div>
                    </div>
                    
                    <div className="conquista-item inativa">
                        <div className="conquista-icon"><Award color="#ef4444" size={20} /></div>
                        <div><h4>Herói da Natureza</h4><p>Recicle 100kg no total</p></div>
                    </div>
                </div>

                <div className="progresso-geral-footer">
                    <div className="progresso-topo">
                        <span>Progresso Geral</span>
                        <strong>0%</strong>
                    </div>
                    <div className="barra-progresso-container">
                        <div className="barra-preenchimento" style={{ width: '0%' }}></div>
                    </div>
                    <span className="legenda-progresso">0 de 8 conquistas desbloqueadas</span>
                </div>
            </div>
        </div>
    );
};

export default PerfilMorador;