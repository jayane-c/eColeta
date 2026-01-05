# eColeta: Plataforma de Logística Reversa sob Demanda

**Conectando Pessoas, Tecnologia e Sustentabilidade em Igarassu**

##  Sobre o Projeto

Inspirado em modelos de aplicativos de entrega (delivery), o **eColeta** conecta o cidadão que deseja descartar corretamente com Ecoletores e a cadeia de reciclagem de forma eficiente e transparente.

##  Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma arquitetura moderna e robusta, separada em Backend (API) e Frontend (Interface Web).

### Backend (API)
* **Node.js** & **TypeScript**: Base do servidor com tipagem estática para maior segurança.
* **Express**: Framework para gerenciamento de rotas e requisições HTTP.
* **TypeORM**: ORM (Object-Relational Mapping) para manipulação do banco de dados e gerenciamento de entidades.
* **Banco de Dados**: Suporte para **MySQL** e **PostgreSQL** (configurável via variáveis de ambiente).
* **JWT (JSON Web Token)**: Para autenticação e segurança das rotas.
* **BcryptJS**: Para criptografia de senhas.
* **Dotenv**: Gerenciamento de variáveis de ambiente.

### Frontend (Web)
* **React**: Biblioteca para construção de interfaces de usuário.
* **Vite**: Ferramenta de build rápida e otimizada.
* **TypeScript**: Garantia de tipagem no desenvolvimento dos componentes.
* **React Router Dom**: Gerenciamento de rotas e navegação da SPA.
* **Lucide React** & **React Icons**: Bibliotecas de ícones modernos.
* **CSS Modules**: Estilização modularizada.

---

##  O Desafio Ambiental de Igarassu (Problemática)

**O Descarte Inadequado de Resíduos Especiais:** O principal obstáculo enfrentado é a prática generalizada do descarte errado. Materiais de alto valor ou risco (como óleo de cozinha usado, eletrônicos e plásticos) são frequentemente misturados ao lixo comum doméstico. Essa falta de separação na origem inviabiliza a reciclagem, transformando recursos valiosos em simples rejeito que acaba em aterros.

**O Impacto Social e Econômico:** A ineficiência logística causada por esse descarte misturado impede que as cooperativas e catadores informais trabalhem de forma otimizada, perdendo a oportunidade de gerar renda a partir desses resíduos que não chegam até eles.

---

##  Solução: A Plataforma eColeta

O eColeta é a ponte tecnológica que profissionaliza a coleta e incentiva o cidadão através de três pilares:

### 1. Engajamento do Morador (Geração de Demanda)
**Solicitam Coleta pelo App:** Moradores agendam a coleta de recicláveis (ex: plástico, papelão, óleo) de forma simples e sob demanda.

### 2. Eficiência Logística (O Coração da Aplicação)
**Ecoletores:** Profissionais (autônomos ou cooperados) recebem os pedidos mais próximos, com rotas otimizadas para maximizar ganhos e minimizar o custo de combustível.

### 3. Comercialização e Renda (O Lucro Sustentável)
**Cooperativas/Parceiros:** Recebem e processam materiais limpos e já triados.
**Logística Reversa Inteligente:** O sistema conecta toda a cadeia de reciclagem, transformando o lixo em um ativo comercial.

---

##  Estrutura do Banco de Dados (Entidades)

Para garantir a eficiência logística e a transparência na cadeia de reciclagem, a plataforma **eColeta** utiliza um modelo de banco de dados relacional gerido pelo TypeORM que conecta todos os *stakeholders*.

### Principais Entidades

* **Morador** 👤
    * **Função:** Geração de demanda. Contém dados pessoais, CPF, Saldo de Pontos e referencia a tabela Endereco. É o solicitante das Coletas.
* **Endereco** 📍
    * **Função:** Normalização de Endereço e Logística. Centraliza dados de CEP, Logradouro e Coordenadas Geográficas para Morador e Cooperativa.
* **Ecoletor** 🚚
    * **Função:** Execução do serviço. O profissional que realiza a coleta. Possui Saldo de Valor (R$) e é obrigatoriamente ligado a uma Cooperativa.
* **Cooperativa** 🏢
    * **Função:** Ponto de validação financeira, login de gestão e destino final do resíduo. Referencia a tabela Endereco para a sede.
* **Coleta** 📅
    * **Função:** O coração do sistema. Representa o agendamento de coleta, ligando o Morador que solicita ao Ecoletor que a realiza.
* **Residuo** ♻️
    * **Função:** Define os tipos de materiais que podem ser coletados (ex: óleo de cozinha, eletrônicos).
* **ItemColeta** 📊
    * **Função:** Detalham o que foi coletado, armazenando o peso final exato para a transação.
* **Avaliacao** ⭐
    * **Função:** Qualidade do serviço. Permite que o Morador avalie a Coleta realizada pelo Ecoletor.
* **Transacao** 💰
    * **Função:** Incentivo e engajamento. Armazena o valor (monetário ou em pontos) gerado por uma Coleta.

---

## Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado (versão 18+ recomendada)
* Banco de Dados MySQL ou PostgreSQL rodando.

### 1. Configurando o Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz do backend baseado no .env.example
# Defina DB_HOST, DB_USER, DB_PASS, DB_NAME, etc.

# Rodar em modo de desenvolvimento
npm run dev

