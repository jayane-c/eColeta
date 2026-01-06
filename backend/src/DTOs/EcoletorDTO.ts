export interface ICreateEcoletorDTO {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
    veiculo_tipo: string;
    id_cooperativa?: number;
}

export interface IUpdateEcoletorDTO {
    nome?: string;
    telefone?: string;
    veiculo_tipo?: string;
    disponivel?: boolean;
}

export interface IEcoletorDTO {
    id_ecoletor: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    veiculo_tipo: string;
    disponivel: boolean;
    saldo_ecoletor: number;
}