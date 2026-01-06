import { IEnderecoDTO } from './IEnderecoDTO';

export interface ICreateMoradorDTO {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  endereco: IEnderecoDTO;
}

export interface IUpdateMoradorDTO {
    nome?: string;
    email?: string;
    senha?: string;
    telefone?: string;
    endereco?: {
        cep?: string;
        rua?: string;
        numero?: string;
        complemento?: string | null;
        bairro?: string;
        cidade?: string;
        estado?: string;
    };
}


export interface IMoradorDTO {
    id_morador: number;
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
    saldo: number;
    endereco: IEnderecoDTO & { id_endereco: number };
}